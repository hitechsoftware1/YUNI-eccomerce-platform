
import { getSellerPerformanceData } from "@/lib/sellers";
import { SellersClient } from "./components/sellers-client";
import type { SellerPerformance } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function SellersPage() {
  const sellers: SellerPerformance[] = getSellerPerformanceData();
  return <SellersClient sellers={sellers} />;
}
