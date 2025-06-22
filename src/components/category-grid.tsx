import Link from "next/link";
import {
  Shirt,
  Smartphone,
  Laptop,
  HeartPulse,
  Home,
  Baby,
  Gamepad2,
  Tv,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";
import type { Category } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

const categories: Category[] = [
  { id: "fashion", name: "Fashion", icon: Shirt },
  { id: "electronics", name: "Electronics", icon: Smartphone },
  { id: "computing", name: "Computing", icon: Laptop },
  { id: "health", name: "Health", icon: HeartPulse },
  { id: "home-office", name: "Home & Office", icon: Home },
  { id: "baby", name: "Baby Products", icon: Baby },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "tv-audio", name: "TV & Audio", icon: Tv },
  { id: "groceries", name: "Groceries", icon: UtensilsCrossed },
  { id: "beauty", name: "Beauty", icon: Sparkles },
];

export function CategoryGrid() {
  return (
    <section>
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 md:grid-cols-10">
            {categories.map((category) => (
              <Link href="#" key={category.id} className="group">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary/20 md:h-20 md:w-20">
                    <category.icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary md:h-10 md:w-10" />
                  </div>
                  <p className="text-center text-xs font-medium transition-colors group-hover:text-primary md:text-sm">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
