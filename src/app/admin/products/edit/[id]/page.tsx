
import { getProductById } from '@/lib/products';
import { EditFormWrapper } from './edit-form-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product: Product | undefined = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
        <CardDescription>Update the details for "{product.name}".</CardDescription>
      </CardHeader>
      <CardContent>
        <EditFormWrapper product={product} />
      </CardContent>
    </Card>
  );
}
