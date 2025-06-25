
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "./product-card";
import { useCountdown } from "@/hooks/use-countdown";
import { flashSaleProducts } from "@/lib/flash-sales-data";

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
                <div key={product.id} className="w-36 sm:w-44 flex-shrink-0">
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
