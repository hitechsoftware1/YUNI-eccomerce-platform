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
