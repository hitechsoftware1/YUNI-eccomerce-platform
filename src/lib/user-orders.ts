
import type { Order, Address, OrderItem } from '@/lib/types';
import { allProducts } from './products';

const mockAddress1: Address = {
    id: 'addr-1',
    fullName: 'Olivia Martin',
    addressLine1: '123 Fictional St',
    city: 'Kampala',
    country: 'Uganda',
    postalCode: '10101',
    phoneNumber: '+256 700 123456'
};

const mockAddress2: Address = {
    id: 'addr-2',
    fullName: 'Jackson Lee',
    addressLine1: '456 Imaginary Ave',
    city: 'Entebbe',
    country: 'Uganda',
    postalCode: '10102',
    phoneNumber: '+256 700 654321'
};

const mockAddress3: Address = {
    id: 'addr-3',
    fullName: 'William Kim',
    addressLine1: '789 Madeup Rd',
    city: 'Jinja',
    country: 'Uganda',
    postalCode: '10103',
    phoneNumber: '+256 700 789012'
};

const mapProductToOrderItem = (product: any, quantity: number): OrderItem => {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        imageUrl: product.imageUrl,
        dataAiHint: product.dataAiHint,
        sellerName: product.sellerName,
    };
};

export const allUserOrders: Order[] = [
    {
        id: 'ORD001',
        customer: { name: 'Olivia Martin', email: 'olivia.martin@email.com' },
        date: '2023-11-23',
        status: 'Fulfilled',
        total: 250000,
        shippingAddress: mockAddress1,
        items: [
            mapProductToOrderItem(allProducts.find(p => p.id === '1'), 1),
            mapProductToOrderItem(allProducts.find(p => p.id === '4'), 1),
        ].filter(item => item.id) as OrderItem[],
    },
    {
        id: 'ORD002',
        customer: { name: 'Jackson Lee', email: 'jackson.lee@email.com' },
        date: '2023-11-23',
        status: 'Pending',
        total: 150000,
        shippingAddress: mockAddress2,
        items: [
             mapProductToOrderItem(allProducts.find(p => p.id === 'g1'), 10),
        ].filter(item => item.id) as OrderItem[],
    },
    {
        id: 'ORD003',
        customer: { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com' },
        date: '2023-11-22',
        status: 'Cancelled',
        total: 350000,
        shippingAddress: mockAddress1,
        items: [
             mapProductToOrderItem(allProducts.find(p => p.id === 'fs2'), 1),
        ].filter(item => item.id) as OrderItem[],
    },
    {
        id: 'ORD004',
        customer: { name: 'William Kim', email: 'will@email.com' },
        date: '2023-11-21',
        status: 'Fulfilled',
        total: 550000,
        shippingAddress: mockAddress3,
        items: [
            mapProductToOrderItem(allProducts.find(p => p.id === '6'), 1),
        ].filter(item => item.id) as OrderItem[],
    },
    {
        id: 'ORD005',
        customer: { name: 'Sofia Davis', email: 'sofia.davis@email.com' },
        date: '2023-11-20',
        status: 'Fulfilled',
        total: 75000,
         shippingAddress: mockAddress2,
        items: [
             mapProductToOrderItem(allProducts.find(p => p.id === 'b1'), 30),
        ].filter(item => item.id) as OrderItem[],
    },
    {
        id: 'ORD006',
        customer: { name: 'Olivia Martin', email: 'olivia.martin@email.com' },
        date: '2024-01-15',
        status: 'Fulfilled',
        total: 120000,
        shippingAddress: mockAddress1,
        items: [
            mapProductToOrderItem(allProducts.find(p => p.id === 'b2'), 10),
            mapProductToOrderItem(allProducts.find(p => p.id === 'b3'), 10),
        ].filter(item => item.id) as OrderItem[],
    },
    {
        id: 'ORD007',
        customer: { name: 'William Kim', email: 'will@email.com' },
        date: '2024-02-10',
        status: 'Pending',
        total: 89000,
        shippingAddress: mockAddress3,
        items: [
             mapProductToOrderItem(allProducts.find(p => p.id === 'lp7'), 1),
        ].filter(item => item.id) as OrderItem[],
    }
];

export function getOrdersByEmail(email: string | null | undefined): Order[] {
    if (!email) return [];
    return allUserOrders.filter(order => order.customer.email === email);
}

export function getOrderById(id: string): Order | undefined {
    // In a real app, this would also check if the order belongs to the current user.
    return allUserOrders.find(order => order.id === id);
}
