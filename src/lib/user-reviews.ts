

import type { UserReview } from './types';
import { db, persistDb } from './db';

// In a real app, this would be a filtered API call.
export function getReviewsByEmail(email: string | null | undefined): UserReview[] {
    if (!email) return [];
    return db.userReviews.filter(review => review.userEmail === email);
}

export function updateReview(reviewId: string, data: { title: string; comment: string; rating: number }): UserReview | undefined {
    const reviewIndex = db.userReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) {
        return undefined;
    }
    const updatedReview = { ...db.userReviews[reviewIndex], ...data };
    db.userReviews[reviewIndex] = updatedReview;
    persistDb();
    return updatedReview;
}

export function deleteReview(reviewId: string): void {
    const reviewIndex = db.userReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex !== -1) {
        db.userReviews.splice(reviewIndex, 1);
        persistDb();
    }
}
