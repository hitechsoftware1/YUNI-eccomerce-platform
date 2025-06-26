
import type { Product } from './types';
import { allProducts } from './products';

// This file simulates a cloud database for recently viewed items.
// In a real app, this would be a user-specific collection in a database.
let recentlyViewedIds: string[] = [];

export function getRecentlyViewedItems(): Product[] {
  return recentlyViewedIds
    .map(id => allProducts.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p));
}

export function addRecentlyViewedItem(productId: string): void {
  // Remove if it already exists to move it to the front
  recentlyViewedIds = recentlyViewedIds.filter(id => id !== productId);
  // Add to the front
  recentlyViewedIds.unshift(productId);
  // Keep only the latest 10 items
  recentlyViewedIds = recentlyViewedIds.slice(0, 10);
}
