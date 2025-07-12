
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { generateBannerImage } from '@/ai/flows/generate-banner-image-flow';
import { Wand2 } from 'lucide-react';
import Image from 'next/image';

const promoBannerFormSchema = z.object({
  alt: z.string().min(3, { message: 'Alt text must be at least 3 characters.' }),
  link: z.string().min(1, { message: 'Link is required. Use / for homepage.' }),
  aspectRatio: z.enum(['2/1', '4/1'], { required_error: 'You need to select an aspect ratio.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  dataAiHint: z.string().max(40, { message: 'Hint cannot be longer than two words.' }).optional(),
});

export type PromoBannerFormValues = z.infer<typeof promoBannerFormSchema>;

interface PromoBannerFormProps {
  initialData?: PromoBannerFormValues;
  onSave: (data: PromoBannerFormValues) => void;
  isSaving: boolean;
}

export function PromoBannerForm({ initialData, onSave, isSaving }: PromoBannerFormProps) {
  const form = useForm<PromoBannerFormValues>({
    resolver: zodResolver(promoBannerFormSchema),
    defaultValues: initialData || {
      alt: '',
      link: '',
      aspectRatio: '2/1',
      imageUrl: '',
      dataAiHint: '',
    },
  });
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const allDisabled = isSaving || isGenerating;
  
  const imageUrl = form.watch('imageUrl');
  const aspectRatio = form.watch('aspectRatio');

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
        const result = await generateBannerImage({ prompt: hint });
        form.setValue('imageUrl', result.imageUrl, { shouldValidate: true });
        toast({
            title: "Image Generated",
            description: "The banner image has been successfully generated.",
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
          name="alt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alt Text</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Lato Milk Promotion" {...field} disabled={allDisabled} />
              </FormControl>
              <FormDescription>Descriptive text for screen readers and SEO.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Link URL</FormLabel>
                <FormControl>
                    <Input placeholder="/category/beverages" {...field} disabled={allDisabled} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <FormField
          control={form.control}
          name="aspectRatio"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Aspect Ratio</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                  disabled={allDisabled}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2/1" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      2:1 (Half-width banner)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="4/1" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      4:1 (Full-width banner)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
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
            <div className={`relative w-full max-w-lg overflow-hidden rounded-md border bg-secondary ${aspectRatio === '2/1' ? 'aspect-[2/1]' : 'aspect-[4/1]'}`}>
                <Image src={imageUrl} alt="Banner preview" fill className="object-cover" />
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
                        <Input placeholder="e.g., 'milk promotion'" {...field} value={field.value ?? ''} disabled={allDisabled} />
                    </FormControl>
                    <Button type="button" onClick={handleGenerateImage} disabled={allDisabled}>
                        <Wand2 className="mr-2 h-4 w-4" />
                        {isGenerating ? 'Generating...' : 'Generate'}
                    </Button>
                </div>
                <FormDescription>
                    One or two keywords to help our AI generate a banner image.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        <Button type="submit" disabled={allDisabled}>
          {isSaving ? 'Saving...' : (isGenerating ? 'Waiting for image...' : 'Save Banner')}
        </Button>
      </form>
    </Form>
  );
}
