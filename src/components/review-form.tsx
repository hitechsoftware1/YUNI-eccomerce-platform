
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const reviewSchema = z.object({
  title: z.string().min(3, { message: 'Title is required.' }),
  comment: z.string().min(10, { message: 'Comment must be at least 10 characters.' }),
  rating: z.number().min(1, { message: 'Please select a rating.' }).max(5),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  initialData?: ReviewFormValues;
  onSave: (data: ReviewFormValues) => void;
  onCancel: () => void;
  isSaving: boolean;
}

const StarRatingInput = ({ value, onChange }: { value: number, onChange: (value: number) => void }) => {
    const [hoverRating, setHoverRating] = React.useState(0);
    return (
        <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
            {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                    <button
                        type="button"
                        key={ratingValue}
                        onMouseEnter={() => setHoverRating(ratingValue)}
                        onClick={() => onChange(ratingValue)}
                        className="p-1"
                    >
                        <Star className={cn(
                            "h-6 w-6 cursor-pointer transition-colors",
                            ratingValue <= (hoverRating || value) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        )} />
                    </button>
                );
            })}
        </div>
    );
};

export function ReviewForm({ initialData, onSave, onCancel, isSaving }: ReviewFormProps) {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: initialData || {
      title: '',
      comment: '',
      rating: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <StarRatingInput value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Best purchase ever!" {...field} disabled={isSaving} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us more about your experience..." {...field} disabled={isSaving} rows={4}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onCancel} disabled={isSaving}>Cancel</Button>
            <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Submit Review'}</Button>
        </div>
      </form>
    </Form>
  );
}
