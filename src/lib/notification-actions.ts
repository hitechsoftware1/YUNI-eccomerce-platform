'use server';

import { revalidatePath } from 'next/cache';
import type { Notification } from './types';

// This file simulates a "database" for notifications
let allNotifications: Notification[] = [];

// This is a helper function used by other server actions, not an action itself.
export function addAdminNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
        ...notification,
        id: `notif-${Date.now()}-${Math.floor(Math.random() * 100)}`,
        timestamp: new Date().toISOString(),
        read: false,
    };
    allNotifications.unshift(newNotification);
    if (allNotifications.length > 30) {
        allNotifications = allNotifications.slice(0, 30);
    }
    // Revalidate the layout path to trigger a refetch of notifications on the client
    revalidatePath('/admin', 'layout');
}

export async function getNotificationsAction(): Promise<Notification[]> {
  return allNotifications;
}

export async function markAllAsReadAction(): Promise<void> {
  allNotifications.forEach(n => { n.read = true; });
  revalidatePath('/admin', 'layout');
}
