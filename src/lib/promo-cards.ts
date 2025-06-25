import type { PromoCard } from './types';

export let allPromoCards: PromoCard[] = [
    { id: 'exp1', category: "electronics", title: "Explore Gadgets", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "gadgets iphone", href: "/category/electronics" },
    { id: 'exp2', category: "beauty", title: "Beauty Deals", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "beauty product", href: "/category/beauty" },
    { id: 'exp3', category: "mobiles", title: "Smartphone Ad", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "smartphone ad", href: "/search?q=mobiles" },
    { id: 'exp4', category: "groceries", title: "Visit Grocery", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "grocery juice", href: "/category/groceries" },
    { id: 'exp5', category: "events", title: "Watch Event Promo", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "event promo", href: "/search?q=events" },
    { id: 'exp6', category: "beverages", title: "Beverage Offers", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "beverages juice", href: "/category/beverages" },
    { id: 'exp7', category: "fashion", title: "Fashion Spotlight", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "fashion models", href: "/category/fashion" },
    { id: 'exp8', category: "new-arrivals", title: "New Arrivals Ad", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "new arrival", href: "/search?q=new arrivals" },
    { id: 'exp9', category: "tools", title: "Tech & Tools", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "tech tools", href: "/search?q=tools" },
    { id: 'exp10', category: "deals", title: "Deals of the Day", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "office chair", href: "/search?q=deals" },
    { id: 'exp11', category: "showcase", title: "Promo Showcase", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "promo showcase", href: "/search?q=showcase" },
    { id: 'exp12', category: "home-office", title: "Office Furniture", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "office furniture", href: "/category/home-office" },
    { id: 'exp13', category: "branding", title: "Branding Ad", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "branding ad", href: "/search?q=branding" },
    { id: 'exp14', category: "services", title: "Services", imageUrl: "https://placehold.co/400x500.png", dataAiHint: "delivery service", href: "/search?q=services" },
];

export function getPromoCardById(id: string): PromoCard | undefined {
    return allPromoCards.find((card) => card.id === id);
}
