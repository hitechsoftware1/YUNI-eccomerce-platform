
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { addProduct } from '@/lib/product-actions';
import { ProductForm, type ProductFormValues } from '../components/product-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSaveProduct = async (data: ProductFormValues) => {
    setIsSaving(true);
    try {
      const newProduct = await addProduct(data);
      
      toast({
        title: 'Product Created',
        description: `"${newProduct.name}" has been successfully added.`,
      });

      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Failed to create product:', error);
      toast({
        title: 'Error',
        description: 'Failed to create product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>Fill out the form below to add a new product to your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductForm onSave={handleSaveProduct} isSaving={isSaving} />
      </CardContent>
    </Card>
  );
}
