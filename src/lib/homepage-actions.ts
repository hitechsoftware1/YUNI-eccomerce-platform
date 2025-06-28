
'use server';

import { revalidatePath } from 'next/cache';
import { homepageSectionsData } from './homepage-sections';
import type { HomepageSection } from './types';
import { addAdminNotification } from './notification-actions';

export async function updateHomepageSections(sections: HomepageSection[]) {
  // Overwrite the in-memory array with the new configuration
  homepageSectionsData.length = 0;
  // Re-assign order based on the new array sequence
  const orderedSections = sections.map((section, index) => ({
    ...section,
    order: index + 1,
  }));
  homepageSectionsData.push(...orderedSections);

  await addAdminNotification({
    title: 'Homepage Layout Updated',
    description: `The homepage sections have been saved.`,
    href: `/admin/homepage`
  });
  
  // Revalidate both the homepage and the admin page to reflect changes
  revalidatePath('/');
  revalidatePath('/admin/homepage');
}
