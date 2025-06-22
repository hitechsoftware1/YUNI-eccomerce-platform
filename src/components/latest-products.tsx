import { ProductCard } from "./product-card";
import type { Product } from "@/lib/types";
import { Button } from "./ui/button";

const latestProducts: Product[] = [
    { id: 'lp1', name: 'Hand-woven Area Rug', price: 230.00, rating: 4.8, reviewCount: 210, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'rug home' },
    { id: 'lp2', name: 'Gourmet Coffee Bean Sampler', price: 45.00, rating: 4.9, reviewCount: 850, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'coffee beans' },
    { id: 'lp3', name: 'Smart LED Light Strip', price: 39.99, rating: 4.6, reviewCount: 1800, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'led lights' },
    { id: 'lp4', name: 'Professional Chef\'s Knife', price: 120.00, originalPrice: 150.00, rating: 4.9, reviewCount: 1100, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'chef knife' },
    { id: 'lp5', name: 'Silk Pillowcase Set', price: 55.00, rating: 4.7, reviewCount: 950, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'silk pillowcase' },
    { id: 'lp6', name: 'Wireless Charging Stand', price: 49.99, rating: 4.6, reviewCount: 2200, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'charging stand' },
    { id: 'lp7', name: 'Insulated Water Bottle', price: 25.00, rating: 4.8, reviewCount: 6500, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'water bottle' },
    { id: 'lp8', name: 'Hardcover Fiction Bestseller', price: 18.99, rating: 4.9, reviewCount: 3200, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'book fiction' },
];


export function LatestProducts() {
  return (
    <section>
      <h2 className="text-2xl font-bold font-headline mb-6 text-center">Latest Products & Listings</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">Load More</Button>
      </div>
    </section>
  );
}
