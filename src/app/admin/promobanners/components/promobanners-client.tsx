
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
import { PromoBannersTable } from "./promobanners-table";
import { deletePromoBanner } from "@/lib/promobanner-actions";
import Link from "next/link";
import { DeletePromoBannerDialog } from './delete-promobanner-dialog';
import { useToast } from '@/hooks/use-toast';
import type { SecondaryPromoGridItem } from '@/lib/types';

interface PromoBannersClientProps {
    promos: SecondaryPromoGridItem[];
}

export function PromoBannersClient({ promos: initialPromos }: PromoBannersClientProps) {
  const [promos, setPromos] = React.useState<SecondaryPromoGridItem[]>(initialPromos);
  const [promoToDelete, setPromoToDelete] = React.useState<SecondaryPromoGridItem | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  React.useEffect(() => {
    setPromos(initialPromos);
  }, [initialPromos]);

  const handleDeleteClick = (promo: SecondaryPromoGridItem) => {
    setPromoToDelete(promo);
  };

  const handleConfirmDelete = async () => {
    if (!promoToDelete) return;

    setIsDeleting(true);
    try {
      await deletePromoBanner(promoToDelete.id);

      toast({
        title: 'Promo Banner Deleted',
        description: `"${promoToDelete.alt}" has been successfully deleted.`,
      });
      setPromoToDelete(null);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete promo banner. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button asChild>
          <Link href="/admin/promobanners/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Promo Banner
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Promo Banners</CardTitle>
          <CardDescription>
            Manage the secondary promotional banners on your homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PromoBannersTable promos={promos} onDeleteClick={handleDeleteClick} />
        </CardContent>
      </Card>
      {promoToDelete && (
        <DeletePromoBannerDialog
            isOpen={!!promoToDelete}
            onOpenChange={(isOpen) => !isOpen && setPromoToDelete(null)}
            onConfirm={handleConfirmDelete}
            isDeleting={isDeleting}
            bannerTitle={promoToDelete.alt}
        />
      )}
    </div>
  )
}
