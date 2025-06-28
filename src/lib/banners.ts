import type { HeroSlide } from '@/lib/types';
import { db } from '@/lib/db';

export function getHeroSlides(): HeroSlide[] {
    return db.heroSlides;
}

export function getHeroSlideById(id: string): HeroSlide | undefined {
    return db.heroSlides.find((slide) => slide.id === id);
}
