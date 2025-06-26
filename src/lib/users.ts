
import type { ManagedUser } from './types';

export let allUsers: ManagedUser[] = [
  { id: 'user-1', name: 'Olivia Martin', email: 'olivia.martin@email.com', role: 'Admin', status: 'Active', lastLogin: '2024-05-20T10:00:00Z' },
  { id: 'user-2', name: 'Jackson Lee', email: 'jackson.lee@email.com', role: 'Buyer', status: 'Active', lastLogin: '2024-05-19T14:30:00Z' },
  { id: 'user-3', name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', role: 'Buyer', status: 'Banned', lastLogin: '2024-05-18T09:15:00Z' },
  { id: 'user-4', name: 'William Kim', email: 'will@email.com', role: 'Admin', status: 'Active', lastLogin: '2024-05-20T11:45:00Z' },
  { id: 'user-5', name: 'Sofia Davis', email: 'sofia.davis@email.com', role: 'Seller', status: 'Active', lastLogin: '2024-05-17T20:00:00Z' },
  { id: 'user-6', name: 'Hitech Software', email: 'hitechsoftware03@gmail.com', role: 'Admin', status: 'Active', lastLogin: '2024-05-20T12:00:00Z' },
  { id: 'user-7', name: 'John Doe', email: 'john.doe@example.com', role: 'Buyer', status: 'Active', lastLogin: '2024-05-15T08:00:00Z' },
  { id: 'user-8', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Seller', status: 'Pending Approval', lastLogin: '2024-05-16T18:20:00Z' },
];

export function getUsers(): ManagedUser[] {
  return allUsers;
}

export function getUserById(id: string): ManagedUser | undefined {
    return allUsers.find(user => user.id === id);
}
