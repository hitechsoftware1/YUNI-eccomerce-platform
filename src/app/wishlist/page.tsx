'use client';

import { useWishlist } from '@/contexts/wishlist-context';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';

export default function WishlistPage() {
  const { wishlistItems, itemCount } = useWishlist();

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto min-h-[calc(100vh-400px)] px-2 py-6 sm:px-4 md:py-8 md:px-6">
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                     <BreadcrumbItem>
                    <BreadcrumbLink href="/account">Account</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Wishlist</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            
            <h1 className="text-3xl font-bold font-headline tracking-tight">Your Wishlist ({itemCount})</h1>

            {itemCount === 0 ? (
            <div className="mt-12 flex flex-col items-center justify-center text-center">
                <Heart className="h-24 w-24 text-muted-foreground" />
                <h2 className="mt-6 text-2xl font-semibold">Your wishlist is empty</h2>
                <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your wishlist yet.</p>
                <Button asChild className="mt-6">
                <Link href="/">Continue Shopping</Link>
                </Button>
            </div>
            ) : (
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {wishlistItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
