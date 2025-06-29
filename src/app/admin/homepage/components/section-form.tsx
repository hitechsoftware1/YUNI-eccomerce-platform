'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { HomepageSection, SectionType } from '@/lib/types';

const sectionFormSchema = z.object({
  type: z.custom<SectionType>(val => typeof val === "string" && val.length > 0, 'Please select a section type.'),
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  productSource: z.string().optional(),
}).refine(data => {
    if (data.type === 'ProductSection' && !data.productSource) {
        return false;
    }
    return true;
}, {
    message: "Product source is required for Product Sections.",
    path: ["productSource"],
});

export type SectionFormValues = z.infer<typeof sectionFormSchema>;

interface SectionFormProps {
  initialData?: SectionFormValues;
  onSave: (data: SectionFormValues) => void;
  isSaving: boolean;
}

const allSectionTypes: SectionType[] = [
  'HeroSlider', 'AnimatedBanner', 'CategoryGrid', 'CuratedForYou', 'FlashSales', 'PromoBanner', 
  'ProductSection', 'LatestProducts', 'ExploreMore', 'SecondaryPromoGrid'
];
const allProductSources = ['top-selling', 'new-arrivals', 'groceries', 'beverages'];

export function SectionForm({ initialData, onSave, isSaving }: SectionFormProps) {
  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
    defaultValues: initialData || {
      type: 'ProductSection',
      title: '',
      productSource: 'top-selling',
    },
  });

  const watchType = form.watch('type');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Section Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSaving}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a section type" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {allSectionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type.replace(/([A-Z])/g, ' $1').trim()}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormDescription>Select the type of content section to add.</FormDescription>
                <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Top Selling Electronics" {...field} disabled={isSaving} />
              </FormControl>
              <FormDescription>This will be the title displayed on the homepage for sections like "Product Section". It's also used as the label in the admin list.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchType === 'ProductSection' && (
             <FormField
                control={form.control}
                name="productSource"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product Source</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSaving}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a product source" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {allProductSources.map((source) => (
                                <SelectItem key={source} value={source}>
                                    {source.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>Select which group of products to display in this section.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )}
        
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Section'}
        </Button>
      </form>
    </Form>
  );
}
