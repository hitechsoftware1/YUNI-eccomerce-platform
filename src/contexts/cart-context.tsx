
'use client';

import * as React from 'react';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import {
  getCartItems as apiGetCartItems,
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  updateQuantity as apiUpdateQuantity,
  clearCart as apiClearCart,
} from '@/lib/user-cart';

export type CartItem = Product & {
  quantity: number;
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  cartTotal: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  React.useEffect(() => {
    // This effect now runs whenever the user changes.
    if (currentUser) {
      // If a user is logged in, load their cart from the mock backend.
      setCartItems(apiGetCartItems());
    } else {
      // If no user is logged in (e.g., after logout), clear the cart state.
      setCartItems([]);
    }
  }, [currentUser]);

  const addToCart = (product: Product, quantity: number) => {
    apiAddToCart(product, quantity);
    setCartItems([...apiGetCartItems()]); // "re-fetch" from the mock backend

    toast({
        title: "Added to Cart",
        description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    apiRemoveFromCart(productId);
    setCartItems([...apiGetCartItems()]); // "re-fetch"

    toast({
        title: "Item Removed",
        description: `Item has been removed from your cart.`,
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    apiUpdateQuantity(productId, quantity);
    setCartItems([...apiGetCartItems()]); // "re-fetch"
  };
  
  const clearCart = () => {
    apiClearCart();
    setCartItems([]);
  };

  const itemCount = React.useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = React.useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
