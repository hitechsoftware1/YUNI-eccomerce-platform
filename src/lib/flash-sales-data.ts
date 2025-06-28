import type { Product } from '@/lib/types';
import { getAllProducts } from './products';

// Define which products are part of the flash sale by their ID
const flashSaleProductIds: string[] = [
  'fs1',
  'fs2',
  'fs3',
  'fs4',
  'fs5',
  'fs6',
];

// Fetch the full product details for the flash sale items
export const getFlashSaleProducts = (): Product[] => {
    const allProducts = getAllProducts();
    return flashSaleProductIds
        .map(id => allProducts.find(p => p.id === id))
        .filter((p): p is Product => Boolean(p));
}
