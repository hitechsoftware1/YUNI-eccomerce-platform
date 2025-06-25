
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import type { PromoCard } from "@/lib/types";
import { allPromoCards } from "@/lib/promo-cards";
import { Skeleton } from "@/components/ui/skeleton";

const PromoCardItem = ({ promo }: { promo: PromoCard }) => (
    <Link href={promo.href} key={promo.id}>
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
            <div className="relative aspect-square w-full">
                <Image
                  src={promo.imageUrl}
                  alt={promo.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  data-ai-hint={promo.dataAiHint}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
            </div>
            <div className="p-2 text-center bg-card">
                <h3 className="font-semibold text-sm underline truncate">
                  {promo.title}
                </h3>
            </div>
        </Card>
    </Link>
);

const PromoCardSkeleton = () => (
    <Card className="h-full w-full">
        <Skeleton className="aspect-square w-full" />
        <div className="p-2">
            <Skeleton className="h-5 w-3/4 mx-auto" />
        </div>
    </Card>
);


export function ExploreMore() {
  const [promos, setPromos] = React.useState<PromoCard[]>([]);
  const [filters, setFilters] = React.useState<string[]>([]);
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
      // In a real app, this would be an API call.
      // We simulate it with the imported data.
      setPromos(allPromoCards);
      
      const uniqueCategories = ["all", ...new Set(allPromoCards.map(p => p.category))];
      setFilters(uniqueCategories);
      
      setLoading(false);
  }, []);

  const filteredPromos =
    activeFilter === "all"
      ? promos
      : promos.filter((p) => p.category === activeFilter);

  return (
    <section>
        <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold font-headline">Explore More</h2>
        </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
            {loading ? (
                Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-9 w-20 rounded-full" />)
            ) : (
                filters.map((filter) => (
                    <Button 
                        key={filter}
                        variant={activeFilter === filter ? "default" : "secondary"} 
                        onClick={() => setActiveFilter(filter)}
                        className="rounded-full capitalize"
                    >
                        {filter}
                    </Button>
                ))
            )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
            Array.from({ length: 8 }).map((_, i) => <PromoCardSkeleton key={i} />)
        ) : (
           filteredPromos.map((promo) => (
              <PromoCardItem key={promo.id} promo={promo} />
          ))
        )}
      </div>
    </section>
  );
}
