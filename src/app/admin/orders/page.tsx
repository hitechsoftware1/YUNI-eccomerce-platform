
import { getAllUserOrders } from "@/lib/user-orders";
import { OrdersClient } from "./components/orders-client";
import type { Order } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function OrdersPage() {
  const orders: Order[] = getAllUserOrders();
  return <OrdersClient orders={orders} />;
}
