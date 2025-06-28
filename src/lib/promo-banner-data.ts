
import type { PromoBannerData } from '@/lib/types';

// This is the single source of truth for the static promo banner data.
// It is imported by db.ts to initialize the database state.
export const promoBannerData: PromoBannerData = {
  title: 'Fresh Groceries',
  subtitle: 'Get your daily essentials delivered to your doorstep. Quality guaranteed.',
  buttonText: 'Shop Groceries',
  link: '/category/groceries',
  imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwYmFubmVyfGVufDB8fHx8MTc1MDc3NzY1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  dataAiHint: 'grocery banner'
};
