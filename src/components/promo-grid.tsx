
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import type { PromoCard } from "@/lib/types";

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

interface ExploreMoreProps {
    promos: PromoCard[];
}

export function ExploreMore({ promos }: ExploreMoreProps) {
  const [activeFilter, setActiveFilter] = React.useState("all");

  if (!promos || promos.length === 0) {
      return null;
  }
  
  const filters = ["all", ...new Set(promos.map(p => p.category))];

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
            {filters.map((filter) => (
                <Button 
                    key={filter}
                    variant={activeFilter === filter ? "default" : "secondary"} 
                    onClick={() => setActiveFilter(filter)}
                    className="rounded-full capitalize"
                >
                    {filter}
                </Button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
           {filteredPromos.map((promo) => (
              <PromoCardItem key={promo.id} promo={promo} />
          ))}
      </div>
    </section>
  );
}
