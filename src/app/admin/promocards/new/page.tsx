'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { addPromoCard } from '@/lib/promocard-actions';
import { PromoCardForm, type PromoCardFormValues } from '../components/promocard-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function NewPromoCardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (data: PromoCardFormValues) => {
    setIsSaving(true);
    try {
      const newCard = await addPromoCard(data);
      
      toast({
        title: 'Promo Card Created',
        description: `"${newCard.title}" has been successfully added.`,
      });

      router.push('/admin/promocards');
      router.refresh();
    } catch (error) {
      console.error('Failed to create promo card:', error);
      toast({
        title: 'Error',
        description: 'Failed to create promo card. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Promo Card</CardTitle>
        <CardDescription>Fill out the form below to add a new card to the "Explore More" grid.</CardDescription>
      </CardHeader>
      <CardContent>
        <PromoCardForm onSave={handleSave} isSaving={isSaving} />
      </CardContent>
    </Card>
  );
}
