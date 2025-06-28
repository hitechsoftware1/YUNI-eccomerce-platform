
'use server';

import { revalidatePath } from 'next/cache';
import { db } from './db';
import type { PromoCard } from '@/lib/types';
import type { PromoCardFormValues } from '@/app/admin/promocards/components/promocard-form';
import { addAdminNotification } from './notification-actions';

export async function addPromoCard(cardData: PromoCardFormValues) {
  const newCard: PromoCard = {
    id: `promo-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...cardData,
    imageUrl: cardData.imageUrl || 'https://placehold.co/400x500.png',
    dataAiHint: cardData.dataAiHint || cardData.title.toLowerCase().split(' ').slice(0, 2).join(' '),
  };
  db.promoCards.unshift(newCard);

  await addAdminNotification({
    title: 'New Promo Card',
    description: `Card "${newCard.title}" was created.`,
    href: `/admin/promocards`
  });
  
  revalidatePath('/');
  revalidatePath('/admin/promocards');

  return newCard;
}

export async function updatePromoCard(id: string, cardData: PromoCardFormValues): Promise<PromoCard | undefined> {
    const cardIndex = db.promoCards.findIndex((p) => p.id === id);
    if (cardIndex === -1) {
        return undefined;
    }

    const existingCard = db.promoCards[cardIndex];
    const updatedCard: PromoCard = {
        ...existingCard,
        ...cardData,
        imageUrl: cardData.imageUrl || 'https://placehold.co/400x500.png',
        dataAiHint: cardData.dataAiHint || cardData.title.toLowerCase().split(' ').slice(0, 2).join(' '),
    };

    db.promoCards[cardIndex] = updatedCard;

    await addAdminNotification({
        title: 'Promo Card Updated',
        description: `Card "${updatedCard.title}" was updated.`,
        href: `/admin/promocards`
    });
    
    revalidatePath('/');
    revalidatePath('/admin/promocards');

    return updatedCard;
}

export async function deletePromoCard(id: string): Promise<void> {
    const cardIndex = db.promoCards.findIndex((p) => p.id === id);
    if (cardIndex === -1) return;
    
    const deletedCard = db.promoCards[cardIndex];
    db.promoCards.splice(cardIndex, 1);

    await addAdminNotification({
        title: 'Promo Card Deleted',
        description: `Card "${deletedCard.title}" was deleted.`,
        href: `/admin/promocards`
    });

    revalidatePath('/');
    revalidatePath('/admin/promocards');
}
