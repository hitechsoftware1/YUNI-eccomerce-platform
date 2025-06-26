
'use server';

import { revalidatePath } from 'next/cache';
import { allUsers } from './users';
import type { ManagedUser } from './types';

export async function updateUserRole(userId: string, role: ManagedUser['role']) {
  const userIndex = allUsers.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  allUsers[userIndex].role = role;
  revalidatePath('/admin/users');
  return allUsers[userIndex];
}

export async function updateUserStatus(userId: string, status: ManagedUser['status']) {
  const userIndex = allUsers.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  allUsers[userIndex].status = status;
  revalidatePath('/admin/users');
  return allUsers[userIndex];
}
