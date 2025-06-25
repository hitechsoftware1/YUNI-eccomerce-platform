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
                src="https://images.unsplash.com/photo-1523473827533-2a64d0d36748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtaWxrJTIwcHJvbW90aW9ufGVufDB8fHx8MTc1MDgxMDMxNXww&ixlib=rb-4.1.0&q=80&w=1080"
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
                src="https://images.unsplash.com/photo-1727233431592-8baaf337ee44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8anVpY2UlMjBwcm9tb3Rpb258ZW58MHx8fHwxNzUwODEwMzE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
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
              src="https://images.unsplash.com/photo-1585704169993-af12385bf3a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzbmFjayUyMHByb21vdGlvbnxlbnwwfHx8fDE3NTA4MTAzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
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
