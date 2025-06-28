
import { getHomepageSections } from "@/lib/homepage-sections";
import { HomepageClient } from "./components/homepage-client";
import type { HomepageSection } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = 'force-dynamic';

export default function HomepageAdminPage() {
  const sections: HomepageSection[] = getHomepageSections();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Homepage Management</CardTitle>
        <CardDescription>
          Reorder sections using the arrows, use the switch to toggle visibility, and save your changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <HomepageClient initialSections={sections} />
      </CardContent>
    </Card>
  );
}
