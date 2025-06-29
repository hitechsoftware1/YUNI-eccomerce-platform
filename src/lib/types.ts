

import type { LucideIcon } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount?: number;
  imageUrl: string;
  dataAiHint: string;
  isNew?: boolean;
  description: string;
  category: string;
  status: 'In Stock' | 'Out of Stock' | 'Archived';
  sellerName: string;
  stock?: number;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  dataAiHint: string;
}

export interface AdminSale {
  name: string;
  email: string;
  amount: string;
  fallback: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  dataAiHint: string;
  sellerName: string;
}

export interface Order {
  id:string;
  customer: {
    name: string;
    email: string;
  };
  date: string;
  status: 'Pending' | 'Fulfilled' | 'Cancelled';
  total: number;
  items?: OrderItem[];
  shippingAddress?: Address;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  dataAiHint: string;
  link: string;
}

export interface PromoBannerData {
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  imageUrl: string;
  dataAiHint: string;
}

export interface SecondaryPromoGridItem {
  id: string;
  alt: string;
  imageUrl: string;
  dataAiHint: string;
  link: string;
  aspectRatio: '2/1' | '4/1';
}

export interface PromoCard {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  dataAiHint: string;
  href: string;
}

export interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  city: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  isDefault?: boolean;
}

export interface UserReview {
  id: string;
  productId: string;
  productName: string;
  productImageUrl: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
}

export interface LoginActivity {
  id: string;
  device: string;
  deviceType: 'desktop' | 'mobile';
  location: string;
  ipAddress: string;
  date: string;
  isCurrent?: boolean;
}

export interface PaymentMethod {
  id: string;
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';
}

export interface UserReturn {
  id: string;
  orderId: string;
  date: string;
  status: 'Processing' | 'Approved' | 'Refunded' | 'Rejected';
  items: { productId: string; productName: string; quantity: number }[];
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Seller' | 'Buyer';
  status: 'Active' | 'Banned' | 'Pending Approval';
  lastLogin: string;
}

export interface SellerPerformance {
  id: string;
  name: string;
  email: string;
  status: ManagedUser['status'];
  productCount: number;
  totalRevenue: number;
  totalOrders: number;
  averageRating: number;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  href?: string;
}

export type SectionType = 
  | 'HeroSlider' 
  | 'AnimatedBanner' 
  | 'CategoryGrid' 
  | 'CuratedForYou'
  | 'FlashSales' 
  | 'PromoBanner' 
  | 'ProductSection' 
  | 'LatestProducts' 
  | 'ExploreMore' 
  | 'SecondaryPromoGrid';

export interface HomepageSection {
  id: string;
  type: SectionType;
  title: string; // Used as a display name in admin, and for product section titles
  enabled: boolean;
  order: number;
  // A property to identify which specific product data to load for hardcoded sections
  productSource?: 'top-selling' | 'new-arrivals' | 'groceries' | 'beverages';
  // for custom sections in the future
  productIds?: string[]; 
}

export interface CuratedItem {
  id: string;
  title: string;
  imageUrl: string;
  dataAiHint: string;
  link: string;
}
