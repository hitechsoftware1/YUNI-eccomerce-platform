
import type { CuratedItem } from '@/lib/types';
import { db } from '@/lib/db';

export const curatedForYouItems: CuratedItem[] = [
  {
    id: 'curated-1',
    title: 'Anniversary Gifts',
    imageUrl: 'https://images.unsplash.com/photo-1598214997499-19d3df7e0c93?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'anniversary gift',
    link: '/search?q=anniversary',
  },
  {
    id: 'curated-2',
    title: 'Top-Tier Phones',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'smartphones mobile',
    link: '/category/electronics',
  },
  {
    id: 'curated-3',
    title: 'Home Appliances',
    imageUrl: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'refrigerator kitchen',
    link: '/search?q=appliances',
  },
  {
    id: 'curated-4',
    title: 'Crystal Clear TVs',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f82ac7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'television screen',
    link: '/category/tv-audio',
  },
  {
    id: 'curated-5',
    title: 'Join JForce',
    imageUrl: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'delivery team',
    link: '/search?q=jforce',
  },
  {
    id: 'curated-6',
    title: 'Call To Order',
    imageUrl: 'https://images.unsplash.com/photo-1615552441613-23b0a7a44284?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    dataAiHint: 'customer service',
    link: 'tel:+256740522738',
  },
];


export function getCuratedForYouItems(): CuratedItem[] {
  return db.curatedForYouItems;
}
