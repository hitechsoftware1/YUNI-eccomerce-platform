
import type { CuratedItem } from '@/lib/types';
import { db } from '@/lib/db';

export const curatedForYouItems: CuratedItem[] = [
  {
    id: 'curated-1',
    title: 'Anniversary Gifts',
    imageUrl: 'https://i.pinimg.com/564x/a4/31/5a/a4315a6390145453086961234b68420c.jpg',
    dataAiHint: 'anniversary gift',
    link: '/search?q=anniversary',
  },
  {
    id: 'curated-2',
    title: 'Top-Tier Phones',
    imageUrl: 'https://i.pinimg.com/564x/a5/c4/1d/a5c41d1d86a420b996e3863489377d61.jpg',
    dataAiHint: 'smartphones mobile',
    link: '/category/electronics',
  },
  {
    id: 'curated-3',
    title: 'Home Appliances',
    imageUrl: 'https://i.pinimg.com/564x/c9/1a/f6/c91af6d26253ab123a6c5352c3c12652.jpg',
    dataAiHint: 'refrigerator kitchen',
    link: '/search?q=appliances',
  },
  {
    id: 'curated-4',
    title: 'Crystal Clear TVs',
    imageUrl: 'https://i.pinimg.com/564x/53/ac/68/53ac681ef946468449557f6c31154cdc.jpg',
    dataAiHint: 'television screen',
    link: '/category/tv-audio',
  },
  {
    id: 'curated-5',
    title: 'Join JForce',
    imageUrl: 'https://i.pinimg.com/564x/4d/53/7d/4d537d45c57b774653303685f0965b35.jpg',
    dataAiHint: 'delivery team',
    link: '/search?q=jforce',
  },
  {
    id: 'curated-6',
    title: 'Call To Order',
    imageUrl: 'https://i.pinimg.com/564x/47/97/3f/47973f1d293d0d3b6f2f2e519c67677d.jpg',
    dataAiHint: 'customer service',
    link: 'tel:+256740522738',
  },
];


export function getCuratedForYouItems(): CuratedItem[] {
  return db.curatedForYouItems;
}
