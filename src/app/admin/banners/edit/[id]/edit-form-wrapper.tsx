
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { updateHeroSlide } from '@/lib/banner-actions';
import { BannerForm, type BannerFormValues } from '../../components/banner-form';
import { useToast } from '@/hooks/use-toast';
import type { HeroSlide } from '@/lib/types';

export function EditFormWrapper({ slide }: { slide: HeroSlide }) {
    const router = useRouter();
    const { toast } = useToast();
    const [isSaving, setIsSaving] = React.useState(false);

    const handleSaveBanner = async (data: BannerFormValues) => {
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

    const initialData: BannerFormValues = {
        title: slide.title,
        subtitle: slide.subtitle,
        link: slide.link,
        imageUrl: slide.imageUrl,
        dataAiHint: slide.dataAiHint,
    }

    return <BannerForm onSave={handleSaveBanner} isSaving={isSaving} initialData={initialData} />;
}
