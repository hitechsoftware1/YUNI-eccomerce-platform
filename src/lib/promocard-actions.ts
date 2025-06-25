'use server';

import { revalidatePath } from 'next/cache';
import { allPromoCards } from './promo-cards';
import type { PromoCard } from '@/lib/types';
import type { PromoCardFormValues } from '@/app/admin/promocards/components/promocard-form';

export async function addPromoCard(cardData: PromoCardFormValues) {
  const newCard: PromoCard = {
    id: `promo-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...cardData,
    imageUrl: cardData.imageUrl || 'https://placehold.co/400x500.png',
    dataAiHint: cardData.dataAiHint || cardData.title.toLowerCase().split(' ').slice(0, 2).join(' '),
  };
  allPromoCards.unshift(newCard);
  
  revalidatePath('/');
  revalidatePath('/admin/promocards');

  return newCard;
}

export async function updatePromoCard(id: string, cardData: PromoCardFormValues): Promise<PromoCard | undefined> {
    const cardIndex = allPromoCards.findIndex((p) => p.id === id);
    if (cardIndex === -1) {
        return undefined;
    }

    const existingCard = allPromoCards[cardIndex];
    const updatedCard: PromoCard = {
        ...existingCard,
        ...cardData,
        imageUrl: cardData.imageUrl || 'https://placehold.co/400x500.png',
        dataAiHint: cardData.dataAiHint || cardData.title.toLowerCase().split(' ').slice(0, 2).join(' '),
    };

    allPromoCards[cardIndex] = updatedCard;
    
    revalidatePath('/');
    revalidatePath('/admin/promocards');

    return updatedCard;
}

export async function deletePromoCard(id: string): Promise<void> {
    const cardIndex = allPromoCards.findIndex((p) => p.id === id);
    if (cardIndex === -1) return;
    
    allPromoCards.splice(cardIndex, 1);

    revalidatePath('/');
    revalidatePath('/admin/promocards');
}
