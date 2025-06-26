
'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';
import type { SellerPerformance } from '@/lib/types';
import { cn } from "@/lib/utils";

interface SellersTableProps {
    sellers: SellerPerformance[];
}

export function SellersTable({ sellers }: SellersTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Seller</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Products</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Total Revenue</TableHead>
                    <TableHead className="text-right">Avg. Rating</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sellers.map((seller) => (
                    <TableRow key={seller.id}>
                        <TableCell>
                            <div className="font-medium">{seller.name}</div>
                            <div className="text-sm text-muted-foreground">{seller.email}</div>
                        </TableCell>
                        <TableCell>
                            <Badge variant={seller.status === 'Banned' ? 'destructive' : 'outline'} className={cn('capitalize', 
                                seller.status === 'Active' && 'border-green-500 text-green-600',
                                seller.status === 'Pending Approval' && 'border-yellow-500 text-yellow-600'
                            )}>
                                {seller.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">{seller.productCount}</TableCell>
                        <TableCell className="text-right">{seller.totalOrders}</TableCell>
                        <TableCell className="text-right">UGX {seller.totalRevenue.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                           <div className="flex items-center justify-end gap-1">
                             <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                             <span>{seller.averageRating.toFixed(1)}</span>
                           </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
