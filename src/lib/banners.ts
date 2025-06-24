import type { HeroSlide } from '@/lib/types';

export let allHeroSlides: HeroSlide[] = [
  {
    id: '1',
    imageUrl: "https://images.unsplash.com/photo-1685883518316-355533810d68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c2FsZSUyMGZhc2hpb258ZW58MHx8fHwxNzUwNzc3NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "sale fashion",
    title: "Mega Fashion Sale",
    subtitle: "Up to 70% off on all brands",
    link: "/category/fashion",
  },
  {
    id: '2',
    imageUrl: "https://images.unsplash.com/photo-1611120227195-91674b693491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxuZXclMjBlbGVjdHJvbmljc3xlbnwwfHx8fDE3NTA3Nzc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "new electronics",
    title: "Latest Gadgets Arrived",
    subtitle: "Discover cutting-edge technology",
    link: "/category/electronics",
  },
  {
    id: '3',
    imageUrl: "https://images.unsplash.com/photo-1572048793162-8a36a83f1def?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxob21lJTIwZGVjb3J8ZW58MHx8fHwxNzUwNzc3NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "home decor",
    title: "Transform Your Home",
    subtitle: "Find the perfect decor for your space",
    link: "/category/home-office",
  },
];

export function getHeroSlideById(id: string): HeroSlide | undefined {
    return allHeroSlides.find((slide) => slide.id === id);
}
