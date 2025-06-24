import { allProducts } from "@/lib/products";
import { ProductsClient } from "./components/products-client";
import type { Product } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function ProductsPage() {
  const products: Product[] = allProducts;
  return <ProductsClient products={products} />;
}
