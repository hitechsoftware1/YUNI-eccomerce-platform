
'use server';

import { revalidatePath } from 'next/cache';
import { db } from './db';
import type { HomepageSection } from './types';
import { addAdminNotification } from './notification-actions';
import type { SectionType } from './types';

// This function is for reordering and toggling visibility from the main list
export async function updateHomepageLayout(sections: HomepageSection[]) {
  // Overwrite the in-memory array with the new configuration
  db.homepageSections.length = 0;
  // Re-assign order based on the new array sequence
  const orderedSections = sections.map((section, index) => ({
    ...section,
    order: index + 1,
  }));
  db.homepageSections.push(...orderedSections);

  await addAdminNotification({
    title: 'Homepage Layout Updated',
    description: `The homepage sections have been saved.`,
    href: `/admin/homepage`
  });
  
  // Revalidate both the homepage and the admin page to reflect changes
  revalidatePath('/');
  revalidatePath('/admin/homepage');
}

// Data for the form
export type SectionFormValues = {
  type: SectionType;
  title: string;
  productSource?: string;
};

export async function addHomepageSection(data: SectionFormValues) {
    const newSection: HomepageSection = {
        id: `sec-${Date.now()}`,
        type: data.type,
        title: data.title,
        enabled: true,
        order: db.homepageSections.length + 1,
        productSource: data.type === 'ProductSection' ? data.productSource as any : undefined,
    };

    db.homepageSections.push(newSection);

    await addAdminNotification({
        title: 'Homepage Section Added',
        description: `Section "${newSection.title}" was added to the homepage.`,
        href: '/admin/homepage'
    });

    revalidatePath('/');
    revalidatePath('/admin/homepage');
    return newSection;
}

export async function updateHomepageSection(id: string, data: SectionFormValues): Promise<HomepageSection | undefined> {
    const sectionIndex = db.homepageSections.findIndex(s => s.id === id);
    if (sectionIndex === -1) {
        throw new Error("Section not found");
    }

    const existingSection = db.homepageSections[sectionIndex];
    const updatedSection: HomepageSection = {
        ...existingSection,
        title: data.title,
        type: data.type,
        productSource: data.type === 'ProductSection' ? data.productSource as any : undefined,
    };

    db.homepageSections[sectionIndex] = updatedSection;

    await addAdminNotification({
        title: 'Homepage Section Updated',
        description: `Section "${updatedSection.title}" was updated.`,
        href: '/admin/homepage'
    });

    revalidatePath('/');
    revalidatePath('/admin/homepage');
    return updatedSection;
}


export async function deleteHomepageSection(id: string) {
    const sectionIndex = db.homepageSections.findIndex(s => s.id === id);
    if (sectionIndex === -1) {
        throw new Error("Section not found");
    }
    const [deletedSection] = db.homepageSections.splice(sectionIndex, 1);
    
    // Re-order remaining sections
    db.homepageSections.forEach((section, index) => {
        section.order = index + 1;
    });

    await addAdminNotification({
        title: 'Homepage Section Deleted',
        description: `Section "${deletedSection.title}" was deleted.`,
        href: '/admin/homepage'
    });

    revalidatePath('/');
    revalidatePath('/admin/homepage');
}
