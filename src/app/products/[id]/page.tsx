
'use client';

import * as React from 'react';
import { getProductById, allProducts } from '@/lib/products';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Minus, Plus, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProductSection } from '@/components/product-section';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { cn } from '@/lib/utils';
import { addRecentlyViewedItem } from '@/lib/recently-viewed';

const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount?: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              rating > i ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-muted-foreground text-sm">({rating.toFixed(1)})</span>
      {reviewCount && <span className="text-muted-foreground text-sm">{reviewCount.toLocaleString()} reviews</span>}
    </div>
  );
};

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = getProductById(params.id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    if (product) {
      // In a real app, this might be an API call to a "recently viewed" service.
      addRecentlyViewedItem(product.id);
    }
  }, [product]);

  if (!product) {
    notFound();
  }
  
  const isWishlisted = isInWishlist(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const sameCategoryProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const otherCategoryProducts = allProducts.filter(
    (p) => p.category !== product.category
  );

  const relatedProducts = [...sameCategoryProducts, ...otherCategoryProducts].slice(0, 5);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleWishlistToggle = () => {
    if (!product) return;
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-2 py-6 sm:px-4 md:py-8 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image Gallery */}
            <div className="relative">
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  data-ai-hint={product.dataAiHint}
                  priority
                />
              </div>
              {discount > 0 && (
                <Badge variant="destructive" className="absolute top-4 left-4 text-base">
                  -{discount}%
                </Badge>
              )}
               {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-base">
                  NEW
                </Badge>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              </div>

              <div className="space-y-2">
                 <p className="text-3xl font-bold text-primary">
                  UGX {product.price.toLocaleString()}
                </p>
                {product.originalPrice && (
                  <p className="text-xl text-muted-foreground line-through">
                    UGX {product.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold">Quantity:</h3>
                <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                        <Minus className="h-4 w-4"/>
                    </Button>
                    <span className="px-4 font-bold">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQuantity(q => q + 1)}>
                        <Plus className="h-4 w-4"/>
                    </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                      <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1" onClick={handleWishlistToggle}>
                      <Heart className={cn("mr-2 h-5 w-5", isWishlisted && "fill-red-500 text-red-500")} /> 
                      {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                  </Button>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <ProductSection title="Related Products" products={relatedProducts} />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
