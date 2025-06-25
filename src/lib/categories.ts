import type { Category } from "@/lib/types";

export const categories: Category[] = [
  { id: "fashion", name: "Fashion", imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxmYXNoaW9uJTIwY2xvdGhpbmd8ZW58MHx8fHwxNzUwODEwNTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'fashion clothing' },
  { id: "electronics", name: "Electronics", imageUrl: 'https://images.unsplash.com/photo-1717295248302-543d5a49091f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxlbGVjdHJvbmljJTIwZ2FkZ2V0c3xlbnwwfHx8fDE3NTA4MTA1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'electronic gadgets' },
  { id: "computing", name: "Computing", imageUrl: 'https://images.unsplash.com/photo-1684127987312-43455fd95925?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y29tcHV0aW5nJTIwbGFwdG9wfGVufDB8fHx8MTc1MDgxMDU0N3ww&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'computing laptop' },
  { id: "health", name: "Health", imageUrl: 'https://images.unsplash.com/photo-1611253468168-e2ea780fdf80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxoZWFsdGglMjBwcm9kdWN0c3xlbnwwfHx8fDE3NTA4MTA1NDd8MA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'health products' },
  { id: "home-office", name: "Home & Office", imageUrl: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxvZmZpY2UlMjBmdXJuaXR1cmV8ZW58MHx8fHwxNzUwODEwNTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'office furniture' },
  { id: "baby", name: "Baby Products", imageUrl: 'https://images.unsplash.com/photo-1505043203398-7e4c111acbfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxiYWJ5JTIwdG95c3xlbnwwfHx8fDE3NTA4MTA1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'baby toys' },
  { id: "gaming", name: "Gaming", imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDB8fHx8MTc1MDgxMDU0N3ww&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'gaming controller' },
  { id: "tv-audio", name: "TV & Audio", imageUrl: 'https://images.unsplash.com/photo-1627314498116-a4a43fc40ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx0diUyMGF1ZGlvfGVufDB8fHx8MTc1MDgxMDU0N3ww&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'tv audio' },
  { id: "groceries", name: "Groceries", imageUrl: 'https://images.unsplash.com/photo-1740362868692-2956a4e306cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z3JvY2VyeSUyMGl0ZW1zfGVufDB8fHx8MTc1MDgxMDU0OHww&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'grocery items' },
  { id: "beauty", name: "Beauty", imageUrl: 'https://images.unsplash.com/photo-1676570092589-a6c09ecbb373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3N8ZW58MHx8fHwxNzUwODEwNTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'beauty cosmetics' },
  { id: "books", name: "Books", imageUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxib29rcyUyMHJlYWRpbmd8ZW58MHx8fHwxNzUwODEwNTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'books reading' },
  { id: "beverages", name: "Beverages", imageUrl: 'https://images.unsplash.com/photo-1596463989140-3b600dab72e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxiZXZlcmFnZXMlMjBkcmlua3N8ZW58MHx8fHwxNzUwODEwNTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'beverages drinks' },
];

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find(c => c.id === slug);
}
