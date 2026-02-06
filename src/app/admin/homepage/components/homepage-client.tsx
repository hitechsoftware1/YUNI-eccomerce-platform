
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { HomepageSection } from '@/lib/types';
import { updateHomepageLayout, deleteHomepageSection } from '@/lib/homepage-actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { GripVertical, ArrowUp, ArrowDown, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { DeleteSectionDialog } from './delete-section-dialog';


export function HomepageClient({ initialSections }: { initialSections: HomepageSection[] }) {
  const [sections, setSections] = React.useState(initialSections);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [sectionToDelete, setSectionToDelete] = React.useState<HomepageSection | null>(null);
  const router = useRouter();
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
      await updateHomepageLayout(sections);
      toast({
        title: 'Success',
        description: 'Homepage layout has been saved.',
      });
      router.refresh();
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

  const handleDeleteClick = (section: HomepageSection) => {
    setSectionToDelete(section);
  };

  const handleConfirmDelete = async () => {
    if (!sectionToDelete) return;
    setIsDeleting(true);
    
    try {
      await deleteHomepageSection(sectionToDelete.id);
      toast({
        title: 'Section Deleted',
        description: `Section "${sectionToDelete.title}" has been deleted.`,
      });
      setSectionToDelete(null);
      router.refresh();
    } catch (error) {
        toast({
            title: 'Error',
            description: 'Failed to delete section. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsDeleting(false);
    }
  };

  React.useEffect(() => {
    setSections(initialSections);
  }, [initialSections]);

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end">
            <Button asChild>
                <Link href="/admin/homepage/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Section
                </Link>
            </Button>
        </div>
        <div className="border rounded-lg">
          <ul className="divide-y divide-border">
            {sections.map((section, index) => (
              <li key={section.id} className="flex items-center p-4 gap-4">
                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                <div className="flex-grow">
                  <p className="font-medium">{section.title}</p>
                  <p className="text-sm text-muted-foreground">{section.type.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
                <div className="flex items-center gap-1">
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
                   <Button asChild size="icon" variant="ghost">
                     <Link href={`/admin/homepage/edit/${section.id}`}>
                        <Pencil className="h-4 w-4" />
                     </Link>
                   </Button>
                   <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDeleteClick(section)}>
                     <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Layout Changes'}
        </Button>
      </div>
       {sectionToDelete && (
        <DeleteSectionDialog
            isOpen={!!sectionToDelete}
            onOpenChange={(isOpen) => !isOpen && setSectionToDelete(null)}
            onConfirm={handleConfirmDelete}
            isDeleting={isDeleting}
            sectionTitle={sectionToDelete.title}
        />
      )}
    </>
  );
}
