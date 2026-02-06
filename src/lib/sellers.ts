

'use server';

import { db } from './db';
import type { SellerPerformance, AdminSale, Order } from './types';

export async function getSellerPerformanceData(): Promise<SellerPerformance[]> {
    const sellers = db.users.filter(u => u.role === 'Seller');

    return sellers.map(seller => {
        const sellerProducts = db.products.filter(p => p.sellerName === seller.name);
        
        const productCount = sellerProducts.length;

        let totalRevenue = 0;
        const sellerOrderIds = new Set<string>();

        for (const order of db.userOrders) {
            if (!order.items) continue;
            for (const item of order.items) {
                if (item.sellerName === seller.name) {
                    totalRevenue += item.price * item.quantity;
                    sellerOrderIds.add(order.id);
                }
            }
        }
        
        const totalOrders = sellerOrderIds.size;
        
        let totalRating = 0;
        let ratedProductsCount = 0;
        for (const product of sellerProducts) {
            if (product.reviewCount && product.reviewCount > 0) {
                totalRating += product.rating;
                ratedProductsCount++;
            }
        }
        const averageRating = ratedProductsCount > 0 ? totalRating / ratedProductsCount : 0;
        
        return {
            id: seller.id,
            name: seller.name,
            email: seller.email,
            status: seller.status,
            productCount,
            totalRevenue,
            totalOrders,
            averageRating
        };
    });
}

export async function getSellerDashboardData(sellerName: string): Promise<{
    totalRevenue: number;
    totalSales: number;
    productCount: number;
    recentSales: AdminSale[];
    recentOrders: Order[];
    allSellerOrders: Order[];
}> {
    const sellerProducts = db.products.filter(p => p.sellerName === sellerName);
    const sellerProductIds = new Set(sellerProducts.map(p => p.id));
    
    const productCount = sellerProducts.length;

    let totalRevenue = 0;
    let totalSales = 0;
    const sellerOrders: Order[] = [];

    for (const order of db.userOrders) {
        if (!order.items) continue;
        
        const itemsFromSeller = order.items.filter(item => item.sellerName === sellerName);
        if (itemsFromSeller.length > 0) {
            sellerOrders.push(order);
            if (order.status === 'Fulfilled') {
                const revenueFromThisOrder = itemsFromSeller.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                totalRevenue += revenueFromThisOrder;
                totalSales++;
            }
        }
    }
    
    const recentOrders = sellerOrders
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
        
    const fulfilledSellerOrders = sellerOrders.filter(o => o.status === 'Fulfilled');
    
    const recentSales: AdminSale[] = fulfilledSellerOrders
        .slice(0, 5)
        .map(order => {
             const revenueFromThisOrder = (order.items || [])
                .filter(item => item.sellerName === sellerName)
                .reduce((acc, item) => acc + (item.price * item.quantity), 0);
            
            return {
                name: order.customer.name,
                email: order.customer.email,
                amount: `+UGX ${revenueFromThisOrder.toLocaleString()}`,
                fallback: order.customer.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U',
            };
        });

    return { totalRevenue, totalSales, productCount, recentSales, recentOrders, allSellerOrders: sellerOrders };
}
