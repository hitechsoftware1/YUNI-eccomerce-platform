
import type { Product } from '@/lib/types';
import { db } from './db';

export const getAllProducts = () => db.products;
export const getTopSellingProducts = () => db.products.filter(p => p.status !== 'Archived').slice(0, 6);
export const getNewArrivals = () => db.products.filter(p => p.isNew && p.status !== 'Archived').slice(0, 6);
export const getLatestProducts = () => db.products.filter(p => p.status !== 'Archived').slice(0, 8);
export const getGroceryProducts = () => db.products.filter(p => p.category === 'groceries' && p.status !== 'Archived').slice(0, 6);
export const getBeverageProducts = () => db.products.filter(p => p.category === 'beverages' && p.status !== 'Archived').slice(0, 6);

export function getProductById(id: string): Product | undefined {
  return db.products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return db.products.filter((product) => product.category === category && product.status !== 'Archived');
}
