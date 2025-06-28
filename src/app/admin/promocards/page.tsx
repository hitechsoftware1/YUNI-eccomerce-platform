import { getAllPromoCards } from "@/lib/promo-cards";
import { PromoCardsClient } from "./components/promocards-client";
import type { PromoCard } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function PromoCardsPage() {
  const cards: PromoCard[] = getAllPromoCards();
  return <PromoCardsClient cards={cards} />;
}
