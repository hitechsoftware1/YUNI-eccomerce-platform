
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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

interface OrdersTableProps {
    orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
    const router = useRouter();

    return (
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
                    <TableRow key={order.id} className="cursor-pointer" onClick={() => router.push(`/admin/orders/${order.id}`)}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer.name}</TableCell>
                        <TableCell className="hidden sm:table-cell">{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Badge
                                variant={
                                    order.status === 'Cancelled' ? 'destructive' : 'secondary'
                                }
                                className={cn(
                                    'capitalize',
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
                        <TableCell onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => router.push(`/admin/orders/${order.id}`)}>View Details</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
