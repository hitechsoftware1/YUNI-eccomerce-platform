
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { getOrderById } from '@/lib/user-orders';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';

export default function OrderDetailPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const params = useParams<{ id: string }>();
  const order = getOrderById(params.id);

  if (authLoading) {
    return (
        <div className="bg-background text-foreground">
            <Header />
            <main className="pt-16 md:pt-20">
                <div className="container mx-auto px-2 py-6 sm:px-4 md:py-8 md:px-6 space-y-6">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-10 w-1/2" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Skeleton className="h-48 w-full md:col-span-2" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
  }

  // In a real app, you'd also check if order.customer.email matches currentUser.email
  if (!order) {
    notFound();
  }

  const { items = [], shippingAddress } = order;

  return (
    <div className="bg-background text-foreground">
        <Header />
        <main className="pt-16 md:pt-20">
            <div className="container mx-auto px-2 py-6 sm:px-4 md:py-8 md:px-6">
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/account">Account</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Order Details</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold font-headline">Order {order.id}</h1>
                        <p className="text-muted-foreground">
                            Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/account#order-history">Back to Orders</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items ({items.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {items.map(item => (
                                        <div key={item.id} className="flex items-start gap-4">
                                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                                                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={item.dataAiHint} />
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>
                                            <p className="font-medium text-right">UGX {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                 <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status</span>
                                    <Badge
                                        variant={order.status === 'Cancelled' ? 'destructive' : 'secondary'}
                                        className={cn('capitalize',
                                            order.status === 'Fulfilled' && 'bg-green-600 text-primary-foreground hover:bg-green-600/80',
                                            order.status === 'Pending' && 'bg-yellow-500 text-primary-foreground hover:bg-yellow-500/80'
                                        )}
                                    >
                                        {order.status}
                                    </Badge>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>UGX {order.total.toLocaleString()}</span>
                                </div>
                            </CardContent>
                        </Card>
                         {shippingAddress && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Shipping Address</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    <p className="font-semibold text-foreground">{shippingAddress.fullName}</p>
                                    <p>{shippingAddress.addressLine1}</p>
                                    <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
                                    <p>{shippingAddress.country}</p>
                                    <p>Phone: {shippingAddress.phoneNumber}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

            </div>
        </main>
        <Footer />
    </div>
  );
}
