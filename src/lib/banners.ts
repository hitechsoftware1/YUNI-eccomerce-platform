import type { HeroSlide } from '@/lib/types';

export let allHeroSlides: HeroSlide[] = [
  {
    id: '1',
    imageUrl: "https://placehold.co/1600x600.png",
    dataAiHint: "sale fashion",
    title: "Mega Fashion Sale",
    subtitle: "Up to 70% off on all brands",
    link: "/category/fashion",
  },
  {
    id: '2',
    imageUrl: "https://placehold.co/1600x600.png",
    dataAiHint: "new electronics",
    title: "Latest Gadgets Arrived",
    subtitle: "Discover cutting-edge technology",
    link: "/category/electronics",
  },
  {
    id: '3',
    imageUrl: "https://placehold.co/1600x600.png",
    dataAiHint: "home decor",
    title: "Transform Your Home",
    subtitle: "Find the perfect decor for your space",
    link: "/category/home-office",
  },
];

export function getHeroSlideById(id: string): HeroSlide | undefined {
    return allHeroSlides.find((slide) => slide.id === id);
}
