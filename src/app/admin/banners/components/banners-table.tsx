
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
import type { HeroSlide } from '@/lib/types';
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

interface BannersTableProps {
  slides: HeroSlide[];
  onDeleteClick: (slide: HeroSlide) => void;
}

export function BannersTable({ slides, onDeleteClick }: BannersTableProps) {
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
          <TableHead className="hidden md:table-cell">Link</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {slides.map((slide) => (
          <TableRow key={slide.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt={slide.title}
                className="aspect-video rounded-md object-cover"
                height="64"
                src={slide.imageUrl}
                width="128"
                data-ai-hint={slide.dataAiHint}
              />
            </TableCell>
            <TableCell className="font-medium">{slide.title}</TableCell>
             <TableCell>
              <Badge variant={slide.enabled ? 'secondary' : 'outline'} className={cn(
                slide.enabled && 'bg-green-600 text-primary-foreground',
              )}>
                {slide.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{slide.link}</TableCell>
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
                  <DropdownMenuItem onClick={() => router.push(`/admin/banners/edit/${slide.id}`)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                    onClick={() => onDeleteClick(slide)}
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
