
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

interface ProductsClientProps {
    products: Product[];
}

export function ProductsClient({ products: initialProducts }: ProductsClientProps) {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
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
          <ProductsTable products={products} onDeleteClick={handleDeleteClick} />
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
