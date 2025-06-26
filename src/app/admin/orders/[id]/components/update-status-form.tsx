
'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { updateOrderStatus } from '@/lib/order-actions';
import type { Order } from '@/lib/types';

interface UpdateStatusFormProps {
    orderId: string;
    currentStatus: Order['status'];
}

export function UpdateStatusForm({ orderId, currentStatus }: UpdateStatusFormProps) {
    const { toast } = useToast();
    const [isUpdating, setIsUpdating] = React.useState(false);

    const handleStatusChange = async (newStatus: Order['status']) => {
        setIsUpdating(true);
        try {
            const result = await updateOrderStatus(orderId, newStatus);
            if ('error' in result) {
                throw new Error(result.error);
            }
            toast({
                title: "Status Updated",
                description: `Order status changed to ${newStatus}.`,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to update order status.',
                variant: 'destructive',
            });
        } finally {
            setIsUpdating(false);
        }
    };
    
    return (
        <Select onValueChange={handleStatusChange} defaultValue={currentStatus} disabled={isUpdating}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Change status..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
        </Select>
    );
}
