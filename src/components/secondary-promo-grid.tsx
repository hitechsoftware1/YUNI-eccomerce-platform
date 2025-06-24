import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

export function SecondaryPromoGrid() {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Link href="#" className="block group">
          <Card className="overflow-hidden">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="https://placehold.co/600x300.png"
                alt="Lato Milk Promotion"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="milk promotion"
              />
            </div>
          </Card>
        </Link>
        <Link href="#" className="block group">
          <Card className="overflow-hidden">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="https://placehold.co/600x300.png"
                alt="Tang Promotion"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="juice promotion"
              />
            </div>
          </Card>
        </Link>
      </div>
      <Link href="#" className="block group">
        <Card className="overflow-hidden">
          <div className="relative aspect-[4/1] w-full">
            <Image
              src="https://placehold.co/1200x300.png"
              alt="Tropical Heat Snack Promotion"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="snack promotion"
            />
          </div>
        </Card>
      </Link>
    </section>
  );
}
