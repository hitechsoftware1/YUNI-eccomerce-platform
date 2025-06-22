'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useCart } from '@/contexts/cart-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const checkoutSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  country: z.string().min(2, { message: 'Country must be at least 2 characters.' }),
  postalCode: z.string().min(3, { message: 'Postal code must be at least 3 characters.' }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { currentUser, loading: authLoading } = useAuth();
  const { cartItems, cartTotal, itemCount, clearCart } = useCart();
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      address: '',
      city: '',
      country: 'Uganda', // Default value
      postalCode: '',
    },
  });

  React.useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/');
      toast({
        title: "Authentication Required",
        description: "Please log in to proceed to checkout.",
        variant: "destructive"
      });
    }
    if (!authLoading && currentUser && itemCount === 0) {
       router.push('/');
       toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add some products before checking out.",
      });
    }
  }, [currentUser, authLoading, router, toast, itemCount]);
  
  React.useEffect(() => {
    if(currentUser) {
        form.setValue('fullName', currentUser.displayName || '');
    }
  }, [currentUser, form]);

  async function onSubmit(data: CheckoutFormValues) {
    setIsPlacingOrder(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Order placed:', {
      ...data,
      items: cartItems,
      total: cartTotal
    });
    
    clearCart();
    router.push('/checkout/success');
  }

  if (authLoading || !currentUser || itemCount === 0) {
    return (
        <div className="bg-background text-foreground">
            <Header />
            <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-64">
                    <Skeleton className="w-1/2 h-10" />
                </div>
            </main>
            <Footer />
        </div>
    )
  }

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Shopping Lane" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="Kampala" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                                <Input placeholder="10101" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                     <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Uganda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <Button type="submit" className="w-full" size="lg" disabled={isPlacingOrder}>
                        {isPlacingOrder ? "Placing Order..." : `Place Order (UGX ${(cartTotal + 5000).toLocaleString()})`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <Card className="bg-secondary">
              <CardContent className="p-6 space-y-4">
                 {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={item.dataAiHint}/>
                            </div>
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-medium">UGX {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                 ))}
                 <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">UGX {cartTotal.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="font-medium">UGX 5,000</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-bold">
                  <p>Total</p>
                  <p>UGX {(cartTotal + 5000).toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
