'use client';

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { UserReview } from "@/lib/types";

interface UserReviewCardProps {
  review: UserReview;
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

export function UserReviewCard({ review }: UserReviewCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
        <Link href={`/products/${review.productId}`}>
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                <Image src={review.productImageUrl} alt={review.productName} fill className="object-cover" />
            </div>
        </Link>
        <div className="flex-grow">
            <div>
                 <Link href={`/products/${review.productId}`} className="hover:underline">
                    <p className="font-semibold">{review.productName}</p>
                 </Link>
                <StarRating rating={review.rating} />
                <p className="text-sm text-muted-foreground mt-1">Reviewed on {new Date(review.date).toLocaleDateString()}</p>
            </div>
            <p className="mt-2 text-sm font-medium">{review.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
        </div>
    </div>
  );
}
