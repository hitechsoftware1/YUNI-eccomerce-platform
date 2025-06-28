'use client';

import * as React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getHomepageSectionById } from '@/lib/homepage-sections';
import { updateHomepageSection } from '@/lib/homepage-actions';
import { SectionForm, type SectionFormValues } from '../../components/section-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { HomepageSection } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditHomepageSectionPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  const [section, setSection] = React.useState<HomepageSection | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      // getHomepageSectionById is not async, it reads from a local let variable
      const fetchedSection = getHomepageSectionById(id);
      if (fetchedSection) {
        setSection(fetchedSection);
      } else {
        toast({ title: "Error", description: "Section not found.", variant: "destructive" });
        router.push('/admin/homepage');
      }
      setLoading(false);
    }
  }, [id, router, toast]);

  const handleSave = async (data: SectionFormValues) => {
    if (!section) return;
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
  
  if (loading) {
      return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-8">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-32" />
            </CardContent>
        </Card>
      )
  }
  
  if (!section) {
      return (
          <div className="flex items-center justify-center h-64">
            <p>Section not found. Redirecting...</p>
          </div>
      )
  }

  const initialData: SectionFormValues = {
      title: section.title,
      type: section.type,
      productSource: section.productSource || undefined,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Homepage Section</CardTitle>
        <CardDescription>Update the details for "{section.title}".</CardDescription>
      </CardHeader>
      <CardContent>
        <SectionForm onSave={handleSave} isSaving={isSaving} initialData={initialData} />
      </CardContent>
    </Card>
  );
}
