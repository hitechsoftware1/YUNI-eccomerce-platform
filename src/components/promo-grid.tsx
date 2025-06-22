"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const allPromos = [
  { id: 1, category: "fashion", title: "Street Style", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "street style" },
  { id: 2, category: "tech", title: "Work From Home", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "home office" },
  { id: 3, category: "home", title: "Cozy Living", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "cozy livingroom" },
  { id: 4, category: "fashion", title: "Summer Vibes", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "summer fashion" },
  { id: 5, category: "tech", title: "Gaming Setup", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "gaming setup" },
  { id: 6, category: "home", title: "Kitchen Essentials", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "modern kitchen" },
];

export function PromoGrid() {
  const [filter, setFilter] = React.useState("all");

  const filteredPromos =
    filter === "all"
      ? allPromos
      : allPromos.filter((p) => p.category === filter);

  return (
    <section>
      <h2 className="text-2xl font-bold font-headline mb-6 text-center">Inspiration Hub</h2>
      <div className="flex justify-center gap-2 mb-6">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>All</Button>
        <Button variant={filter === "fashion" ? "default" : "outline"} onClick={() => setFilter("fashion")}>Fashion</Button>
        <Button variant={filter === "tech" ? "default" : "outline"} onClick={() => setFilter("tech")}>Tech</Button>
        <Button variant={filter === "home" ? "default" : "outline"} onClick={() => setFilter("home")}>Home</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPromos.map((promo) => (
          <Link href="#" key={promo.id}>
            <Card className="group overflow-hidden relative h-80">
                <Image
                  src={promo.imageUrl}
                  alt={promo.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  data-ai-hint={promo.dataAiHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold font-headline text-white">
                    {promo.title}
                  </h3>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
