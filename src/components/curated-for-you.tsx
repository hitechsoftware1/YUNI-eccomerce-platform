import Link from 'next/link';
import Image from 'next/image';
import { getCuratedForYouItems } from '@/lib/curated-for-you-data';
import type { CuratedItem } from '@/lib/types';
import { Card } from './ui/card';

const CuratedCard = ({ item }: { item: CuratedItem }) => (
  <Link href={item.link} className="block group">
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={item.dataAiHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-semibold text-white text-base drop-shadow-md">{item.title}</h3>
        </div>
      </div>
    </Card>
  </Link>
);

export function CuratedForYou() {
  const items = getCuratedForYouItems();

  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold font-headline">Curated for You!</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {items.map((item) => (
          <CuratedCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
