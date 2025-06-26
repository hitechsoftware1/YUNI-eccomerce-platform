'use server';

import { revalidatePath } from 'next/cache';
import { allSecondaryPromos } from './secondary-promo-data';
import type { SecondaryPromoGridItem } from '@/lib/types';
import type { PromoBannerFormValues } from '@/app/admin/promobanners/components/promobanner-form';
import { addAdminNotification } from './notification-actions';

export async function addPromoBanner(bannerData: PromoBannerFormValues) {
  const newBanner: SecondaryPromoGridItem = {
    id: `sec-promo-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...bannerData,
    imageUrl: bannerData.imageUrl || 'https://placehold.co/600x300.png',
    dataAiHint: bannerData.dataAiHint || bannerData.alt.toLowerCase().split(' ').slice(0, 2).join(' '),
  };
  allSecondaryPromos.push(newBanner);
  
  addAdminNotification({
    title: 'New Promo Banner',
    description: `A new promo banner was created.`,
    href: `/admin/promobanners`
  });

  revalidatePath('/');
  revalidatePath('/admin/promobanners');

  return newBanner;
}

export async function updatePromoBanner(id: string, bannerData: PromoBannerFormValues): Promise<SecondaryPromoGridItem | undefined> {
    const bannerIndex = allSecondaryPromos.findIndex((p) => p.id === id);
    if (bannerIndex === -1) {
        return undefined;
    }

    const existingBanner = allSecondaryPromos[bannerIndex];
    const updatedBanner: SecondaryPromoGridItem = {
        ...existingBanner,
        ...bannerData,
        imageUrl: bannerData.imageUrl || 'https://placehold.co/600x300.png',
        dataAiHint: bannerData.dataAiHint || bannerData.alt.toLowerCase().split(' ').slice(0, 2).join(' '),
    };

    allSecondaryPromos[bannerIndex] = updatedBanner;
    
    addAdminNotification({
        title: 'Promo Banner Updated',
        description: `Promo banner "${updatedBanner.alt}" was updated.`,
        href: `/admin/promobanners`
    });

    revalidatePath('/');
    revalidatePath('/admin/promobanners');

    return updatedBanner;
}

export async function deletePromoBanner(id: string): Promise<void> {
    const bannerIndex = allSecondaryPromos.findIndex((p) => p.id === id);
    if (bannerIndex === -1) return;
    
    const deletedBanner = allSecondaryPromos[bannerIndex];
    allSecondaryPromos.splice(bannerIndex, 1);

    addAdminNotification({
        title: 'Promo Banner Deleted',
        description: `Promo banner "${deletedBanner.alt}" was deleted.`,
        href: `/admin/promobanners`
    });

    revalidatePath('/');
    revalidatePath('/admin/promobanners');
}
