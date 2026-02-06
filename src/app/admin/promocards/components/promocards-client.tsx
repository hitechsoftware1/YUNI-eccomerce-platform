
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

export function PromoCardsClient({ cards: initialCards }: PromoCardsClientProps) {
  const [cards, setCards] = React.useState<PromoCard[]>(initialCards);
  const [cardToDelete, setCardToDelete] = React.useState<PromoCard | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  React.useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  const handleDeleteClick = (card: PromoCard) => {
    setCardToDelete(card);
  };

  const handleConfirmDelete = async () => {
    if (!cardToDelete) return;

    setIsDeleting(true);
    
    const originalCards = [...cards];
    const cardToDeleteNow = cardToDelete;

    // Optimistically update the UI
    setCards(prevCards => prevCards.filter(c => c.id !== cardToDeleteNow.id));
    setCardToDelete(null);

    try {
      await deletePromoCard(cardToDeleteNow.id);

      toast({
        title: 'Promo Card Deleted',
        description: `Card "${cardToDeleteNow.title}" has been successfully deleted.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete promo card. Reverting changes.',
        variant: 'destructive',
      });
      setCards(originalCards);
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
