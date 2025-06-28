
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { updatePromoCard } from '@/lib/promocard-actions';
import { PromoCardForm, type PromoCardFormValues } from '../../components/promocard-form';
import { useToast } from '@/hooks/use-toast';
import type { PromoCard } from '@/lib/types';

export function EditFormWrapper({ card }: { card: PromoCard }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (data: PromoCardFormValues) => {
    setIsSaving(true);
    try {
      const updatedCard = await updatePromoCard(card.id, data);
      
      toast({
        title: 'Promo Card Updated',
        description: `"${updatedCard?.title}" has been successfully updated.`,
      });

      router.push('/admin/promocards');
      router.refresh();
    } catch (error) {
      console.error('Failed to update promo card:', error);
      toast({
        title: 'Error',
        description: 'Failed to update promo card. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const initialData: PromoCardFormValues = {
    title: card.title,
    category: card.category,
    href: card.href,
    imageUrl: card.imageUrl,
    dataAiHint: card.dataAiHint,
  };

  return <PromoCardForm onSave={handleSave} isSaving={isSaving} initialData={initialData} />;
}
