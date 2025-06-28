
import { getHomepageSectionById } from '@/lib/homepage-sections';
import { EditFormWrapper } from './edit-form-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import type { HomepageSection } from '@/lib/types';

export default function EditHomepageSectionPage({ params }: { params: { id: string } }) {
  const section: HomepageSection | undefined = getHomepageSectionById(params.id);

  if (!section) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Homepage Section</CardTitle>
        <CardDescription>Update the details for "{section.title}".</CardDescription>
      </CardHeader>
      <CardContent>
        <EditFormWrapper section={section} />
      </CardContent>
    </Card>
  );
}
