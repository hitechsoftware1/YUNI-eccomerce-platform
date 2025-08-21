
'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { OverviewChart } from "@/components/admin/overview-chart"
import { RecentSales } from "@/components/admin/recent-sales"
import { DollarSign, Package, CreditCard, Users, ArrowUpRight } from 'lucide-react';
import type { AdminSale } from '@/lib/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Order } from '@/lib/types';
import { FlashSaleStatus } from '@/components/admin/flash-sale-status';
import { getAllUserOrders } from '@/lib/user-orders';
import { getUsers } from '@/lib/users';
import { getAllProducts } from '@/lib/products';


export default function DashboardPage() {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [totalRevenue, setTotalRevenue] = React.useState(0);
    const [totalSales, setTotalSales] = React.useState(0);
    const [totalCustomers, setTotalCustomers] = React.useState(0);
    const [productsInStock, setProductsInStock] = React.useState(0);
    const [recentSales, setRecentSales] = React.useState<AdminSale[]>([]);
    const [recentOrders, setRecentOrders] = React.useState<Order[]>([]);


    React.useEffect(() => {
        // In a real app, you would fetch this data from an API.
        // For this demo, we're using the mock data functions.
        const allOrders = getAllUserOrders();
        const allUsers = getUsers();
        const allProducts = getAllProducts();
        
        setOrders(allOrders);

        // Calculate stats
        const fulfilledOrders = allOrders.filter(o => o.status === 'Fulfilled');
        const revenue = fulfilledOrders.reduce((acc, order) => acc + order.total, 0);
        setTotalRevenue(revenue);
        setTotalSales(fulfilledOrders.length);
        setTotalCustomers(allUsers.length);
        setProductsInStock(allProducts.filter(p => p.status === 'In Stock').length);

        // Prepare data for components
        const recentSalesData = fulfilledOrders
            .slice(0, 5)
            .map(order => ({
                name: order.customer.name,
                email: order.customer.email,
                amount: `+UGX ${order.total.toLocaleString()}`,
                fallback: order.customer.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U',
            }));
        setRecentSales(recentSalesData);

        const recentOrdersData = allOrders
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
        setRecentOrders(recentOrdersData);

    }, []);

  return (
    <div className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">UGX {totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                From all fulfilled orders
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Total Sales
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+{totalSales.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                Total fulfilled orders
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+{totalCustomers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                Total registered users
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Products in Stock
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{productsInStock.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                Available products
                </p>
            </CardContent>
            </Card>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <OverviewChart />
                </CardContent>
            </Card>
            <div className="col-span-1 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>
                        Displaying the latest 5 sales.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentSales sales={recentSales} />
                    </CardContent>
                </Card>
                <FlashSaleStatus />
            </div>
        </div>
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                        A list of the most recent orders from your store.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/admin/orders">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden sm:table-cell">Status</TableHead>
                            <TableHead className="hidden sm:table-cell">Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <div className="font-medium">{order.customer.name}</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {order.customer.email}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
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
                                <TableCell className="hidden sm:table-cell">
                                    {new Date(order.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">UGX {order.total.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}

  