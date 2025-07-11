import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "fashion", name: "Fashion", imageUrl: 'https://i.pinimg.com/564x/2b/8a/8a/2b8a8a3c5a07c3c2f1f59239e3650239.jpg', dataAiHint: 'fashion clothing' },
  { id: "electronics", name: "Electronics", imageUrl: 'https://i.pinimg.com/564x/c9/ed/c2/c9edc241951f288865615715a31a98e2.jpg', dataAiHint: 'electronic gadgets' },
  { id: "computing", name: "Computing", imageUrl: 'https://i.pinimg.com/564x/41/5a/92/415a92a546876c243a88b5f3a0a38e88.jpg', dataAiHint: 'computing laptop' },
  { id: "health", name: "Health", imageUrl: 'https://i.pinimg.com/564x/db/7f/73/db7f730a84d4b17f5a3e142e054a3777.jpg', dataAiHint: 'health products' },
  { id: "home-office", name: "Home & Office", imageUrl: 'https://i.pinimg.com/564x/87/a4/c8/87a4c849c7146561f5b083b451a84f47.jpg', dataAiHint: 'office furniture' },
  { id: "baby", name: "Baby Products", imageUrl: 'https://i.pinimg.com/564x/d1/29/7f/d1297f0a8c2f10b0a030c6a512534f2a.jpg', dataAiHint: 'baby toys' },
  { id: "gaming", name: "Gaming", imageUrl: 'https://i.pinimg.com/564x/53/b7/0f/53b70f6f4c728329615d949c95333f2c.jpg', dataAiHint: 'gaming controller' },
  { id: "tv-audio", name: "TV & Audio", imageUrl: 'https://i.pinimg.com/564x/48/20/7a/48207a7a24a1b8c2c10b42b102148493.jpg', dataAiHint: 'tv audio' },
  { id: "groceries", name: "Groceries", imageUrl: 'https://i.pinimg.com/564x/8a/16/e2/8a16e25725f3c780512c416199a0d898.jpg', dataAiHint: 'grocery items' },
  { id: "beauty", name: "Beauty", imageUrl: 'https://i.pinimg.com/564x/72/06/f3/7206f343a41a4a49fe0f1a41551c7a87.jpg', dataAiHint: 'beauty cosmetics' },
  { id: "books", name: "Books", imageUrl: 'https://i.pinimg.com/564x/b9/41/c8/b941c88876e5590989f62629f635f793.jpg', dataAiHint: 'books reading' },
  { id: "beverages", name: "Beverages", imageUrl: 'https://i.pinimg.com/564x/b8/b6/22/b8b6222b64d95b5e7d9b7f573b0631c3.jpg', dataAiHint: 'beverages drinks' },
];

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(c => c.id === slug);
}
