
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllProducts } from '@/lib/products';
import type { Product } from '@/lib/types';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/product-card';
import { SearchX } from 'lucide-react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const allProducts = getAllProducts();
      const results = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery) ||
          product.category.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query]);

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto min-h-[calc(100vh-400px)] px-2 py-6 sm:px-4 md:py-8 md:px-6">
            {query ? (
            <>
                <h1 className="text-3xl font-bold font-headline tracking-tight">
                Search Results for "{query}"
                </h1>
                <p className="mt-2 text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found.
                </p>

                {filteredProducts.length > 0 ? (
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                ) : (
                <div className="mt-12 flex flex-col items-center justify-center text-center">
                    <SearchX className="h-24 w-24 text-muted-foreground" />
                    <h2 className="mt-6 text-2xl font-semibold">No products found</h2>
                    <p className="mt-2 text-muted-foreground">
                    We couldn't find any products matching your search. Try a different keyword.
                    </p>
                </div>
                )}
            </>
            ) : (
            <div className="text-center py-16">
                <h1 className="text-2xl font-semibold mb-2">Search for products</h1>
                <p className="text-muted-foreground">
                Use the search bar in the header to find what you're looking for.
                </p>
            </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
