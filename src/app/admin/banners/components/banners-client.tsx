
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from 'lucide-react';
import { BannersTable } from "./banners-table";
import { deleteHeroSlide } from "@/lib/banner-actions";
import Link from "next/link";
import { DeleteBannerDialog } from './delete-banner-dialog';
import { useToast } from '@/hooks/use-toast';
import type { HeroSlide } from '@/lib/types';

interface BannersClientProps {
    slides: HeroSlide[];
}

export function BannersClient({ slides: initialSlides }: BannersClientProps) {
  const [slides, setSlides] = React.useState<HeroSlide[]>(initialSlides);
  const [slideToDelete, setSlideToDelete] = React.useState<HeroSlide | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  React.useEffect(() => {
    setSlides(initialSlides);
  }, [initialSlides]);

  const handleDeleteClick = (slide: HeroSlide) => {
    setSlideToDelete(slide);
  };

  const handleConfirmDelete = async () => {
    if (!slideToDelete) return;

    setIsDeleting(true);

    const originalSlides = [...slides];
    const bannerToDelete = slideToDelete;

    // Optimistically update the UI
    setSlides(prevSlides => prevSlides.filter(s => s.id !== bannerToDelete.id));
    setSlideToDelete(null);

    try {
      // Call server action in the background
      await deleteHeroSlide(bannerToDelete.id);

      toast({
        title: 'Banner Deleted',
        description: `Banner "${bannerToDelete.title}" has been successfully deleted.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete banner. Reverting changes.',
        variant: 'destructive',
      });
      // Revert the UI on error
      setSlides(originalSlides);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button asChild>
          <Link href="/admin/banners/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Banner
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Hero Banners</CardTitle>
          <CardDescription>
            Manage the main hero banners on your homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BannersTable slides={slides} onDeleteClick={handleDeleteClick} />
        </CardContent>
      </Card>
      {slideToDelete && (
        <DeleteBannerDialog
            isOpen={!!slideToDelete}
            onOpenChange={(isOpen) => !isOpen && setSlideToDelete(null)}
            onConfirm={handleConfirmDelete}
            isDeleting={isDeleting}
            bannerTitle={slideToDelete.title}
        />
      )}
    </div>
  )
}
