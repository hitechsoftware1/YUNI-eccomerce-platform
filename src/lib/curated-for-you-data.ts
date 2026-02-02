
import type { CuratedItem } from '@/lib/types';
import { db } from '@/lib/db';

export const curatedForYouItems: CuratedItem[] = [
  {
    id: 'curated-1',
    title: 'Anniversary Gifts',
    imageUrl: 'https://i.pinimg.com/1200x/72/70/f7/7270f7110ad339561cae100259f0f975.jpg',
    dataAiHint: 'anniversary gift',
    link: '/search?q=anniversary',
  },
  {
    id: 'curated-2',
    title: 'Top-Tier Phones',
    imageUrl: 'https://i.pinimg.com/1200x/67/11/0e/67110ed291bbb9ca79f5092583ce1ff5.jpg',
    dataAiHint: 'smartphones mobile',
    link: '/category/electronics',
  },
  {
    id: 'curated-3',
    title: 'Home Appliances',
    imageUrl: 'https://i.pinimg.com/1200x/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg',
    dataAiHint: 'refrigerator kitchen',
    link: '/search?q=appliances',
  },
  {
    id: 'curated-4',
    title: 'Crystal Clear TVs',
    imageUrl: 'https://i.pinimg.com/1200x/c1/dc/7c/c1dc7c85271786d9699b441448ad3628.jpg',
    dataAiHint: 'television screen',
    link: '/category/tv-audio',
  },
  {
    id: 'curated-5',
    title: 'Owino Market',
    imageUrl: 'https://i.pinimg.com/1200x/44/92/78/449278f9a5a338a6e90d7fef18ae4f5e.jpg',
    dataAiHint: 'delivery team',
    link: '/search?q=owino',
  },
  {
    id: 'curated-6',
    title: 'Call To Order',
    imageUrl: 'https://i.pinimg.com/1200x/30/9f/9b/309f9bbf3eba80d6814b8f41c349f5ea.jpg',
    dataAiHint: 'customer service',
    link: 'tel:+256742928508',
  },
];


export function getCuratedForYouItems(): CuratedItem[] {
  return db.curatedForYouItems;
}
