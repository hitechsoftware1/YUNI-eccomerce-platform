
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { allSecondaryPromos } from '@/lib/secondary-promo-data';

export function SecondaryPromoGrid() {
  const topPromos = allSecondaryPromos.filter((p) => p.aspectRatio === '2/1');
  const bottomPromo = allSecondaryPromos.find((p) => p.aspectRatio === '4/1');

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {topPromos.map((promo) => (
          <Link href={promo.link} key={promo.id} className="block group">
            <Card className="overflow-hidden">
              <div className="relative aspect-[2/1] w-full">
                <Image
                  src={promo.imageUrl}
                  alt={promo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={promo.dataAiHint}
                />
              </div>
            </Card>
          </Link>
        ))}
      </div>
      {bottomPromo && (
        <Link href={bottomPromo.link} className="block group">
          <Card className="overflow-hidden">
            <div className="relative aspect-[4/1] w-full">
              <Image
                src={bottomPromo.imageUrl}
                alt={bottomPromo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={bottomPromo.dataAiHint}
              />
            </div>
          </Card>
        </Link>
      )}
    </section>
  );
}
