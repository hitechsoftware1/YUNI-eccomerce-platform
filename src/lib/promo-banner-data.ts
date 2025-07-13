
import type { PromoBannerData } from '@/lib/types';
import { db } from './db';

// This file is now for getting the promo banner data from the db.
export const getPromoBanner = (): PromoBannerData | undefined => {
    // For this example, we assume there's only one main promo banner.
    // In a more complex app, you might have a way to flag which one is active.
    return db.promoBanners.find(b => b.enabled);
}
