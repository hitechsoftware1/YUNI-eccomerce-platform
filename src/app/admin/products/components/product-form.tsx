
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/categories';
import { useToast } from '@/hooks/use-toast';
import { generateProductImage } from '@/ai/flows/generate-product-image-flow';
import { Wand2 } from 'lucide-react';
import Image from 'next/image';


const productFormSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  category: z.string({ required_error: 'Please select a category.' }),
  status: z.enum(['In Stock', 'Out of Stock', 'Archived'], { required_error: 'Please select a status.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  dataAiHint: z.string().max(40, { message: 'Hint cannot be longer than two words.' }).optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  initialData?: ProductFormValues;
  onSave: (data: ProductFormValues) => void;
  isSaving: boolean;
}

export function ProductForm({ initialData, onSave, isSaving }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      price: 0,
      category: '',
      status: 'In Stock',
      imageUrl: '',
      dataAiHint: '',
    },
  });
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const allDisabled = isSaving || isGenerating;
  
  const imageUrl = form.watch('imageUrl');

  const handleGenerateImage = async () => {
    const hint = form.getValues('dataAiHint');
    if (!hint) {
        toast({
            title: "Hint required",
            description: "Please provide an AI hint to generate an image.",
            variant: "destructive",
        });
        return;
    }

    setIsGenerating(true);
    try {
        const result = await generateProductImage({ prompt: hint });
        form.setValue('imageUrl', result.imageUrl, { shouldValidate: true });
        toast({
            title: "Image Generated",
            description: "The product image has been successfully generated.",
        });
    } catch (error) {
        console.error("Failed to generate image:", error);
        toast({
            title: "Error",
            description: "Failed to generate image. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsGenerating(false);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Wireless Headphones" {...field} disabled={allDisabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the product..." {...field} disabled={allDisabled} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price (UGX)</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="e.g., 570000" {...field} disabled={allDisabled} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={allDisabled}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                            {category.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={allDisabled}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="In Stock">In Stock</SelectItem>
                            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                            <SelectItem value="Archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription>Archived products are hidden from the store.</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
            />
        <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                    <Input placeholder="https://your-image-url.com/image.png or generate with AI" {...field} value={field.value ?? ''} disabled={allDisabled} />
                </FormControl>
                <FormDescription>
                    Enter a URL or generate an image with the AI hint below.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />

        {imageUrl && (
            <div className="relative aspect-square w-48 overflow-hidden rounded-md border bg-secondary">
                <Image src={imageUrl} alt="Product preview" fill className="object-cover" />
            </div>
        )}

        <FormField
            control={form.control}
            name="dataAiHint"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image AI Hint</FormLabel>
                <div className="flex gap-2">
                    <FormControl>
                        <Input placeholder="e.g., 'blue shoe'" {...field} value={field.value ?? ''} disabled={allDisabled} />
                    </FormControl>
                    <Button type="button" onClick={handleGenerateImage} disabled={allDisabled}>
                        <Wand2 className="mr-2 h-4 w-4" />
                        {isGenerating ? 'Generating...' : 'Generate'}
                    </Button>
                </div>
                <FormDescription>
                    One or two keywords to help our AI generate a product image.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        <Button type="submit" disabled={allDisabled}>
          {isSaving ? 'Saving...' : (isGenerating ? 'Waiting for image...' : 'Save Product')}
        </Button>
      </form>
    </Form>
  );
}
