"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const exploreItems = [
    { id: 1, category: "electronics", title: "Explore Gadgets", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "gadgets iphone", href: "/category/electronics" },
    { id: 2, category: "beauty", title: "Beauty Deals", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "beauty product", href: "/category/beauty" },
    { id: 3, category: "mobiles", title: "Smartphone Ad", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "smartphone ad", href: "/search?q=mobiles" },
    { id: 4, category: "grocery", title: "Visit Grocery", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "grocery juice", href: "/category/groceries" },
    { id: 5, category: "events", title: "Watch Event Promo", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "event promo", href: "/search?q=events" },
    { id: 6, category: "beverages", title: "Beverage Offers", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "beverages juice", href: "/category/beverages" },
    { id: 7, category: "fashion", title: "Fashion Spotlight", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "fashion models", href: "/category/fashion" },
    { id: 8, category: "new-arrivals", title: "New Arrivals Ad", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "new arrival", href: "/search?q=new arrivals" },
    { id: 9, category: "tools", title: "Tech & Tools", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "tech tools", href: "/search?q=tools" },
    { id: 10, category: "deals", title: "Deals of the Day", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "office chair", href: "/search?q=deals" },
    { id: 11, category: "showcase", title: "Promo Showcase", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "promo showcase", href: "/search?q=showcase" },
    { id: 12, category: "furniture", title: "Office Furniture", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "office furniture", href: "/category/home-office" },
    { id: 13, category: "new-arrivals", title: "Branding Ad", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "branding ad", href: "/search?q=branding" },
    { id: 14, category: "services", title: "Services", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "delivery service", href: "/search?q=services" },
  ];

const filters = [
    { label: "All", value: "all" },
    { label: "Electronics", value: "electronics" },
    { label: "Beauty", value: "beauty" },
    { label: "Mobiles", value: "mobiles" },
    { label: "Grocery", value: "grocery" },
    { label: "Events", value: "events" },
    { label: "Beverages", value: "beverages" },
    { label: "Fashion", value: "fashion" },
    { label: "New Arrivals", value: "new-arrivals" },
];


export function ExploreMore() {
  const [filter, setFilter] = React.useState("all");

  const filteredPromos =
    filter === "all"
      ? exploreItems
      : exploreItems.filter((p) => p.category === filter);

  return (
    <section>
        <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold font-headline">Explore More</h2>
        </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
                <Button 
                    key={f.value}
                    variant={filter === f.value ? "default" : "secondary"} 
                    onClick={() => setFilter(f.value)}
                    className="rounded-full"
                >
                    {f.label}
                </Button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredPromos.map((promo) => (
          <Link href={promo.href} key={promo.id}>
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                <div className="relative aspect-square w-full">
                    <Image
                      src={promo.imageUrl}
                      alt={promo.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                      data-ai-hint={promo.dataAiHint}
                    />
                </div>
                <div className="p-2 text-center bg-card">
                    <h3 className="font-semibold text-sm underline truncate">
                      {promo.title}
                    </h3>
                </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
