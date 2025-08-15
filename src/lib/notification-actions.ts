
'use server';

import { revalidatePath } from 'next/cache';
import type { Notification } from './types';
import { db, persistDb } from './db';

// This is a helper function used by other server actions, not an action itself.
export async function addAdminNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
        ...notification,
        id: `notif-${Date.now()}-${Math.floor(Math.random() * 100)}`,
        timestamp: new Date().toISOString(),
        read: false,
    };
    db.allNotifications.unshift(newNotification);
    if (db.allNotifications.length > 30) {
        db.allNotifications = db.allNotifications.slice(0, 30);
    }
    persistDb();
    // Revalidate the layout path to trigger a refetch of notifications on the client
    revalidatePath('/admin', 'layout');
}

export async function getNotificationsAction(): Promise<Notification[]> {
  return db.allNotifications;
}

export async function markAllAsReadAction(): Promise<void> {
  db.allNotifications.forEach(n => { n.read = true; });
  persistDb();
  revalidatePath('/admin', 'layout');
}
