
// This file simulates a cloud database for the user's shopping cart.
// In a real app, this would be tied to the user's session or account.

import type { Product } from './types';
import { db } from './db';

export type CartItem = Product & {
  quantity: number;
};

export function getCartItems(): CartItem[] {
  return db.cartItems;
}

export function addToCart(product: Product, quantity: number): void {
  const existingItem = db.cartItems.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    db.cartItems.push({ ...product, quantity });
  }
}

export function removeFromCart(productId: string): void {
  db.cartItems = db.cartItems.filter((item) => item.id !== productId);
}

export function updateQuantity(productId: string, quantity: number): void {
  const item = db.cartItems.find((item) => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
    }
  }
}

export function clearCart(): void {
  db.cartItems = [];
}
