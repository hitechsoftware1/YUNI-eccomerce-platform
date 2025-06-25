'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { generatePromoCardImage } from '@/ai/flows/generate-promo-card-image-flow';
import { Wand2 } from 'lucide-react';
import Image from 'next/image';

const promoCardFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  category: z.string().min(3, { message: 'Category must be at least 3 characters.' }).describe("A short, single-word category for filtering (e.g., electronics, fashion)"),
  href: z.string().min(1, { message: 'Link is required. Use / for homepage.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  dataAiHint: z.string().max(40, { message: 'Hint cannot be longer than two words.' }).optional(),
});

export type PromoCardFormValues = z.infer<typeof promoCardFormSchema>;

interface PromoCardFormProps {
  initialData?: PromoCardFormValues;
  onSave: (data: PromoCardFormValues) => void;
  isSaving: boolean;
}

export function PromoCardForm({ initialData, onSave, isSaving }: PromoCardFormProps) {
  const form = useForm<PromoCardFormValues>({
    resolver: zodResolver(promoCardFormSchema),
    defaultValues: initialData || {
      title: '',
      category: '',
      href: '',
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
        const result = await generatePromoCardImage({ prompt: hint });
        form.setValue('imageUrl', result.imageUrl, { shouldValidate: true });
        toast({
            title: "Image Generated",
            description: "The promo card image has been successfully generated.",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Explore Gadgets" {...field} disabled={allDisabled} />
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
              <FormControl>
                <Input placeholder="e.g., electronics" {...field} disabled={allDisabled} />
              </FormControl>
               <FormDescription>A short, single-word category for filtering (e.g., electronics, fashion).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="href"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Link URL</FormLabel>
                <FormControl>
                    <Input placeholder="/category/electronics" {...field} disabled={allDisabled} />
                </FormControl>
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
                <Image src={imageUrl} alt="Promo Card preview" fill className="object-cover" />
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
                        <Input placeholder="e.g., 'fashion models'" {...field} value={field.value ?? ''} disabled={allDisabled} />
                    </FormControl>
                    <Button type="button" onClick={handleGenerateImage} disabled={allDisabled}>
                        <Wand2 className="mr-2 h-4 w-4" />
                        {isGenerating ? 'Generating...' : 'Generate'}
                    </Button>
                </div>
                <FormDescription>
                    One or two keywords to help our AI generate an image.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        <Button type="submit" disabled={allDisabled}>
          {isSaving ? 'Saving...' : (isGenerating ? 'Waiting for image...' : 'Save Card')}
        </Button>
      </form>
    </Form>
  );
}
