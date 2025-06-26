
import type { UserReview } from './types';
import { allProducts } from './products';

const product1 = allProducts.find(p => p.id === '1');
const product6 = allProducts.find(p => p.id === '6');

export let allUserReviews: UserReview[] = [
  {
    id: 'rev1',
    productId: '1',
    productName: product1?.name || 'Premium Wireless Headphones',
    productImageUrl: product1?.imageUrl || 'https://placehold.co/300x300.png',
    rating: 5,
    title: 'Absolutely Amazing!',
    comment: 'The sound quality is out of this world. Noise cancellation works like a charm. Worth every penny!',
    date: '2023-12-05',
  },
  {
    id: 'rev2',
    productId: '6',
    productName: product6?.name || 'Ultra-Light Running Shoes',
    productImageUrl: product6?.imageUrl || 'https://placehold.co/300x300.png',
    rating: 4,
    title: 'Great for daily runs',
    comment: 'Very comfortable and light. I use them for my morning runs and they have been great. Good value for money.',
    date: '2023-11-28',
  },
];

// In a real app, this would be a filtered API call.
export function getReviewsByEmail(email: string | null | undefined): UserReview[] {
    if (!email) return [];
    // This is a mock, so we return all reviews for any logged-in user.
    return allUserReviews;
}

export function updateReview(reviewId: string, data: { title: string; comment: string; rating: number }): UserReview | undefined {
    const reviewIndex = allUserReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) {
        return undefined;
    }
    const updatedReview = { ...allUserReviews[reviewIndex], ...data };
    allUserReviews[reviewIndex] = updatedReview;
    return updatedReview;
}

export function deleteReview(reviewId: string): void {
    const reviewIndex = allUserReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex !== -1) {
        allUserReviews.splice(reviewIndex, 1);
    }
}
