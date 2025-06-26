
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

const recentSalesData: AdminSale[] = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+UGX 1,999,990', fallback: 'OM' },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+UGX 390,000', fallback: 'JL' },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+UGX 299,000', fallback: 'IN' },
  { name: 'William Kim', email: 'will@email.com', amount: '+UGX 990,000', fallback: 'WK' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+UGX 390,000', fallback: 'SD' },
];

const recentOrders: Order[] = [
    { id: 'ORD001', customer: { name: 'Olivia Martin', email: 'olivia.martin@email.com' }, date: '2023-11-23', status: 'Fulfilled', total: 250000 },
    { id: 'ORD002', customer: { name: 'Jackson Lee', email: 'jackson.lee@email.com' }, date: '2023-11-23', status: 'Pending', total: 150000 },
    { id: 'ORD003', customer: { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com' }, date: '2023-11-22', status: 'Cancelled', total: 350000 },
    { id: 'ORD004', customer: { name: 'William Kim', email: 'will@email.com' }, date: '2023-11-21', status: 'Fulfilled', total: 550000 },
    { id: 'ORD005', customer: { name: 'Sofia Davis', email: 'sofia.davis@email.com' }, date: '2023-11-20', status: 'Fulfilled', total: 75000 },
];

export default function DashboardPage() {
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
                <div className="text-2xl font-bold">UGX 45,231,890</div>
                <p className="text-xs text-muted-foreground">
                +20.1% from last month
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
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                +19% from last month
                </p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                +180.1% from last month
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
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                50 new products added
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
                        You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecentSales sales={recentSalesData} />
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
