
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ReviewForm, type ReviewFormValues } from './review-form';
import type { UserReview } from '@/lib/types';
import { updateReview } from '@/lib/user-reviews';
import { useToast } from '@/hooks/use-toast';

interface EditReviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  review: UserReview | null;
  onReviewUpdate: (updatedReview: UserReview) => void;
}

export function EditReviewModal({ isOpen, onOpenChange, review, onReviewUpdate }: EditReviewModalProps) {
  const [isSaving, setIsSaving] = React.useState(false);
  const { toast } = useToast();

  const handleSave = async (data: ReviewFormValues) => {
    if (!review) return;
    setIsSaving(true);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    const updatedReview = updateReview(review.id, data);
    
    if (updatedReview) {
        onReviewUpdate(updatedReview);
        toast({ title: "Review Updated", description: "Your review has been successfully updated." });
    } else {
        toast({ title: "Error", description: "Failed to update review.", variant: 'destructive' });
    }
    
    setIsSaving(false);
    onOpenChange(false);
  };
  
  const initialData = review ? {
      title: review.title,
      comment: review.comment,
      rating: review.rating,
  } : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Your Review</DialogTitle>
          <DialogDescription>
            Update your rating and comments for {review?.productName}.
          </DialogDescription>
        </DialogHeader>
        {initialData && (
            <ReviewForm
                initialData={initialData}
                onSave={handleSave}
                onCancel={() => onOpenChange(false)}
                isSaving={isSaving}
            />
        )}
      </DialogContent>
    </Dialog>
  );
}
