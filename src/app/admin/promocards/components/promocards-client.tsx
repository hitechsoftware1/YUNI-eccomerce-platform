
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
import { PromoCardsTable } from "./promocards-table";
import { deletePromoCard } from "@/lib/promocard-actions";
import Link from "next/link";
import { DeletePromoCardDialog } from './delete-promocard-dialog';
import { useToast } from '@/hooks/use-toast';
import type { PromoCard } from '@/lib/types';

interface PromoCardsClientProps {
    cards: PromoCard[];
}

export function PromoCardsClient({ cards }: PromoCardsClientProps) {
  const [cardToDelete, setCardToDelete] = React.useState<PromoCard | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleDeleteClick = (card: PromoCard) => {
    setCardToDelete(card);
  };

  const handleConfirmDelete = async () => {
    if (!cardToDelete) return;

    setIsDeleting(true);
    
    try {
      await deletePromoCard(cardToDelete.id);

      toast({
        title: 'Promo Card Deleted',
        description: `Card "${cardToDelete.title}" has been successfully deleted.`,
      });
      setCardToDelete(null);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete promo card. Please try again.',
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
          <Link href="/admin/promocards/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Promo Card
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Promo Cards</CardTitle>
          <CardDescription>
            Manage the promo cards in the "Explore More" grid on your homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PromoCardsTable cards={cards} onDeleteClick={handleDeleteClick} />
        </CardContent>
      </Card>
      {cardToDelete && (
        <DeletePromoCardDialog
            isOpen={!!cardToDelete}
            onOpenChange={(isOpen) => !isOpen && setCardToDelete(null)}
            onConfirm={handleConfirmDelete}
            isDeleting={isDeleting}
            cardTitle={cardToDelete.title}
        />
      )}
    </div>
  )
}
