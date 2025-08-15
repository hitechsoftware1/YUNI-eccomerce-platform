
'use server';

import { revalidatePath } from 'next/cache';
import { db, persistDb } from './db';
import type { HeroSlide } from '@/lib/types';
import type { BannerFormValues } from '@/app/admin/banners/components/banner-form';
import { addAdminNotification } from './notification-actions';

export async function addHeroSlide(bannerData: BannerFormValues) {
  const newSlide: HeroSlide = {
    id: `slide-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...bannerData,
    enabled: bannerData.enabled,
    imageUrl: bannerData.imageUrl || 'https://placehold.co/1600x600.png',
    dataAiHint: bannerData.dataAiHint || bannerData.title.toLowerCase().split(' ').slice(0, 2).join(' '),
  };
  db.heroSlides.unshift(newSlide);
  persistDb();

  await addAdminNotification({
    title: 'New Hero Banner',
    description: `Banner "${newSlide.title}" was created.`,
    href: `/admin/banners`
  });
  
  revalidatePath('/');
  revalidatePath('/admin/banners');

  return newSlide;
}

export async function updateHeroSlide(id: string, bannerData: BannerFormValues): Promise<HeroSlide | undefined> {
    const slideIndex = db.heroSlides.findIndex((p) => p.id === id);
    if (slideIndex === -1) {
        return undefined;
    }

    const existingSlide = db.heroSlides[slideIndex];
    const updatedSlide: HeroSlide = {
        ...existingSlide,
        ...bannerData,
        enabled: bannerData.enabled,
        imageUrl: bannerData.imageUrl || 'https://placehold.co/1600x600.png',
        dataAiHint: bannerData.dataAiHint || bannerData.title.toLowerCase().split(' ').slice(0, 2).join(' '),
    };

    db.heroSlides[slideIndex] = updatedSlide;
    persistDb();

    await addAdminNotification({
      title: 'Hero Banner Updated',
      description: `Banner "${updatedSlide.title}" was updated.`,
      href: `/admin/banners`
    });
    
    revalidatePath('/');
    revalidatePath('/admin/banners');

    return updatedSlide;
}

export async function deleteHeroSlide(id: string): Promise<void> {
    const slideIndex = db.heroSlides.findIndex((p) => p.id === id);
    if (slideIndex === -1) return;
    
    const deletedSlide = db.heroSlides[slideIndex];
    db.heroSlides.splice(slideIndex, 1);
    persistDb();

    await addAdminNotification({
      title: 'Hero Banner Deleted',
      description: `Banner "${deletedSlide.title}" was deleted.`,
      href: `/admin/banners`
    });

    revalidatePath('/');
    revalidatePath('/admin/banners');
}
