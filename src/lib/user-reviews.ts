
import type { UserReview } from './types';
import { db } from './db';

// In a real app, this would be a filtered API call.
export function getReviewsByEmail(email: string | null | undefined): UserReview[] {
    if (!email) return [];
    // This is a mock, so we return all reviews for any logged-in user.
    return db.userReviews;
}

export function updateReview(reviewId: string, data: { title: string; comment: string; rating: number }): UserReview | undefined {
    const reviewIndex = db.userReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) {
        return undefined;
    }
    const updatedReview = { ...db.userReviews[reviewIndex], ...data };
    db.userReviews[reviewIndex] = updatedReview;
    return updatedReview;
}

export function deleteReview(reviewId: string): void {
    const reviewIndex = db.userReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex !== -1) {
        db.userReviews.splice(reviewIndex, 1);
    }
}
