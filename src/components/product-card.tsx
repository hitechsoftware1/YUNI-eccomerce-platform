'use client';

import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/types";
import { useWishlist } from "@/contexts/wishlist-context";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import * as React from 'react';


interface ProductCardProps {
  product: Product;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            rating > i ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if(isWishlisted) {
          removeFromWishlist(product.id);
      } else {
          addToWishlist(product.id);
      }
  };

  return (
    <Card className="h-full w-full overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative aspect-square w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.dataAiHint}
            />
            <Button
                size="icon"
                variant="ghost"
                className="absolute top-1 right-1 h-8 w-8 rounded-full bg-card/60 hover:bg-card/90 backdrop-blur-sm"
                onClick={handleWishlistToggle}
                aria-label="Toggle Wishlist"
            >
                <Heart className={cn(
                    "h-5 w-5 text-foreground/80",
                    isWishlisted && "fill-red-500 text-red-500"
                )} />
            </Button>

            <div className="absolute top-2 left-2 flex flex-col gap-y-1">
                {discount > 0 && (
                <Badge variant="destructive">
                    -{discount}%
                </Badge>
                )}
                {product.isNew && (
                <Badge className="bg-accent text-accent-foreground">
                    NEW
                </Badge>
                )}
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-3">
            <div>
              <h3 className="font-semibold text-sm leading-tight truncate">
                {product.name}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <StarRating rating={product.rating} />
                {product.reviewCount && <span className="text-xs text-muted-foreground">({product.reviewCount})</span>}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-lg font-bold text-primary">
                UGX {product.price.toLocaleString()}
              </p>
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  UGX {product.originalPrice.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
