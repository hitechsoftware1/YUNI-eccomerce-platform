import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "fashion", name: "Fashion", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'fashion clothing' },
  { id: "electronics", name: "Electronics", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'electronic gadgets' },
  { id: "computing", name: "Computing", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'computing laptop' },
  { id: "health", name: "Health", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'health products' },
  { id: "home-office", name: "Home & Office", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'office furniture' },
  { id: "baby", name: "Baby Products", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'baby toys' },
  { id: "gaming", name: "Gaming", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'gaming controller' },
  { id: "tv-audio", name: "TV & Audio", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'tv audio' },
  { id: "groceries", name: "Groceries", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'grocery items' },
  { id: "beauty", name: "Beauty", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'beauty cosmetics' },
  { id: "books", name: "Books", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'books reading' },
  { id: "beverages", name: "Beverages", imageUrl: 'https://placehold.co/100x100.png', dataAiHint: 'beverages drinks' },
];

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(c => c.id === slug);
}
