

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
  const oldStatus = user.status;
  user.status = status;

  // If rejecting, also set role back to Buyer
  if (status === 'Rejected') {
      user.role = 'Buyer';
  }

  persistDb();

  let notificationDescription = `User ${user.name}'s status is now ${status}.`;

  if (oldStatus === 'Pending Approval' && status === 'Active') {
      notificationDescription = `Seller application for ${user.name} has been approved.`;
  } else if (oldStatus === 'Pending Approval' && status === 'Rejected') {
      notificationDescription = `Seller application for ${user.name} has been rejected.`;
  } else if (status === 'Banned') {
      notificationDescription = `User ${user.name} has been banned.`;
  } else if (oldStatus === 'Banned' && status === 'Active') {
      notificationDescription = `User ${user.name} has been unbanned.`;
  }


  await addAdminNotification({
    title: 'User Status Updated',
    description: notificationDescription,
    href: `/admin/users`
  });

  revalidatePath('/admin/users');
  revalidatePath('/admin/sellers');
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
