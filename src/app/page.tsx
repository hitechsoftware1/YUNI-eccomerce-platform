import { Header } from '@/components/layout/header';
import { HeroSlider } from '@/components/hero-slider';
import { AnimatedBanner } from '@/components/animated-banner';
import { CategoryGrid } from '@/components/category-grid';
import { FlashSales } from '@/components/flash-sales';
import { ProductSection } from '@/components/product-section';
import { LatestProducts } from '@/components/latest-products';
import { ExploreMore } from '@/components/promo-grid';
import { ProductRecommendations } from '@/components/product-recommendations';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { PromoBanner } from '@/components/promo-banner';
import { SecondaryPromoGrid } from '@/components/secondary-promo-grid';
import { HelpButton } from '@/components/help-button';
import { getNewArrivals, getTopSellingProducts, getGroceryProducts, getBeverageProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default function Home() {
  const topSellingProducts = getTopSellingProducts();
  const newArrivals = getNewArrivals();
  const groceryProducts = getGroceryProducts();
  const beverageProducts = getBeverageProducts();

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSlider />
        <AnimatedBanner />
        <div className="container mx-auto space-y-12 px-4 py-8 sm:px-6 lg:px-8">
          <CategoryGrid />
          <FlashSales />
          <PromoBanner />
          <ProductSection title="Top Selling Items" products={topSellingProducts} />
          <ProductSection title="New Arrivals" products={newArrivals} />
          <ProductSection title="Groceries" products={groceryProducts} />
          <ProductSection title="Beverages" products={beverageProducts} />
          <LatestProducts />
          <ExploreMore />
          <SecondaryPromoGrid />
          <ProductRecommendations />
        </div>
      </main>
      <Footer />
      <BottomNav />
      <HelpButton />
    </div>
  );
}
