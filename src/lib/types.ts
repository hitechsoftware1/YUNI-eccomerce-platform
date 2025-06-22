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
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}
