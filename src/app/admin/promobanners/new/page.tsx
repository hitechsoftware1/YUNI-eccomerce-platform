'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { addPromoBanner } from '@/lib/promobanner-actions';
import { PromoBannerForm, type PromoBannerFormValues } from '../components/promobanner-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function NewPromoBannerPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (data: PromoBannerFormValues) => {
    setIsSaving(true);
    try {
      const newBanner = await addPromoBanner(data);
      
      toast({
        title: 'Promo Banner Created',
        description: `"${newBanner.alt}" has been successfully added.`,
      });

      router.push('/admin/promobanners');
      router.refresh();
    } catch (error) {
      console.error('Failed to create promo banner:', error);
      toast({
        title: 'Error',
        description: 'Failed to create promo banner. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Promo Banner</CardTitle>
        <CardDescription>Fill out the form below to add a new banner to the secondary promo grid.</CardDescription>
      </CardHeader>
      <CardContent>
        <PromoBannerForm onSave={handleSave} isSaving={isSaving} />
      </CardContent>
    </Card>
  );
}
