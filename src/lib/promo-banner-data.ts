
import type { PromoBannerData } from '@/lib/types';

// This is the single source of truth for the static promo banner data.
// It is imported by db.ts to initialize the database state.
export const promoBannerData: PromoBannerData = {
  title: 'Fresh Groceries',
  subtitle: 'Get your daily essentials delivered to your doorstep. Quality guaranteed.',
  buttonText: 'Shop Groceries',
  link: '/category/groceries',
  imageUrl: 'https://i.pinimg.com/564x/f2/83/87/f2838797f1f33a18a5f36e3a9c73e878.jpg',
  dataAiHint: 'grocery banner'
};
