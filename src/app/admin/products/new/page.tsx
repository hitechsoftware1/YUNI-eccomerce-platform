
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { addProduct } from '@/lib/products';
import { ProductForm, type ProductFormValues } from '../components/product-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSaveProduct = async (data: ProductFormValues) => {
    setIsSaving(true);
    try {
      // In a real app, this would be an API call to your backend.
      // For this prototype, we'll just simulate it.
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProduct: Omit<Product, 'id'> = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl: 'https://placehold.co/300x300.png',
        dataAiHint: 'new product',
        rating: 0,
        reviewCount: 0,
        isNew: true,
      };

      addProduct(newProduct);
      
      toast({
        title: 'Product Created',
        description: `"${data.name}" has been successfully added.`,
      });

      router.push('/admin/products');
      router.refresh(); // Refresh server components to show the new product
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
