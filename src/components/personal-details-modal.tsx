
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { User } from 'firebase/auth';
import { useAuth } from '@/contexts/auth-context';

const personalDetailsSchema = z.object({
  displayName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email(),
});

type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;

interface PersonalDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
  onSave: (data: { displayName?: string }) => Promise<void>;
}

export function PersonalDetailsModal({ isOpen, onOpenChange, user, onSave }: PersonalDetailsModalProps) {
  const [isSaving, setIsSaving] = React.useState(false);
  const [isResetting, setIsResetting] = React.useState(false);
  const { resetPassword } = useAuth();

  const form = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      displayName: user.displayName || '',
      email: user.email || '',
    },
  });
  
  React.useEffect(() => {
      if(isOpen) {
        form.reset({
            displayName: user.displayName || '',
            email: user.email || '',
        })
      }
  }, [user, form, isOpen]);

  const handleSubmit = async (data: PersonalDetailsFormValues) => {
    setIsSaving(true);
    try {
      await onSave({ displayName: data.displayName });
      onOpenChange(false);
    } catch (error) {
      // Toast is handled in auth-context
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePasswordReset = async () => {
    if (!user.email) return;
    setIsResetting(true);
    try {
        await resetPassword(user.email);
        onOpenChange(false);
    } catch (error) {
        // toast is handled in auth context
    } finally {
        setIsResetting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Personal Details</DialogTitle>
          <DialogDescription>
            Update your account information. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} disabled={isSaving || isResetting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} disabled />
                  </FormControl>
                  <FormDescription>Your email address cannot be changed.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex-col gap-2 pt-4 sm:flex-col sm:gap-2">
                <Button type="submit" className="w-full" disabled={isSaving || isResetting}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={handlePasswordReset} disabled={isResetting || isSaving}>
                  {isResetting ? 'Sending Email...' : 'Send Password Reset Email'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
