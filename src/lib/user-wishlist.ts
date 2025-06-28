
import { getAllProducts } from './products';
import type { Product } from './types';
import { db } from './db';

// This file simulates a cloud database for user wishlists.
// In a real app, you would replace this with calls to a database like Firestore,
// and these functions would likely be asynchronous and user-specific.


export function getWishlistItems(): Product[] {
  // In a real app:
  // const wishlistSnap = await db.collection('users').doc(userId).get('wishlist');
  // const ids = wishlistSnap.data()?.productIds || [];
  // return await getProductsByIds(ids);
  const allProducts = getAllProducts();

  return db.wishlistProductIds
    .map(id => allProducts.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p));
}

export function addToWishlist(productId: string): void {
  // In a real app: await db.collection('users').doc(userId).update({ wishlist: FieldValue.arrayUnion(productId) })
  if (!db.wishlistProductIds.includes(productId)) {
    db.wishlistProductIds.push(productId);
  }
}

export function removeFromWishlist(productId: string): void {
  // In a real app: await db.collection('users').doc(userId).update({ wishlist: FieldValue.arrayRemove(productId) })
  db.wishlistProductIds = db.wishlistProductIds.filter(id => id !== productId);
}

export function clearWishlist(): void {
  db.wishlistProductIds = [];
}
