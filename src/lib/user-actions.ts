
'use server';

import { revalidatePath } from 'next/cache';
import { db, persistDb } from './db';
import type { ManagedUser } from './types';
import { addAdminNotification } from './notification-actions';

export async function updateUserRole(userId: string, role: ManagedUser['role']) {
  const userIndex = db.users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  const user = db.users[userIndex];
  user.role = role;
  persistDb();
  
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
  persistDb();

  await addAdminNotification({
    title: 'User Status Updated',
    description: `User ${user.name} is now ${status}.`,
    href: `/admin/users`
  });

  revalidatePath('/admin/users');
  return user;
}


export async function applyToBeSeller(userId: string) {
    const userIndex = db.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    const user = db.users[userIndex];
    if (user.role === 'Seller' || user.status === 'Pending Approval') {
        throw new Error('You have already applied or are already a seller.');
    }

    user.status = 'Pending Approval';
    user.role = 'Seller'; // Set role to seller, but status keeps them restricted
    persistDb();

    await addAdminNotification({
        title: 'New Seller Application',
        description: `${user.name} has applied to become a seller.`,
        href: '/admin/users'
    });

    revalidatePath('/admin/users');
    revalidatePath('/become-a-seller');
    return user;
}
