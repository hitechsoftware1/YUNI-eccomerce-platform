
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
import type { SecondaryPromoGridItem } from '@/lib/types';
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

interface PromoBannersTableProps {
  promos: SecondaryPromoGridItem[];
  onDeleteClick: (promo: SecondaryPromoGridItem) => void;
}

export function PromoBannersTable({ promos, onDeleteClick }: PromoBannersTableProps) {
  const router = useRouter();
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            Image
          </TableHead>
          <TableHead>Alt Text</TableHead>
          <TableHead className="hidden md:table-cell">Link</TableHead>
          <TableHead className="hidden md:table-cell">Aspect Ratio</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {promos.map((promo) => (
          <TableRow key={promo.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt={promo.alt}
                className="aspect-video rounded-md object-cover"
                height="64"
                src={promo.imageUrl}
                width="128"
                data-ai-hint={promo.dataAiHint}
              />
            </TableCell>
            <TableCell className="font-medium">{promo.alt}</TableCell>
            <TableCell className="hidden md:table-cell">{promo.link}</TableCell>
             <TableCell className="hidden md:table-cell">
                <Badge variant="outline">{promo.aspectRatio}</Badge>
            </TableCell>
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
                  <DropdownMenuItem onClick={() => router.push(`/admin/promobanners/edit/${promo.id}`)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                    onClick={() => onDeleteClick(promo)}
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
