'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPromoCardById } from '@/lib/promo-cards';
import { updatePromoCard } from '@/lib/promocard-actions';
import { PromoCardForm, type PromoCardFormValues } from '../../components/promocard-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { PromoCard } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditPromoCardPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [card, setCard] = React.useState<PromoCard | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      const fetchedCard = getPromoCardById(id);
      if (fetchedCard) {
        setCard(fetchedCard);
      } else {
        toast({ title: "Error", description: "Promo card not found.", variant: "destructive" });
        router.push('/admin/promocards');
      }
      setLoading(false);
    }
  }, [id, router, toast]);

  const handleSave = async (data: PromoCardFormValues) => {
    if (!card) return;
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
  
  if (loading) {
      return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-8">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-32" />
            </CardContent>
        </Card>
      )
  }
  
  if (!card) {
      return (
          <div className="flex items-center justify-center h-64">
            <p>Promo card not found. Redirecting...</p>
          </div>
      )
  }

  const initialData: PromoCardFormValues = {
      title: card.title,
      category: card.category,
      href: card.href,
      imageUrl: card.imageUrl,
      dataAiHint: card.dataAiHint,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Promo Card</CardTitle>
        <CardDescription>Update the details for "{card.title}".</CardDescription>
      </CardHeader>
      <CardContent>
        <PromoCardForm onSave={handleSave} isSaving={isSaving} initialData={initialData} />
      </CardContent>
    </Card>
  );
}
