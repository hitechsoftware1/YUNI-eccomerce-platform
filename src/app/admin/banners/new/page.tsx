'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { addHeroSlide } from '@/lib/banner-actions';
import { BannerForm, type BannerFormValues } from '../components/banner-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function NewBannerPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSaveBanner = async (data: BannerFormValues) => {
    setIsSaving(true);
    try {
      const newSlide = await addHeroSlide(data);
      
      toast({
        title: 'Banner Created',
        description: `"${newSlide.title}" has been successfully added.`,
      });

      router.push('/admin/banners');
      router.refresh();
    } catch (error) {
      console.error('Failed to create banner:', error);
      toast({
        title: 'Error',
        description: 'Failed to create banner. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Banner</CardTitle>
        <CardDescription>Fill out the form below to add a new hero banner to your homepage.</CardDescription>
      </CardHeader>
      <CardContent>
        <BannerForm onSave={handleSaveBanner} isSaving={isSaving} />
      </CardContent>
    </Card>
  );
}
