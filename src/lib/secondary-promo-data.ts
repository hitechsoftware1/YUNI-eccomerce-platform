import type { SecondaryPromoGridItem } from '@/lib/types';
import { db } from './db';

export function getAllSecondaryPromos(): SecondaryPromoGridItem[] {
    return db.secondaryPromos;
}

export const getSecondaryPromoById = (id: string) => db.secondaryPromos.find(p => p.id === id);
