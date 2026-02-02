import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "fashion", name: "Fashion", imageUrl: 'https://i.pinimg.com/1200x/20/a5/66/20a56673b1d6e0ac73501a96c89cf766.jpg', dataAiHint: 'fashion clothing' },
  { id: "electronics", name: "Electronics", imageUrl: 'https://i.pinimg.com/1200x/cd/97/c0/cd97c05facff694b6b52a172515e9d3c.jpg', dataAiHint: 'electronic gadgets' },
  { id: "computing", name: "Computing", imageUrl: 'https://i.pinimg.com/736x/69/35/2e/69352e36b46fcffe5a033b0881460872.jpg', dataAiHint: 'computing laptop' },
  { id: "health", name: "Health", imageUrl: 'https://i.pinimg.com/736x/5a/4e/5a/5a4e5a06c675ec597ab93ccea120cd20.jpg', dataAiHint: 'health products' },
  { id: "home-office", name: "Home & Office", imageUrl: 'https://i.pinimg.com/736x/b7/c9/93/b7c993acb593bb03c6707cd97990fbda.jpg', dataAiHint: 'office furniture' },
  { id: "baby", name: "Baby Products", imageUrl: 'https://i.pinimg.com/736x/fb/61/68/fb6168da40584e1c1a1773082b341d51.jpg', dataAiHint: 'baby toys' },
  { id: "gaming", name: "Gaming", imageUrl: 'https://i.pinimg.com/1200x/41/74/1b/41741b5c06224856d09fed7091343850.jpg', dataAiHint: 'gaming controller' },
  { id: "tv-audio", name: "TV & Audio", imageUrl: 'https://i.pinimg.com/1200x/63/0c/be/630cbedccfb7c3a1f06f8c3975b447a8.jpg', dataAiHint: 'tv audio' },
  { id: "groceries", name: "Groceries", imageUrl: 'https://i.pinimg.com/1200x/a5/f7/7a/a5f77a668f289de391f889e07a06d709.jpg', dataAiHint: 'grocery items' },
  { id: "beauty", name: "Beauty", imageUrl: 'https://i.pinimg.com/736x/f5/f1/99/f5f19992bfbd61997ecb2a776fc8987f.jpg', dataAiHint: 'beauty cosmetics' },
  { id: "books", name: "Books", imageUrl: 'https://i.pinimg.com/736x/14/2f/22/142f22927d992d489e4ac251ba4b9f62.jpg', dataAiHint: 'books reading' },
  { id: "beverages", name: "Beverages", imageUrl: 'https://i.pinimg.com/736x/51/55/0d/51550d1ab3da691fa7cf550a02ebcc0d.jpg', dataAiHint: 'beverages drinks' },
];

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(c => c.id === slug);
}
