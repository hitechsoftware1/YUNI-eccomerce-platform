
'use server';

import { revalidatePath } from 'next/cache';
import { allUserOrders } from './user-orders';
import type { Order } from '@/lib/types';

export async function updateOrderStatus(
  orderId: string,
  status: Order['status']
): Promise<Order | { error: string }> {
  const orderIndex = allUserOrders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return { error: 'Order not found' };
  }

  allUserOrders[orderIndex].status = status;
  
  // Revalidate paths to update UI across the app
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath('/account'); // User's order history
  revalidatePath(`/account/orders/${orderId}`); // User's order detail

  return allUserOrders[orderIndex];
}
