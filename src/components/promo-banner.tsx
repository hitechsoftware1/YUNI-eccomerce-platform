import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function PromoBanner() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg md:aspect-[3/1] lg:aspect-[4/1]">
      <Image
        src="https://placehold.co/1200x400.png"
        alt="Special promotion"
        fill
        className="object-cover transition-transform duration-300 hover:scale-105"
        data-ai-hint="electronics sale"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent p-6 sm:p-8 md:p-12 flex flex-col justify-center items-start">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-headline">
          The Future of Sound
        </h2>
        <p className="mt-2 text-sm md:text-lg text-white/90 max-w-md">
          Experience immersive audio with our new wireless headphones.
        </p>
        <Button asChild className="mt-4 md:mt-6" size="lg">
          <Link href="#">
            Shop Collection
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
