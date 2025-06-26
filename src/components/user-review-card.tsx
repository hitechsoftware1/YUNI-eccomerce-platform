
'use client';

import Image from "next/image";
import Link from "next/link";
import { Star, Pencil, Trash2 } from "lucide-react";
import type { UserReview } from "@/lib/types";
import { Button } from "./ui/button";

interface UserReviewCardProps {
  review: UserReview;
  onEdit: (review: UserReview) => void;
  onDelete: (reviewId: string) => void;
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

export function UserReviewCard({ review, onEdit, onDelete }: UserReviewCardProps) {
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
         <div className="flex flex-col gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(review)}>
                <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(review.id)}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    </div>
  );
}
