
'use client';

import * as React from 'react';
import type { HomepageSection } from '@/lib/types';
import { updateHomepageSections } from '@/lib/homepage-actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';

export function HomepageClient({ initialSections }: { initialSections: HomepageSection[] }) {
  const [sections, setSections] = React.useState(initialSections);
  const [isSaving, setIsSaving] = React.useState(false);
  const { toast } = useToast();

  const handleToggle = (id: string, enabled: boolean) => {
    setSections(prev =>
      prev.map(s => (s.id === id ? { ...s, enabled } : s))
    );
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;

    const newSections = [...sections];
    const item = newSections.splice(index, 1)[0];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    newSections.splice(newIndex, 0, item);
    setSections(newSections);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await updateHomepageSections(sections);
      toast({
        title: 'Success',
        description: 'Homepage layout has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save homepage layout.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        <ul className="divide-y divide-border">
          {sections.map((section, index) => (
            <li key={section.id} className="flex items-center p-4 gap-4">
              <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
              <div className="flex-grow">
                <p className="font-medium">{section.title}</p>
                <p className="text-sm text-muted-foreground">{section.type}</p>
              </div>
              <div className="flex items-center gap-2">
                 <Switch
                    checked={section.enabled}
                    onCheckedChange={(checked) => handleToggle(section.id, checked)}
                 />
                 <Button size="icon" variant="ghost" onClick={() => moveSection(index, 'up')} disabled={index === 0}>
                    <ArrowUp className="h-4 w-4" />
                 </Button>
                 <Button size="icon" variant="ghost" onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1}>
                    <ArrowDown className="h-4 w-4" />
                 </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={handleSaveChanges} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
}
