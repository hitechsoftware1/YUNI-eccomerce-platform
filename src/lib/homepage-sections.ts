
import type { HomepageSection } from '@/lib/types';
import { db } from './db';

export function getHomepageSections() {
  return db.homepageSections.sort((a, b) => a.order - b.order);
}

export function getHomepageSectionById(id: string) {
  return db.homepageSections.find(s => s.id === id);
}
