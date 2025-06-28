
'use server';

import { revalidatePath } from 'next/cache';
import { db } from './db';
import type { Order } from '@/lib/types';
import { addAdminNotification } from './notification-actions';

export async function updateOrderStatus(
  orderId: string,
  status: Order['status']
): Promise<Order | { error: string }> {
  const orderIndex = db.userOrders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return { error: 'Order not found' };
  }

  db.userOrders[orderIndex].status = status;
  
  await addAdminNotification({
    title: 'Order Status Updated',
    description: `Order ${orderId} is now "${status}".`,
    href: `/admin/orders/${orderId}`
  });

  // Revalidate paths to update UI across the app
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath('/account'); // User's order history
  revalidatePath(`/account/orders/${orderId}`); // User's order detail

  return db.userOrders[orderIndex];
}
