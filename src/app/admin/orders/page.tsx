export const dynamic = 'force-dynamic';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from 'lucide-react';
import type { Order } from '@/lib/types';
import { cn } from "@/lib/utils";

// Mock data for orders
const orders: Order[] = [
    {
        id: 'ORD001',
        customer: { name: 'Olivia Martin', email: 'olivia.martin@email.com' },
        date: '2023-11-23',
        status: 'Fulfilled',
        total: 250000,
    },
    {
        id: 'ORD002',
        customer: { name: 'Jackson Lee', email: 'jackson.lee@email.com' },
        date: '2023-11-23',
        status: 'Pending',
        total: 150000,
    },
    {
        id: 'ORD003',
        customer: { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com' },
        date: '2023-11-22',
        status: 'Cancelled',
        total: 350000,
    },
    {
        id: 'ORD004',
        customer: { name: 'William Kim', email: 'will@email.com' },
        date: '2023-11-21',
        status: 'Fulfilled',
        total: 550000,
    },
    {
        id: 'ORD005',
        customer: { name: 'Sofia Davis', email: 'sofia.davis@email.com' },
        date: '2023-11-20',
        status: 'Fulfilled',
        total: 75000,
    },
];

export default function OrdersPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                    Manage your store's orders and view their details.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden sm:table-cell">Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                             <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer.name}</TableCell>
                                <TableCell className="hidden sm:table-cell">{order.date}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            order.status === 'Cancelled' ? 'destructive' : 'secondary'
                                        }
                                        className={cn(
                                            order.status === 'Fulfilled' && 'bg-green-600 text-primary-foreground hover:bg-green-600/80',
                                            order.status === 'Pending' && 'bg-yellow-500 text-primary-foreground hover:bg-yellow-500/80'
                                        )}
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    UGX {order.total.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
