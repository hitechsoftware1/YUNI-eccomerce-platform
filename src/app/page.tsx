
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
import { getHeroSlides } from '@/lib/banners';
import { getAllPromoCards } from '@/lib/promo-cards';
import { getPromoBanner } from '@/lib/promo-banner-data';
import { getAllSecondaryPromos } from '@/lib/secondary-promo-data';
import { getCuratedForYouItems } from '@/lib/curated-for-you-data';
import type { Product, HomepageSection, HeroSlide, PromoCard, PromoBannerData, SecondaryPromoGridItem, CuratedItem, SectionType } from '@/lib/types';
import { CuratedForYou } from '@/components/curated-for-you';

export const dynamic = 'force-dynamic';

const sectionComponentMap: { [key in SectionType]?: React.ComponentType<any> } = {
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
  const heroSlides = getHeroSlides().filter(s => s.enabled);
  const promoCards = getAllPromoCards().filter(p => p.enabled);
  const promoBannerData = getPromoBanner();
  const secondaryPromos = getAllSecondaryPromos().filter(p => p.enabled);
  const curatedItems = getCuratedForYouItems();

  const topLevelSections = sections.filter(s => s.type === 'HeroSlider' || s.type === 'AnimatedBanner');
  const containerSections = sections.filter(s => s.type !== 'HeroSlider' && s.type !== 'AnimatedBanner');

  const renderSection = (section: HomepageSection) => {
    const Component = sectionComponentMap[section.type];
    if (!Component) return null;

    let props: any = { key: section.id };

    switch (section.type) {
        case 'HeroSlider':
            if (heroSlides.length === 0) return null;
            props.slides = heroSlides;
            break;
        case 'ProductSection':
            const products = getProductsForSection(section);
            if (products.length === 0 && section.productSource === 'custom') return null;
            props.title = section.title!;
            props.products = products;
            break;
        case 'CuratedForYou':
            if (curatedItems.length === 0) return null;
            props.items = curatedItems;
            break;
        case 'PromoBanner':
            if (!promoBannerData) return null;
            props.data = promoBannerData;
            break;
        case 'ExploreMore':
            if (promoCards.length === 0) return null;
            props.promos = promoCards;
            break;
        case 'SecondaryPromoGrid':
            if (secondaryPromos.length === 0) return null;
            props.promos = secondaryPromos;
            break;
        case 'CategoryGrid':
            return (
                <div id="categories" key={section.id} className="scroll-mt-20">
                    <Component />
                </div>
            );
    }
    
    // For components that don't need specific data props from this level
    if (Object.keys(props).length === 1) {
        return <Component key={section.id} />;
    }

    return <Component {...props} />;
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
