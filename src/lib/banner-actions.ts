'use server';

import { revalidatePath } from 'next/cache';
import { allHeroSlides } from './banners';
import type { HeroSlide } from '@/lib/types';
import type { BannerFormValues } from '@/app/admin/banners/components/banner-form';

export async function addHeroSlide(bannerData: BannerFormValues) {
  const newSlide: HeroSlide = {
    id: `slide-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...bannerData,
    imageUrl: bannerData.imageUrl || 'https://placehold.co/1600x600.png',
    dataAiHint: bannerData.dataAiHint || bannerData.title.toLowerCase().split(' ').slice(0, 2).join(' '),
  };
  allHeroSlides.unshift(newSlide);
  
  revalidatePath('/');
  revalidatePath('/admin/banners');

  return newSlide;
}

export async function updateHeroSlide(id: string, bannerData: BannerFormValues): Promise<HeroSlide | undefined> {
    const slideIndex = allHeroSlides.findIndex((p) => p.id === id);
    if (slideIndex === -1) {
        return undefined;
    }

    const existingSlide = allHeroSlides[slideIndex];
    const updatedSlide: HeroSlide = {
        ...existingSlide,
        ...bannerData,
        imageUrl: bannerData.imageUrl || 'https://placehold.co/1600x600.png',
        dataAiHint: bannerData.dataAiHint || bannerData.title.toLowerCase().split(' ').slice(0, 2).join(' '),
    };

    allHeroSlides[slideIndex] = updatedSlide;
    
    revalidatePath('/');
    revalidatePath('/admin/banners');

    return updatedSlide;
}

export async function deleteHeroSlide(id: string): Promise<void> {
    const slideIndex = allHeroSlides.findIndex((p) => p.id === id);
    if (slideIndex === -1) return;
    
    allHeroSlides.splice(slideIndex, 1);

    revalidatePath('/');
    revalidatePath('/admin/banners');
}
