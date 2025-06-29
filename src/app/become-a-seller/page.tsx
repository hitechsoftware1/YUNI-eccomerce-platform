
'use client';

import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { AuthModal } from '@/components/auth-modal';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

const benefits = [
    "Reach millions of customers",
    "Easy-to-use seller dashboard",
    "Secure and timely payments",
    "Marketing and promotional tools",
    "Dedicated seller support"
];

export default function BecomeASellerPage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
    const { currentUser } = useAuth();
    const router = useRouter();

    const handleGetStarted = () => {
        if (currentUser) {
            // In a real app, this would likely redirect to a seller registration form
            // or a seller dashboard if they are already a seller.
            router.push('/account');
        } else {
            setIsAuthModalOpen(true);
        }
    };

    return (
        <>
            <div className="bg-background text-foreground">
                <Header />
                <main className="pt-16 md:pt-20">
                    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
                                Sell with YUNI
                            </h1>
                            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                                Join our marketplace and grow your business. We provide the tools and support to help you succeed.
                            </p>
                        </div>

                        <div className="mt-12">
                            <Card className="max-w-3xl mx-auto">
                                <CardHeader>
                                    <CardTitle>Why Sell on YUNI?</CardTitle>
                                    <CardDescription>Unlock your business's potential with our powerful platform.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {benefits.map((benefit, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                                <span className="text-base">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 flex justify-center">
                                        <Button size="lg" onClick={handleGetStarted}>
                                            {currentUser ? 'Go to Your Account' : 'Start Selling Now'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
            <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
        </>
    );
}
