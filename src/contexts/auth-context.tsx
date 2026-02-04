
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { addLoginActivity } from '@/lib/login-activity';
import { clearCart } from '@/lib/user-cart';
import { clearWishlist } from '@/lib/user-wishlist';
import { addUserAction, getUserByIdAction } from '@/lib/user-actions';
import { isAdmin } from '@/lib/admins';

// Define and export schemas for reuse
export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});
export type RegisterInput = z.infer<typeof registerSchema>;


interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logIn: (input: LoginInput) => Promise<void>;
  signUp: (input: RegisterInput) => Promise<void>;
  logOut: () => Promise<void>;
  logInWithGoogle: () => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Check if user exists in our DB, if not, add them via a server action.
        const existingUser = await getUserByIdAction(user.uid);
        if (!existingUser) {
          const userRole = isAdmin(user.email) ? 'Admin' : 'Buyer';
          await addUserAction({
            id: user.uid,
            name: user.displayName || 'New User',
            email: user.email || '',
            role: userRole,
            status: 'Active',
          });
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logIn = async ({ email, password }: LoginInput) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      addLoginActivity();
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Login Failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const signUp = async ({ name, email, password }: RegisterInput) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
       if (user) {
        await updateProfile(user, {
          displayName: name,
        });

        const userRole = isAdmin(user.email) ? 'Admin' : 'Buyer';
        await addUserAction({
          id: user.uid,
          name: name,
          email: email,
          role: userRole,
          status: 'Active',
        });
        
        await user.reload();
        if (auth.currentUser) {
            setCurrentUser(Object.assign(Object.create(Object.getPrototypeOf(auth.currentUser)), auth.currentUser));
        }
      }
       addLoginActivity();
       toast({
        title: "Registration Successful",
        description: "Your account has been created.",
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        title: 'Registration Failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener will handle adding the user to our DB
      addLoginActivity();
      toast({
        title: 'Login Successful',
        description: 'Welcome!',
      });
    } catch (error: any) {
      console.error('Google login error:', error);
      toast({
        title: 'Google Login Failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      // Clear user-specific data on logout to simulate switching accounts
      clearCart();
      clearWishlist();
      router.push('/');
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout Failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (!auth.currentUser) {
      const err = new Error("No user is currently signed in.");
      toast({ title: "Update Failed", description: err.message, variant: "destructive" });
      throw err;
    }
    try {
      await updateProfile(auth.currentUser, data);
      await auth.currentUser.reload();
      // Create a new object to force a state update in React
      setCurrentUser(Object.assign(Object.create(Object.getPrototypeOf(auth.currentUser)), auth.currentUser));

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast({
        title: "Update Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    logIn,
    signUp,
    logOut,
    logInWithGoogle,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
