
'use client';

import * as React from 'react';
import type { SellerPerformance } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SellersTable } from './sellers-table';

interface SellersClientProps {
    sellers: SellerPerformance[];
}

export function SellersClient({ sellers }: SellersClientProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Seller Management</CardTitle>
            <CardDescription>
                Track seller performance and manage their status.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <SellersTable sellers={sellers} />
        </CardContent>
    </Card>
  )
}
