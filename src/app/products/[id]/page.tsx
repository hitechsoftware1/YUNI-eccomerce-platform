
export const dynamic = 'force-dynamic';

import { getProductById, getAllProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductView } from './product-view';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const allProducts = getAllProducts();
  const sameCategoryProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const otherCategoryProducts = allProducts.filter(
    (p) => p.category !== product.category
  );

  const relatedProducts = [...sameCategoryProducts, ...otherCategoryProducts].slice(0, 5);
  
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-2 py-6 sm:px-4 md:py-8 md:px-6">
          <ProductView product={product} relatedProducts={relatedProducts} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
