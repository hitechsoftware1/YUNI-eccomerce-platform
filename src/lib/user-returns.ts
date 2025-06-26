
import type { UserReturn } from './types';
import { allUserOrders } from './user-orders';

const returnedOrder1 = allUserOrders.find(o => o.id === 'ORD001');
const returnedOrder7 = allUserOrders.find(o => o.id === 'ORD007');

let allUserReturns: UserReturn[] = [
    {
        id: 'RET001',
        orderId: 'ORD001',
        date: '2023-11-25',
        status: 'Refunded',
        items: returnedOrder1?.items?.map(i => ({ productId: i.id, productName: i.name, quantity: i.quantity })) || []
    },
    {
        id: 'RET002',
        orderId: 'ORD007',
        date: '2024-02-12',
        status: 'Processing',
        items: returnedOrder7?.items?.map(i => ({ productId: i.id, productName: i.name, quantity: i.quantity })) || []
    }
];

// This is a mock function. In a real app, this would be an API call
// that fetches returns for a specific user.
export function getReturnsForUser(email: string | null | undefined): UserReturn[] {
    if (!email) {
        return [];
    }
    // For this mock, we'll return returns for orders that belong to the user.
    const userOrders = allUserOrders.filter(o => o.customer.email === email);
    const userOrderIds = userOrders.map(o => o.id);
    return allUserReturns.filter(r => userOrderIds.includes(r.orderId));
}
