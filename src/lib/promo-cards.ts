import type { PromoCard } from './types';
import { db } from './db';

export function getAllPromoCards(): PromoCard[] {
    return db.promoCards;
}

export function getPromoCardById(id: string): PromoCard | undefined {
    return db.promoCards.find((card) => card.id === id);
}
