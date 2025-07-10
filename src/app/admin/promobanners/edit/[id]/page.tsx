
import { getSecondaryPromoById } from '@/lib/secondary-promo-data';
import { EditFormWrapper } from './edit-form-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import type { SecondaryPromoGridItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function EditPromoBannerPage({ params }: { params: { id: string } }) {
  const promo: SecondaryPromoGridItem | undefined = getSecondaryPromoById(params.id);

  if (!promo) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Promo Banner</CardTitle>
        <CardDescription>Update the details for "{promo.alt}".</CardDescription>
      </CardHeader>
      <CardContent>
        <EditFormWrapper promo={promo} />
      </CardContent>
    </Card>
  );
}
