
'use client';

import * as React from 'react';
import type { Order } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrdersTable } from './orders-table';

interface OrdersClientProps {
    orders: Order[];
}

export function OrdersClient({ orders }: OrdersClientProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
                Manage your store's orders and view their details.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <OrdersTable orders={orders} />
        </CardContent>
    </Card>
  )
}
