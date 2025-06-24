import Link from 'next/link';
import { CircleCheck } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex justify-center">
                <Card className="w-full max-w-lg text-center">
                    <CardHeader>
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <CircleCheck className="h-12 w-12 text-green-600" />
                        </div>
                        <CardTitle className="mt-4 text-3xl font-bold font-headline">Order Placed Successfully!</CardTitle>
                        <CardDescription className="mt-2 text-lg text-muted-foreground">
                            Thank you for your purchase.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Your order details and a confirmation email have been sent to you. You can view your order history in your account page.
                        </p>
                        <Button asChild className="mt-8">
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
