import type { Order } from '@/lib/types';

const allUserOrders: Order[] = [
    {
        id: 'ORD001',
        customer: { name: 'Olivia Martin', email: 'olivia.martin@email.com' },
        date: '2023-11-23',
        status: 'Fulfilled',
        total: 250000,
    },
    {
        id: 'ORD002',
        customer: { name: 'Jackson Lee', email: 'jackson.lee@email.com' },
        date: '2023-11-23',
        status: 'Pending',
        total: 150000,
    },
    {
        id: 'ORD003',
        customer: { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com' },
        date: '2023-11-22',
        status: 'Cancelled',
        total: 350000,
    },
    {
        id: 'ORD004',
        customer: { name: 'William Kim', email: 'will@email.com' },
        date: '2023-11-21',
        status: 'Fulfilled',
        total: 550000,
    },
    {
        id: 'ORD005',
        customer: { name: 'Sofia Davis', email: 'sofia.davis@email.com' },
        date: '2023-11-20',
        status: 'Fulfilled',
        total: 75000,
    },
    {
        id: 'ORD006',
        customer: { name: 'Olivia Martin', email: 'olivia.martin@email.com' },
        date: '2024-01-15',
        status: 'Fulfilled',
        total: 120000,
    },
    {
        id: 'ORD007',
        customer: { name: 'William Kim', email: 'will@email.com' },
        date: '2024-02-10',
        status: 'Pending',
        total: 89000,
    }
];

export function getOrdersByEmail(email: string | null | undefined): Order[] {
    if (!email) return [];
    return allUserOrders.filter(order => order.customer.email === email);
}
