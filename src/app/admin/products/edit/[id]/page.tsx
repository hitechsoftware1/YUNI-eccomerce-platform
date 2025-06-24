
'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getProductById } from '@/lib/products';
import { updateProduct } from '@/lib/product-actions';
import { ProductForm, type ProductFormValues } from '../../components/product-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      const fetchedProduct = getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
      } else {
        toast({ title: "Error", description: "Product not found.", variant: "destructive" });
        router.push('/admin/products');
      }
      setLoading(false);
    }
  }, [id, router, toast]);

  const handleSaveProduct = async (data: ProductFormValues) => {
    if (!product) return;
    setIsSaving(true);
    try {
      const updatedProduct = await updateProduct(product.id, data);
      
      toast({
        title: 'Product Updated',
        description: `"${updatedProduct?.name}" has been successfully updated.`,
      });

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Failed to update product:', error);
      toast({
        title: 'Error',
        description: 'Failed to update product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (loading) {
      return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-8">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
                <div className="grid grid-cols-2 gap-8">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-32" />
            </CardContent>
        </Card>
      )
  }
  
  if (!product) {
      return (
          <div className="flex items-center justify-center h-64">
            <p>Product not found. Redirecting...</p>
          </div>
      )
  }

  const initialData = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      dataAiHint: product.dataAiHint,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
        <CardDescription>Update the details for "{product.name}".</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm onSave={handleSaveProduct} isSaving={isSaving} initialData={initialData} />
      </CardContent>
    </Card>
  );
}
