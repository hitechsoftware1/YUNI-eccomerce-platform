'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut } from 'lucide-react';

export default function AccountPage() {
  const { currentUser, loading, logOut } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/');
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) {
    return (
      <div className="bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-8 w-[250px]" />
                    <Skeleton className="h-6 w-[200px]" />
                </div>
            </div>
             <Skeleton className="h-10 w-32 mt-8" />
        </main>
        <Footer />
      </div>
    );
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || 'User'} />
                    <AvatarFallback className="text-3xl">
                        {getInitials(currentUser.displayName || currentUser.email)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-3xl font-headline">{currentUser.displayName || 'Welcome!'}</CardTitle>
                    <CardDescription className="text-lg">{currentUser.email}</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Future content like order history can go here */}
            <p className="text-muted-foreground">Welcome to your account page. More features coming soon!</p>
            <Button onClick={logOut} className="mt-8">
                <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
