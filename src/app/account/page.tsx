'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, LayoutDashboard, ShoppingBag, EyeOff } from 'lucide-react';
import { getOrdersByEmail } from '@/lib/user-orders';
import type { Order, Product } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getProductById } from '@/lib/products';
import { ProductCard } from '@/components/product-card';


export default function AccountPage() {
  const { currentUser, loading, logOut } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [recentlyViewed, setRecentlyViewed] = React.useState<Product[]>([]);

  React.useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/');
    }
    if (currentUser) {
        // In a real app, this would be an API call.
        const userOrders = getOrdersByEmail(currentUser.email);
        setOrders(userOrders);

        // Load recently viewed items
        try {
            const viewedIds: string[] = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
            if (viewedIds.length > 0) {
                const viewedProducts = viewedIds.map(id => getProductById(id)).filter((p): p is Product => Boolean(p));
                setRecentlyViewed(viewedProducts);
            }
        } catch (error) {
            console.error("Failed to load recently viewed items:", error);
        }
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) {
    return (
      <div className="bg-background text-foreground">
        <Header />
        <main className="pt-16 md:pt-20">
            <div className="container mx-auto px-2 py-6 sm:px-4 md:py-8 md:px-6 space-y-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-[250px]" />
                                <Skeleton className="h-6 w-[200px]" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-40" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-32 w-full" />
                    </CardContent>
                </Card>
            </div>
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
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-2 py-6 sm:px-4 md:py-8 md:px-6 space-y-8">
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
                    <div className="flex gap-4">
                        <Button onClick={logOut}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/admin/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Admin Dashboard
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View the status of your recent orders.</CardDescription>
                </CardHeader>
                <CardContent>
                    {orders.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{new Date(order.date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={order.status === 'Cancelled' ? 'destructive' : 'secondary'}
                                                className={cn('capitalize',
                                                    order.status === 'Fulfilled' && 'bg-green-600 text-primary-foreground hover:bg-green-600/80',
                                                    order.status === 'Pending' && 'bg-yellow-500 text-primary-foreground hover:bg-yellow-500/80'
                                                )}
                                            >
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">UGX {order.total.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-10 rounded-lg bg-secondary/50">
                            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">No orders yet</h3>
                            <p className="mt-1 text-sm text-muted-foreground">You haven't placed any orders with us. Let's change that!</p>
                            <Button asChild className="mt-4">
                                <Link href="/">Start Shopping</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recently Viewed</CardTitle>
                    <CardDescription>Items you have recently looked at.</CardDescription>
                </CardHeader>
                <CardContent>
                    {recentlyViewed.length > 0 ? (
                        <div className="product-carousel -mx-2 flex overflow-x-auto pb-4">
                            <div className="flex gap-4 px-2">
                                {recentlyViewed.map((product) => (
                                    <div key={product.id} className="w-36 sm:w-44 flex-shrink-0">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-10 rounded-lg bg-secondary/50">
                            <EyeOff className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">Nothing to see here</h3>
                            <p className="mt-1 text-sm text-muted-foreground">You haven't viewed any items recently.</p>
                            <Button asChild className="mt-4">
                                <Link href="/">Start Browsing</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
