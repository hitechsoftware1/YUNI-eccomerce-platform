import { Header } from '@/components/layout/header';
import { HeroSlider } from '@/components/hero-slider';
import { AnimatedBanner } from '@/components/animated-banner';
import { CategoryGrid } from '@/components/category-grid';
import { FlashSales } from '@/components/flash-sales';
import { ProductSection } from '@/components/product-section';
import { LatestProducts } from '@/components/latest-products';
import { PromoGrid } from '@/components/promo-grid';
import { ProductRecommendations } from '@/components/product-recommendations';
import { Footer } from '@/components/layout/footer';
import { BottomNav } from '@/components/layout/bottom-nav';
import { InstallPwaBanner } from '@/components/install-pwa-banner';
import type { Product } from '@/lib/types';

const topSellingProducts: Product[] = [
  { id: '1', name: 'Premium Wireless Headphones', price: 149.99, originalPrice: 199.99, rating: 4.8, reviewCount: 2450, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'headphones music' },
  { id: '2', name: 'Smart Fitness Tracker Watch', price: 89.99, rating: 4.6, reviewCount: 1890, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'smartwatch fitness' },
  { id: '3', name: 'Professional DSLR Camera', price: 899.00, rating: 4.9, reviewCount: 980, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'camera photography' },
  { id: '4', name: 'Organic Green Tea Set', price: 29.99, originalPrice: 39.99, rating: 4.7, reviewCount: 3120, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'tea set' },
  { id: '5', name: 'Modern Scandinavian Sofa', price: 1299.99, rating: 4.8, reviewCount: 450, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'sofa furniture' },
  { id: '6', name: 'Ultra-Light Running Shoes', price: 119.99, rating: 4.5, reviewCount: 2200, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'running shoes' },
];

const newArrivals: Product[] = [
  { id: '7', name: '4K Ultra-HD Drone', price: 499.99, rating: 4.7, reviewCount: 150, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'drone camera', isNew: true },
  { id: '8', name: 'Aesthetic Ceramic Vase', price: 45.00, rating: 4.9, reviewCount: 210, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'vase decor', isNew: true },
  { id: '9', name: 'Portable Espresso Maker', price: 65.50, rating: 4.6, reviewCount: 340, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'coffee espresso', isNew: true },
  { id: '10', name: 'Smart Garden System', price: 199.99, originalPrice: 249.99, rating: 4.8, reviewCount: 180, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'smart garden', isNew: true },
  { id: '11', name: 'Vintage Leather Backpack', price: 95.00, rating: 4.7, reviewCount: 412, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'backpack leather', isNew: true },
  { id: '12', name: 'Augmented Reality Glasses', price: 799.00, rating: 4.5, reviewCount: 95, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'ar glasses', isNew: true },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSlider />
        <AnimatedBanner />
        <div className="container mx-auto space-y-12 px-4 py-8 sm:px-6 lg:px-8">
          <CategoryGrid />
          <FlashSales />
          <ProductSection title="Top Selling Items" products={topSellingProducts} />
          <ProductSection title="New Arrivals" products={newArrivals} />
          <LatestProducts />
          <PromoGrid />
          <ProductRecommendations />
        </div>
      </main>
      <Footer />
      <BottomNav />
      <InstallPwaBanner />
    </div>
  );
}
