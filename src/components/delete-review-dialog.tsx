
'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteReview } from '@/lib/user-reviews';
import { useToast } from "@/hooks/use-toast";

interface DeleteReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  reviewId: string | null;
  onReviewDeleted: (reviewId: string) => void;
}

export function DeleteReviewDialog({ 
    isOpen, 
    onOpenChange, 
    reviewId, 
    onReviewDeleted
}: DeleteReviewDialogProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { toast } = useToast();

  const handleConfirm = async () => {
    if (!reviewId) return;

    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // simulate async
    deleteReview(reviewId);

    onReviewDeleted(reviewId);
    toast({ title: "Review Deleted", description: "Your review has been removed." });

    setIsDeleting(false);
    onOpenChange(false);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !isDeleting && onOpenChange(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your review.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm} 
            disabled={isDeleting} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
