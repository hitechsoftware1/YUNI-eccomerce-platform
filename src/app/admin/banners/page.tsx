import { getHeroSlides } from "@/lib/banners";
import { BannersClient } from "./components/banners-client";
import type { HeroSlide } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function BannersPage() {
  const slides: HeroSlide[] = getHeroSlides();
  return <BannersClient slides={slides} />;
}
