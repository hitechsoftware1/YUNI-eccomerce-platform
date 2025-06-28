
'use server';

import { revalidatePath } from 'next/cache';
import { db } from './db';
import type { ManagedUser } from './types';
import { addAdminNotification } from './notification-actions';

export async function updateUserRole(userId: string, role: ManagedUser['role']) {
  const userIndex = db.users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  const user = db.users[userIndex];
  user.role = role;
  
  await addAdminNotification({
    title: 'User Role Changed',
    description: `User ${user.name}'s role is now ${role}.`,
    href: `/admin/users`
  });

  revalidatePath('/admin/users');
  return user;
}

export async function updateUserStatus(userId: string, status: ManagedUser['status']) {
  const userIndex = db.users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  const user = db.users[userIndex];
  user.status = status;

  await addAdminNotification({
    title: 'User Status Updated',
    description: `User ${user.name} is now ${status}.`,
    href: `/admin/users`
  });

  revalidatePath('/admin/users');
  return user;
}
