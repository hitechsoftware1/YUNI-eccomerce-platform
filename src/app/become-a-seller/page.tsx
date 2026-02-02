'use client';

import * as React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Store, Check, User, Info, Loader2 } from 'lucide-react';
import { AuthModal } from '@/components/auth-modal';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { applyToBeSeller, getUserByIdAction } from '@/lib/user-actions';
import { useToast } from '@/hooks/use-toast';
import type { ManagedUser } from '@/lib/types';
import { isAdmin } from '@/lib/admins';


const benefits = [
    "Reach millions of customers",
    "Easy-to-use seller dashboard",
    "Secure and timely payments",
    "Marketing and promotional tools",
    "Dedicated seller support"
];

const sellerApplicationSchema = z.object({
    companyName: z.string().min(2, { message: "Company name is required." }),
    businessDescription: z.string().min(20, { message: "Description must be at least 20 characters." }),
    phoneNumber: z.string().min(10, { message: "A valid phone number is required." }),
    terms: z.boolean().refine(val => val === true, {
        message: "You must agree to the terms and conditions.",
    }),
});

type SellerApplicationValues = z.infer<typeof sellerApplicationSchema>;

export default function BecomeASellerPage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
    const { currentUser, loading: authLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [userData, setUserData] = React.useState<ManagedUser | null>(null);
    const [isUserDataLoading, setIsUserDataLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUser) {
                setIsUserDataLoading(false);
                return;
            }
            setIsUserDataLoading(true);
            const user = await getUserByIdAction(currentUser.uid);
            if (user) {
                setUserData(user);
            }
            setIsUserDataLoading(false);
        };

        if (!authLoading) {
            fetchUserData();
        }
    }, [currentUser, authLoading]);

    const form = useForm<SellerApplicationValues>({
        resolver: zodResolver(sellerApplicationSchema),
        defaultValues: {
            companyName: '',
            businessDescription: '',
            phoneNumber: '',
            terms: false,
        }
    });

    const handleGetStarted = () => {
        if (!currentUser) {
            setIsAuthModalOpen(true);
        }
    };

    const onSubmit = async (data: SellerApplicationValues) => {
        if (!currentUser) return;
        setIsSubmitting(true);
        try {
            await applyToBeSeller(currentUser.uid);
            toast({
                title: "Application Submitted",
                description: "Thank you! We will review your application and get back to you soon.",
            });
            // Re-fetch user data to update status
             const user = await getUserByIdAction(currentUser.uid);
             if (user) setUserData(user);
        } catch (error: any) {
            toast({
                title: "Submission Failed",
                description: error.message || "An unexpected error occurred.",
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const renderContent = () => {
        if (authLoading || isUserDataLoading) {
            return (
                 <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            )
        }

        if (!currentUser) {
            return (
                 <div className="text-center">
                    <p className="text-lg">You need an account to apply as a seller.</p>
                    <Button size="lg" onClick={handleGetStarted} className="mt-4">
                        Login or Register to Continue
                    </Button>
                </div>
            )
        }

        if (isAdmin(currentUser.email)) {
            return (
                 <div className="text-center p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Info className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">Admin Account</h2>
                    <p className="text-muted-foreground mt-2">As an administrator, you already have full seller privileges.</p>
                     <Button asChild className="mt-6" onClick={() => router.push('/admin/dashboard')}>
                        <Link href="/admin/dashboard">Go to Admin Dashboard</Link>
                    </Button>
                </div>
            )
        }
        
        if (userData?.role === 'Seller' && userData?.status === 'Active') {
            return (
                 <div className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">You are already a Seller!</h2>
                    <p className="text-muted-foreground mt-2">You can manage your products and orders from your dashboard.</p>
                    <Button asChild className="mt-6" onClick={() => router.push('/admin/dashboard')}>
                        <Link href="/admin/dashboard">Go to Admin Dashboard</Link>
                    </Button>
                </div>
            )
        }
        
        if (userData?.status === 'Pending Approval') {
             return (
                 <div className="text-center p-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Info className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">Application Pending</h2>
                    <p className="text-muted-foreground mt-2">Your application is currently under review. We will notify you once it's processed.</p>
                </div>
            )
        }

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company / Store Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Acme Gadgets Co." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="businessDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tell us about your business</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Describe the products you want to sell..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="+256..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        I agree to the YUNI <a href="#" className="text-primary underline">terms and conditions</a> for sellers.
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </form>
            </Form>
        );
    }

    return (
        <>
            <div className="bg-background text-foreground">
                <Header />
                <main className="pt-16 md:pt-20">
                    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-6">
                                <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
                                    Sell with YUNI
                                </h1>
                                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                                    Join our marketplace and grow your business. We provide the tools and support to help you succeed.
                                </p>
                                <Card className="bg-secondary/50">
                                     <CardHeader>
                                        <CardTitle>Why Sell on YUNI?</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start">
                                                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                    <span className="text-base">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Seller Application</CardTitle>
                                        <CardDescription>Fill out the form below to get started.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                       {renderContent()}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
            <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
        </>
    );
}
