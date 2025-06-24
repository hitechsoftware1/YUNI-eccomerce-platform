'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getHeroSlideById } from '@/lib/banners';
import { updateHeroSlide } from '@/lib/banner-actions';
import { BannerForm, type BannerFormValues } from '../../components/banner-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { HeroSlide } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditBannerPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [slide, setSlide] = React.useState<HeroSlide | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      const fetchedSlide = getHeroSlideById(id);
      if (fetchedSlide) {
        setSlide(fetchedSlide);
      } else {
        toast({ title: "Error", description: "Banner not found.", variant: "destructive" });
        router.push('/admin/banners');
      }
      setLoading(false);
    }
  }, [id, router, toast]);

  const handleSaveBanner = async (data: BannerFormValues) => {
    if (!slide) return;
    setIsSaving(true);
    try {
      const updatedSlide = await updateHeroSlide(slide.id, data);
      
      toast({
        title: 'Banner Updated',
        description: `"${updatedSlide?.title}" has been successfully updated.`,
      });

      router.push('/admin/banners');
      router.refresh();
    } catch (error) {
      console.error('Failed to update banner:', error);
      toast({
        title: 'Error',
        description: 'Failed to update banner. Please try again.',
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
  
  if (!slide) {
      return (
          <div className="flex items-center justify-center h-64">
            <p>Banner not found. Redirecting...</p>
          </div>
      )
  }

  const initialData: BannerFormValues = {
      title: slide.title,
      subtitle: slide.subtitle,
      link: slide.link,
      imageUrl: slide.imageUrl,
      dataAiHint: slide.dataAiHint,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Banner</CardTitle>
        <CardDescription>Update the details for "{slide.title}".</CardDescription>
      </CardHeader>
      <CardContent>
        <BannerForm onSave={handleSaveBanner} isSaving={isSaving} initialData={initialData} />
      </CardContent>
    </Card>
  );
}
