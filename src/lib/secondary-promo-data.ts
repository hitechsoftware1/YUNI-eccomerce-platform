import type { SecondaryPromoGridItem } from '@/lib/types';

export let allSecondaryPromos: SecondaryPromoGridItem[] = [
  {
    id: 'promo1',
    alt: 'Lato Milk Promotion',
    imageUrl: 'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtaWxrJTIwcHJvbW90aW9ufGVufDB8fHx8MTc1MDgxMDMxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'milk promotion',
    link: '#',
    aspectRatio: '2/1',
  },
  {
    id: 'promo2',
    alt: 'Tang Promotion',
    imageUrl: 'https://images.unsplash.com/photo-1727233431592-8baaf337ee44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8anVpY2UlMjBwcm9tb3Rpb258ZW58MHx8fHwxNzUwODEwMzE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'juice promotion',
    link: '#',
    aspectRatio: '2/1',
  },
  {
    id: 'promo3',
    alt: 'Tropical Heat Snack Promotion',
    imageUrl: 'https://images.unsplash.com/photo-1585704169993-af12385bf3a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzbmFjayUyMHByb21vdGlvbnxlbnwwfHx8fDE3NTA4MTAzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'snack promotion',
    link: '#',
    aspectRatio: '4/1',
  },
];

export const getSecondaryPromoById = (id: string) => allSecondaryPromos.find(p => p.id === id);
