'use client';

import * as React from 'react';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { allProducts } from '@/lib/products';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
}

const WishlistContext = React.createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistProductIds, setWishlistProductIds] = React.useState<string[]>([]);
  const { toast } = useToast();

  React.useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('yuni-wishlist');
      if (storedWishlist) {
        setWishlistProductIds(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
      setWishlistProductIds([]);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('yuni-wishlist', JSON.stringify(wishlistProductIds));
  }, [wishlistProductIds]);
  
  const addToWishlist = (productId: string) => {
    if (wishlistProductIds.includes(productId)) {
        return; // Already in wishlist
    }
    setWishlistProductIds((prevIds) => [...prevIds, productId]);
    toast({
        title: "Added to Wishlist",
        description: "Item has been saved to your wishlist.",
    });
  };

  const removeFromWishlist = (productId: string) => {
    if (!wishlistProductIds.includes(productId)) {
        return; // Not in wishlist
    }
    setWishlistProductIds((prevIds) => prevIds.filter((id) => id !== productId));
     toast({
        title: "Removed from Wishlist",
        description: `Item has been removed from your wishlist.`,
    });
  };
  
  const isInWishlist = (productId: string) => {
      return wishlistProductIds.includes(productId);
  };
  
  const wishlistItems = React.useMemo(() => {
      return wishlistProductIds.map(id => allProducts.find(p => p.id === id)).filter((p): p is Product => Boolean(p));
  }, [wishlistProductIds]);

  const itemCount = wishlistProductIds.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        itemCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = React.useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
