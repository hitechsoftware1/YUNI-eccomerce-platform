
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { PromoCard } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PromoCardsTableProps {
  cards: PromoCard[];
  onDeleteClick: (card: PromoCard) => void;
}

export function PromoCardsTable({ cards, onDeleteClick }: PromoCardsTableProps) {
  const router = useRouter();
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            Image
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead className="hidden md:table-cell">Link</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt={card.title}
                className="aspect-square rounded-md object-cover"
                height="64"
                src={card.imageUrl}
                width="64"
                data-ai-hint={card.dataAiHint}
              />
            </TableCell>
            <TableCell className="font-medium">{card.title}</TableCell>
            <TableCell>
              <Badge variant={card.enabled ? 'secondary' : 'outline'} className={cn(
                card.enabled && 'bg-green-600 text-primary-foreground',
              )}>
                {card.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell capitalize">{card.category}</TableCell>
            <TableCell className="hidden md:table-cell">{card.href}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => router.push(`/admin/promocards/edit/${card.id}`)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                    onClick={() => onDeleteClick(card)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
