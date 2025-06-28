
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { updateProduct } from '@/lib/product-actions';
import { ProductForm, type ProductFormValues } from '../../components/product-form';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';

export function EditFormWrapper({ product }: { product: Product }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSaveProduct = async (data: ProductFormValues) => {
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

  const initialData = {
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    status: product.status,
    imageUrl: product.imageUrl,
    dataAiHint: product.dataAiHint,
  };

  return <ProductForm onSave={handleSaveProduct} isSaving={isSaving} initialData={initialData} />;
}
