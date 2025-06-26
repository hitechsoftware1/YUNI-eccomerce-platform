
'use client';

import * as React from 'react';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { allProducts } from '@/lib/products';
import { 
    getWishlistItems, 
    addToWishlist as apiAddToWishlist, 
    removeFromWishlist as apiRemoveFromWishlist 
} from '@/lib/user-wishlist';

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
    // In a real app, this would be an async call to get the user's wishlist IDs.
    const initialIds = getWishlistItems().map(item => item.id);
    setWishlistProductIds(initialIds);
  }, []);

  const addToWishlist = (productId: string) => {
    if (wishlistProductIds.includes(productId)) {
        return; // Already in wishlist
    }
    apiAddToWishlist(productId); // Update "backend"
    setWishlistProductIds((prevIds) => [...prevIds, productId]); // Update client state
    toast({
        title: "Added to Wishlist",
        description: "Item has been saved to your wishlist.",
    });
  };

  const removeFromWishlist = (productId: string) => {
    if (!wishlistProductIds.includes(productId)) {
        return; // Not in wishlist
    }
    apiRemoveFromWishlist(productId); // Update "backend"
    setWishlistProductIds((prevIds) => prevIds.filter((id) => id !== productId)); // Update client state
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
