import { ProductCard } from "./product-card";
import { Button } from "./ui/button";
import { latestProducts } from "@/lib/products";


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
