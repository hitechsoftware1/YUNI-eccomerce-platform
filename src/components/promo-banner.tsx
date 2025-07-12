
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getPromoBanner } from '@/lib/promo-banner-data';

export function PromoBanner() {
  const promoBannerData = getPromoBanner();
  
  if (!promoBannerData) {
    return null;
  }

  const { title, subtitle, buttonText, link, imageUrl, dataAiHint } = promoBannerData;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg md:aspect-[3/1] lg:aspect-[4/1]">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 hover:scale-105"
        data-ai-hint={dataAiHint}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent p-4 sm:p-8 md:p-12 flex flex-col justify-center items-start">
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-headline">
          {title}
        </h2>
        <p className="mt-2 text-sm md:text-lg text-white/90 max-w-md">
          {subtitle}
        </p>
        <Button asChild className="mt-4 md:mt-6" size="lg">
          <Link href={link}>
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
