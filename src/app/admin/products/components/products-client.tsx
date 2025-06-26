
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
import { ProductsTable } from "./products-table";
import { deleteProduct } from "@/lib/product-actions";
import Link from "next/link";
import { DeleteProductDialog } from './delete-product-dialog';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductsClientProps {
    products: Product[];
}

export function ProductsClient({ products: initialProducts }: ProductsClientProps) {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [sellerFilter, setSellerFilter] = React.useState<string>('all');
  
  React.useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);

      toast({
        title: 'Product Deleted',
        description: `"${productToDelete.name}" has been successfully deleted.`,
      });
      setProductToDelete(null);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };
  
  const allSellers = ['all', ...Array.from(new Set(initialProducts.map(p => p.sellerName)))];
  
  const filteredProducts = sellerFilter === 'all' 
    ? products 
    : products.filter(p => p.sellerName === sellerFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Select value={sellerFilter} onValueChange={setSellerFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by seller..." />
              </SelectTrigger>
              <SelectContent>
                {allSellers.map(seller => (
                   <SelectItem key={seller} value={seller}>
                      {seller === 'all' ? 'All Sellers' : seller}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductsTable products={filteredProducts} onDeleteClick={handleDeleteClick} />
        </CardContent>
      </Card>
      {productToDelete && (
        <DeleteProductDialog
            isOpen={!!productToDelete}
            onOpenChange={(isOpen) => !isOpen && setProductToDelete(null)}
            onConfirm={handleConfirmDelete}
            isDeleting={isDeleting}
            productName={productToDelete.name}
        />
      )}
    </div>
  )
}
