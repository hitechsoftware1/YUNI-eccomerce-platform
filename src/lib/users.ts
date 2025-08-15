
import type { ManagedUser } from './types';
import { db, persistDb } from './db';

export function getUsers(): ManagedUser[] {
  return db.users;
}

export function getUserById(id: string): ManagedUser | undefined {
    return db.users.find(user => user.id === id);
}

export function addUser(user: ManagedUser): void {
  const existingUser = db.users.find(u => u.id === user.id);
  if (!existingUser) {
    db.users.push(user);
    persistDb();
  }
}
