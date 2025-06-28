'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { addHomepageSection } from '@/lib/homepage-actions';
import { SectionForm, type SectionFormValues } from '../components/section-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function NewHomepageSectionPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (data: SectionFormValues) => {
    setIsSaving(true);
    try {
      const newSection = await addHomepageSection(data);
      
      toast({
        title: 'Section Created',
        description: `"${newSection.title}" has been successfully added.`,
      });

      router.push('/admin/homepage');
      router.refresh();
    } catch (error) {
      console.error('Failed to create section:', error);
      toast({
        title: 'Error',
        description: 'Failed to create section. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Homepage Section</CardTitle>
        <CardDescription>Fill out the form below to add a new section to your homepage.</CardDescription>
      </CardHeader>
      <CardContent>
        <SectionForm onSave={handleSave} isSaving={isSaving} />
      </CardContent>
    </Card>
  );
}
