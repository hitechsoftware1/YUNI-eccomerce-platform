
import { getPromoCardById } from '@/lib/promo-cards';
import { EditFormWrapper } from './edit-form-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import type { PromoCard } from '@/lib/types';

export default function EditPromoCardPage({ params }: { params: { id: string } }) {
  const card: PromoCard | undefined = getPromoCardById(params.id);

  if (!card) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Promo Card</CardTitle>
        <CardDescription>Update the details for "{card.title}".</CardDescription>
      </CardHeader>
      <CardContent>
        <EditFormWrapper card={card} />
      </CardContent>
    </Card>
  );
}
