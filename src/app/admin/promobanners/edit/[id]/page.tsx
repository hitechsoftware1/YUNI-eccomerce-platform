'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getSecondaryPromoById } from '@/lib/secondary-promo-data';
import { updatePromoBanner } from '@/lib/promobanner-actions';
import { PromoBannerForm, type PromoBannerFormValues } from '../../components/promobanner-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { SecondaryPromoGridItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditPromoBannerPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [promo, setPromo] = React.useState<SecondaryPromoGridItem | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      const fetchedPromo = getSecondaryPromoById(id);
      if (fetchedPromo) {
        setPromo(fetchedPromo);
      } else {
        toast({ title: "Error", description: "Promo banner not found.", variant: "destructive" });
        router.push('/admin/promobanners');
      }
      setLoading(false);
    }
  }, [id, router, toast]);

  const handleSave = async (data: PromoBannerFormValues) => {
    if (!promo) return;
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
  
  if (!promo) {
      return (
          <div className="flex items-center justify-center h-64">
            <p>Promo banner not found. Redirecting...</p>
          </div>
      )
  }

  const initialData: PromoBannerFormValues = {
      alt: promo.alt,
      link: promo.link,
      imageUrl: promo.imageUrl,
      dataAiHint: promo.dataAiHint,
      aspectRatio: promo.aspectRatio,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Promo Banner</CardTitle>
        <CardDescription>Update the details for "{promo.alt}".</CardDescription>
      </CardHeader>
      <CardContent>
        <PromoBannerForm onSave={handleSave} isSaving={isSaving} initialData={initialData} />
      </CardContent>
    </Card>
  );
}
