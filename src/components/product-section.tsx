import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/types";

interface ProductSectionProps {
  title: string;
  products: Product[];
}

export function ProductSection({ title, products }: ProductSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold font-headline">{title}</h2>
        <Link href="#" className="flex items-center text-sm font-semibold text-primary hover:underline">
          See All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="product-carousel -mx-2 flex overflow-x-auto pb-4">
         <div className="flex gap-4 px-2">
            {products.map((product) => (
                <div key={product.id} className="w-60 flex-shrink-0">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
