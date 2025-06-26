
import { allProducts } from './products';
import type { Product } from './types';

// This file simulates a cloud database for user wishlists.
// In a real app, you would replace this with calls to a database like Firestore,
// and these functions would likely be asynchronous and user-specific.

// Let's start with a few items in the wishlist for demonstration.
let wishlistProductIds: string[] = ['1', 'fs6', 'lp2'];

export function getWishlistItems(): Product[] {
  // In a real app:
  // const wishlistSnap = await db.collection('users').doc(userId).get('wishlist');
  // const ids = wishlistSnap.data()?.productIds || [];
  // return await getProductsByIds(ids);

  return wishlistProductIds
    .map(id => allProducts.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p));
}

export function addToWishlist(productId: string): void {
  // In a real app: await db.collection('users').doc(userId).update({ wishlist: FieldValue.arrayUnion(productId) })
  if (!wishlistProductIds.includes(productId)) {
    wishlistProductIds.push(productId);
  }
}

export function removeFromWishlist(productId: string): void {
  // In a real app: await db.collection('users').doc(userId).update({ wishlist: FieldValue.arrayRemove(productId) })
  wishlistProductIds = wishlistProductIds.filter(id => id !== productId);
}

export function clearWishlist(): void {
  wishlistProductIds = [];
}
