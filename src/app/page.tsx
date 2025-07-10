import { Header } from '@/components/layout/header';
import { HeroSlider } from '@/components/hero-slider';
import { AnimatedBanner } from '@/components/animated-banner';
import { CategoryGrid } from '@/components/category-grid';
import { FlashSales } from '@/components/flash-sales';
import { ProductSection } from '@/components/product-section';
import { LatestProducts } from '@/components/latest-products';
import { ExploreMore } from '@/components/promo-grid';
import { Footer } from '@/components/layout/footer';
import { PromoBanner } from '@/components/promo-banner';
import { SecondaryPromoGrid } from '@/components/secondary-promo-grid';
import { HelpButton } from '@/components/help-button';
import { getHomepageSections } from '@/lib/homepage-sections';
import { getAllProducts, getNewArrivals, getTopSellingProducts, getGroceryProducts, getBeverageProducts } from '@/lib/products';
import type { Product, HomepageSection } from '@/lib/types';
import { CuratedForYou } from '@/components/curated-for-you';

export const dynamic = 'force-dynamic';

const sectionComponentMap = {
  HeroSlider: HeroSlider,
  AnimatedBanner: AnimatedBanner,
  CategoryGrid: CategoryGrid,
  CuratedForYou: CuratedForYou,
  FlashSales: FlashSales,
  PromoBanner: PromoBanner,
  ProductSection: ProductSection,
  LatestProducts: LatestProducts,
  ExploreMore: ExploreMore,
  SecondaryPromoGrid: SecondaryPromoGrid,
};

function getProductsForSection(section: HomepageSection): Product[] {
  const allProducts = getAllProducts();
  switch (section.productSource) {
    case 'top-selling':
      return getTopSellingProducts();
    case 'new-arrivals':
      return getNewArrivals();
    case 'groceries':
      return getGroceryProducts();
    case 'beverages':
      return getBeverageProducts();
    case 'custom':
      return section.productIds
        ?.map(id => allProducts.find(p => p.id === id))
        .filter((p): p is Product => Boolean(p)) || [];
    default:
      return [];
  }
}

export default function Home() {
  const sections = getHomepageSections().filter(s => s.enabled);

  const topLevelSections = sections.filter(s => s.type === 'HeroSlider' || s.type === 'AnimatedBanner');
  const containerSections = sections.filter(s => s.type !== 'HeroSlider' && s.type !== 'AnimatedBanner');

  const renderSection = (section: HomepageSection) => {
    const Component = sectionComponentMap[section.type];
    if (!Component) return null;

    if (section.type === 'ProductSection') {
      const products = getProductsForSection(section);
      if (products.length === 0 && section.productSource === 'custom') return null;
      return <ProductSection key={section.id} title={section.title!} products={products} />;
    }
    
    // Add a wrapper with an ID for the CategoryGrid section for anchor linking
    if (section.type === 'CategoryGrid') {
      return (
        <div id="categories" key={section.id} className="scroll-mt-20">
          <Component />
        </div>
      );
    }

    return <Component key={section.id} />;
  };

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
        {topLevelSections.map(renderSection)}
        
        <div className="container mx-auto space-y-10 px-2 py-6 sm:px-4 md:space-y-12 md:py-8 md:px-6">
          {containerSections.map(renderSection)}
        </div>
      </main>
      <Footer />
      <HelpButton />
    </div>
  );
}
