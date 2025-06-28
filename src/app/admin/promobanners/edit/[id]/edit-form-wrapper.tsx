
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { updatePromoBanner } from '@/lib/promobanner-actions';
import { PromoBannerForm, type PromoBannerFormValues } from '../../components/promobanner-form';
import { useToast } from '@/hooks/use-toast';
import type { SecondaryPromoGridItem } from '@/lib/types';

export function EditFormWrapper({ promo }: { promo: SecondaryPromoGridItem }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (data: PromoBannerFormValues) => {
    setIsSaving(true);
    try {
      const updatedPromo = await updatePromoBanner(promo.id, data);
      
      toast({
        title: 'Promo Banner Updated',
        description: `"${updatedPromo?.alt}" has been successfully updated.`,
      });

      router.push('/admin/promobanners');
      router.refresh();
    } catch (error) {
      console.error('Failed to update promo banner:', error);
      toast({
        title: 'Error',
        description: 'Failed to update promo banner. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const initialData: PromoBannerFormValues = {
    alt: promo.alt,
    link: promo.link,
    imageUrl: promo.imageUrl,
    dataAiHint: promo.dataAiHint,
    aspectRatio: promo.aspectRatio,
  };

  return <PromoBannerForm onSave={handleSave} isSaving={isSaving} initialData={initialData} />;
}
