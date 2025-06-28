
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { updateHomepageSection } from '@/lib/homepage-actions';
import { SectionForm, type SectionFormValues } from '../../components/section-form';
import { useToast } from '@/hooks/use-toast';
import type { HomepageSection } from '@/lib/types';

export function EditFormWrapper({ section }: { section: HomepageSection }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (data: SectionFormValues) => {
    setIsSaving(true);
    try {
      const updatedSection = await updateHomepageSection(section.id, data);
      
      toast({
        title: 'Section Updated',
        description: `"${updatedSection?.title}" has been successfully updated.`,
      });

      router.push('/admin/homepage');
      router.refresh();
    } catch (error) {
      console.error('Failed to update section:', error);
      toast({
        title: 'Error',
        description: 'Failed to update section. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const initialData: SectionFormValues = {
    title: section.title,
    type: section.type,
    productSource: section.productSource || undefined,
  };

  return <SectionForm onSave={handleSave} isSaving={isSaving} initialData={initialData} />;
}
