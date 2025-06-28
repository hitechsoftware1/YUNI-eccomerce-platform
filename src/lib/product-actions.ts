
'use server';

import { revalidatePath } from 'next/cache';
import { db } from './db';
import type { Product } from '@/lib/types';
import type { ProductFormValues } from '@/app/admin/products/components/product-form';
import { addAdminNotification } from './notification-actions';

export async function addProduct(productData: ProductFormValues) {
  const newProduct: Product = {
    id: `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...productData,
    price: Number(productData.price),
    sellerName: 'YUNI Store', // In a real app, this would come from the logged-in user context
    imageUrl: productData.imageUrl || 'https://placehold.co/300x300.png',
    dataAiHint: productData.dataAiHint || productData.name.toLowerCase().split(' ').slice(0, 2).join(' '),
    rating: 0,
    reviewCount: 0,
    isNew: true,
  };
  db.products.unshift(newProduct);
  
  await addAdminNotification({
    title: 'New Product Added',
    description: `Product "${newProduct.name}" was created.`,
    href: `/admin/products/edit/${newProduct.id}`
  });

  revalidatePath('/');
  revalidatePath('/admin/products');
  revalidatePath(`/category/${newProduct.category}`);

  return newProduct;
}

export async function updateProduct(id: string, productData: ProductFormValues): Promise<Product | undefined> {
    const productIndex = db.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
        return undefined;
    }

    const existingProduct = db.products[productIndex];
    const updatedProduct: Product = {
        ...existingProduct,
        ...productData,
        price: Number(productData.price),
        imageUrl: productData.imageUrl || 'https://placehold.co/300x300.png',
        dataAiHint: productData.dataAiHint || productData.name.toLowerCase().split(' ').slice(0, 2).join(' '),
    };

    db.products[productIndex] = updatedProduct;
    
    await addAdminNotification({
        title: 'Product Updated',
        description: `Product "${updatedProduct.name}" was updated.`,
        href: `/admin/products/edit/${updatedProduct.id}`
    });

    revalidatePath('/');
    revalidatePath('/admin/products');
    revalidatePath(`/products/${id}`);
    revalidatePath(`/category/${updatedProduct.category}`);
    if (existingProduct.category !== updatedProduct.category) {
        revalidatePath(`/category/${existingProduct.category}`);
    }

    return updatedProduct;
}

export async function deleteProduct(id: string): Promise<void> {
    const productIndex = db.products.findIndex((p) => p.id === id);
    if (productIndex === -1) return;
    
    const productToDelete = db.products[productIndex];
    
    db.products.splice(productIndex, 1);

    await addAdminNotification({
        title: 'Product Deleted',
        description: `Product "${productToDelete.name}" was deleted.`,
        href: '/admin/products'
    });

    revalidatePath('/');
    revalidatePath('/admin/products');
    revalidatePath(`/products/${id}`);
    revalidatePath(`/category/${productToDelete.category}`);
}
