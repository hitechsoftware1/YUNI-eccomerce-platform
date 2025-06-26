
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
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductsTableProps {
  products: Product[];
  onDeleteClick: (product: Product) => void;
}

export function ProductsTable({ products, onDeleteClick }: ProductsTableProps) {
  const router = useRouter();
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Seller</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow 
            key={product.id}
            className="cursor-pointer"
            onClick={() => window.open(`/products/${product.id}`, '_blank', 'noopener,noreferrer')}
          >
            <TableCell className="hidden sm:table-cell">
              <Image
                alt={product.name}
                className="aspect-square rounded-md object-cover"
                height="64"
                src={product.imageUrl}
                width="64"
                data-ai-hint={product.dataAiHint}
              />
            </TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>
              <Badge variant={product.status === 'Archived' ? 'outline' : 'secondary'} className={cn(
                product.status === 'In Stock' && 'bg-green-600 text-primary-foreground',
                product.status === 'Out of Stock' && 'bg-yellow-500 text-primary-foreground',
              )}>
                {product.status}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">UGX {product.price.toLocaleString()}</TableCell>
            <TableCell className="hidden md:table-cell">{product.sellerName}</TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => window.open(`/products/${product.id}`, '_blank', 'noopener,noreferrer')}>
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push(`/admin/products/edit/${product.id}`)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                    onClick={() => onDeleteClick(product)}
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
