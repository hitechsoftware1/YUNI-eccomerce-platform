import Link from 'next/link';
import Image from 'next/image';
import { getCuratedForYouItems } from '@/lib/curated-for-you-data';
import type { CuratedItem } from '@/lib/types';

const CuratedCard = ({ item }: { item: CuratedItem }) => (
  <Link href={item.link} className="block group">
    <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
      <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-grow">
        <Image
          src={item.imageUrl}
          alt={item.title}
          width={150}
          height={150}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={item.dataAiHint}
        />
      </div>
      <h3 className="mt-2 text-sm font-semibold text-foreground">{item.title}</h3>
    </div>
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
