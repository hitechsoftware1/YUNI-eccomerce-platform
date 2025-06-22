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
  BookOpen,
  Briefcase,
} from "lucide-react";
import type { Category } from "@/lib/types";

export const categories: Category[] = [
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
  { id: "books", name: "Books", icon: BookOpen },
  { id: "beverages", name: "Beverages", icon: Briefcase },
];

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(c => c.id === slug);
}
