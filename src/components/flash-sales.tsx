"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/types";
import { useCountdown } from "@/hooks/use-countdown";

const flashSaleProducts: Product[] = [
    { id: 'fs1', name: 'Smart Air Fryer Pro', price: 342000, originalPrice: 494000, rating: 4.7, reviewCount: 1500, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'air fryer' },
    { id: 'fs2', name: 'Noise-Cancelling Earbuds', price: 228000, originalPrice: 380000, rating: 4.5, reviewCount: 2300, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'earbuds audio' },
    { id: 'fs3', name: 'Robotic Vacuum Cleaner', price: 760000, originalPrice: 1140000, rating: 4.8, reviewCount: 890, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'vacuum robot' },
    { id: 'fs4', name: 'Portable Power Bank 20000mAh', price: 114000, originalPrice: 190000, rating: 4.6, reviewCount: 5400, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'power bank' },
    { id: 'fs5', name: 'Electric Standing Desk', price: 950000, originalPrice: 1330000, rating: 4.9, reviewCount: 650, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'standing desk' },
    { id: 'fs6', name: 'Yoga Mat and Block Set', price: 133000, originalPrice: 228000, rating: 4.7, reviewCount: 1200, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'yoga mat' },
];

const CountdownTimer = ({ targetDate }: { targetDate: number }) => {
  const { hours, minutes, seconds } = useCountdown(targetDate);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-white bg-red-600 rounded-md px-2 py-1">{formatTime(hours)}</span>
      <span className="text-red-600 font-bold">:</span>
      <span className="text-lg font-bold text-white bg-red-600 rounded-md px-2 py-1">{formatTime(minutes)}</span>
      <span className="text-red-600 font-bold">:</span>
      <span className="text-lg font-bold text-white bg-red-600 rounded-md px-2 py-1">{formatTime(seconds)}</span>
    </div>
  );
};

export function FlashSales() {
  const threeHoursFromNow = new Date().getTime() + 3 * 60 * 60 * 1000;

  return (
    <section className="bg-red-50 rounded-lg p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h2 className="text-xl md:text-2xl font-headline font-bold text-red-600">Flash Sales</h2>
          <CountdownTimer targetDate={threeHoursFromNow} />
        </div>
        <Link href="#" className="flex shrink-0 items-center text-sm font-semibold text-primary hover:underline">
          See All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="product-carousel -mx-2 flex overflow-x-auto pb-4">
        <div className="flex gap-4 px-2">
            {flashSaleProducts.map((product) => (
                <div key={product.id} className="w-52 sm:w-60 flex-shrink-0">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
