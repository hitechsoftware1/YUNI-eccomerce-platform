
import type { Order } from '@/lib/types';
import { db } from './db';

export function getAllUserOrders(): Order[] {
    return db.userOrders;
}

export function getOrdersByEmail(email: string | null | undefined): Order[] {
    if (!email) return [];
    return db.userOrders.filter(order => order.customer.email === email);
}

export function getOrderById(id: string): Order | undefined {
    // In a real app, this would also check if the order belongs to the current user.
    return db.userOrders.find(order => order.id === id);
}
