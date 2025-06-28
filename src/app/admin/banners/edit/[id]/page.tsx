
import { getHeroSlideById } from '@/lib/banners';
import { EditFormWrapper } from './edit-form-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import type { HeroSlide } from '@/lib/types';

export default function EditBannerPage({ params }: { params: { id: string } }) {
    const slide: HeroSlide | undefined = getHeroSlideById(params.id);

    if (!slide) {
        notFound();
    }

    return (
        <Card>
        <CardHeader>
            <CardTitle>Edit Banner</CardTitle>
            <CardDescription>Update the details for "{slide.title}".</CardDescription>
        </CardHeader>
        <CardContent>
            <EditFormWrapper slide={slide} />
        </CardContent>
        </Card>
    );
}
