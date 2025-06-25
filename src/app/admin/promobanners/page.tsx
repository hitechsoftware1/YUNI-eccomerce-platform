import { allSecondaryPromos } from "@/lib/secondary-promo-data";
import { PromoBannersClient } from "./components/promobanners-client";
import type { SecondaryPromoGridItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function PromoBannersPage() {
  const promos: SecondaryPromoGridItem[] = allSecondaryPromos;
  return <PromoBannersClient promos={promos} />;
}
