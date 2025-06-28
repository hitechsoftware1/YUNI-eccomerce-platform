
'use server';

import { db } from './db';
import type { SellerPerformance } from './types';

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
