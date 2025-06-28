import { getAllSecondaryPromos } from "@/lib/secondary-promo-data";
import { PromoBannersClient } from "./components/promobanners-client";
import type { SecondaryPromoGridItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function PromoBannersPage() {
  const promos: SecondaryPromoGridItem[] = getAllSecondaryPromos();
  return <PromoBannersClient promos={promos} />;
}
