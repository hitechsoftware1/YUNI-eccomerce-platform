
import type { HomepageSection } from '@/lib/types';

// This file acts as a mock database for the homepage layout.
// It will be modified by server actions.
export let homepageSectionsData: HomepageSection[] = [
  { id: 'sec-1', type: 'HeroSlider', title: 'Hero Slider', enabled: true, order: 1 },
  { id: 'sec-2', type: 'AnimatedBanner', title: 'Welcome Banner', enabled: true, order: 2 },
  { id: 'sec-3', type: 'CategoryGrid', title: 'Categories', enabled: true, order: 3 },
  { id: 'sec-4', type: 'FlashSales', title: 'Flash Sales', enabled: true, order: 4 },
  { id: 'sec-5', type: 'PromoBanner', title: 'Main Promo Banner', enabled: true, order: 5 },
  { id: 'sec-6', type: 'ProductSection', title: 'Top Selling Items', enabled: true, order: 6, productSource: 'top-selling' },
  { id: 'sec-7', type: 'ProductSection', title: 'New Arrivals', enabled: true, order: 7, productSource: 'new-arrivals' },
  { id: 'sec-8', type: 'ProductSection', title: 'Groceries', enabled: true, order: 8, productSource: 'groceries' },
  { id: 'sec-9', type: 'ProductSection', title: 'Beverages', enabled: true, order: 9, productSource: 'beverages' },
  { id: 'sec-10', type: 'LatestProducts', title: 'Latest Products Grid', enabled: true, order: 10 },
  { id: 'sec-11', type: 'ExploreMore', title: 'Explore More Grid', enabled: true, order: 11 },
  { id: 'sec-12', type: 'SecondaryPromoGrid', title: 'Secondary Promo Banners', enabled: true, order: 12 },
];

export function getHomepageSections() {
  return homepageSectionsData.sort((a, b) => a.order - b.order);
}

export function getHomepageSectionById(id: string) {
  return homepageSectionsData.find(s => s.id === id);
}
