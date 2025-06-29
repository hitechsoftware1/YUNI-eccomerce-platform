import type { CuratedItem } from '@/lib/types';
import { db } from '@/lib/db';

export const curatedForYouItems: CuratedItem[] = [
  {
    id: 'curated-1',
    title: 'Anniversary',
    imageUrl: 'https://i.pinimg.com/564x/f7/cf/30/f7cf30a2b63897d8b5c46b38c2271c66.jpg',
    dataAiHint: 'anniversary celebration',
    link: '/search?q=anniversary',
  },
  {
    id: 'curated-2',
    title: 'Phones',
    imageUrl: 'https://i.pinimg.com/564x/c9/7e/c3/c97ec37b4e8220c35451e51f28b43820.jpg',
    dataAiHint: 'smartphones mobile',
    link: '/category/electronics',
  },
  {
    id: 'curated-3',
    title: 'Appliances',
    imageUrl: 'https://i.pinimg.com/564x/44/1a/35/441a350f6828557b8c83f33b3a7a409f.jpg',
    dataAiHint: 'refrigerator kitchen',
    link: '/search?q=appliances',
  },
  {
    id: 'curated-4',
    title: 'Televisions',
    imageUrl: 'https://i.pinimg.com/564x/5a/b0/20/5ab020e98583481232049b14b600969d.jpg',
    dataAiHint: 'television screen',
    link: '/category/tv-audio',
  },
  {
    id: 'curated-5',
    title: 'JForce',
    imageUrl: 'https://i.pinimg.com/564x/27/2b/d9/272bd9d8548c599141f1f1442c733355.jpg',
    dataAiHint: 'delivery team',
    link: '/search?q=jforce',
  },
  {
    id: 'curated-6',
    title: 'Call To Order',
    imageUrl: 'https://i.pinimg.com/564x/2e/7e/38/2e7e38221c97a9b3c4f9f257d34a476a.jpg',
    dataAiHint: 'customer service',
    link: 'tel:+256740522738',
  },
];


export function getCuratedForYouItems(): CuratedItem[] {
  return db.curatedForYouItems;
}
