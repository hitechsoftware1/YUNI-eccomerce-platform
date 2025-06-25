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

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  date: string;
  status: 'Pending' | 'Fulfilled' | 'Cancelled';
  total: number;
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
