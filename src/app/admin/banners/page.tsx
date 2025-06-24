import { allHeroSlides } from "@/lib/banners";
import { BannersClient } from "./components/banners-client";
import type { HeroSlide } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function BannersPage() {
  const slides: HeroSlide[] = allHeroSlides;
  return <BannersClient slides={slides} />;
}
