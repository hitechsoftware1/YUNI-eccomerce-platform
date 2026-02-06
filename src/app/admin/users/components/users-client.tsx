

'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersTable } from "./users-table";
import { BanUserDialog } from './ban-user-dialog';
import { RejectUserDialog } from './reject-user-dialog';
import { useToast } from '@/hooks/use-toast';
import type { ManagedUser } from '@/lib/types';
import { updateUserRole, updateUserStatus } from '@/lib/user-actions';

interface UsersClientProps {
    users: ManagedUser[];
}

export function UsersClient({ users: initialUsers }: UsersClientProps) {
  const [users, setUsers] = React.useState<ManagedUser[]>(initialUsers);
  const [userToBan, setUserToBan] = React.useState<ManagedUser | null>(null);
  const [isBanning, setIsBanning] = React.useState(false);
  const [userToReject, setUserToReject] = React.useState<ManagedUser | null>(null);
  const [isRejecting, setIsRejecting] = React.useState(false);
  const { toast } = useToast();
  
  React.useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleBanClick = (user: ManagedUser) => {
    setUserToBan(user);
  };

  const handleRejectClick = (user: ManagedUser) => {
    setUserToReject(user);
  };
  
  // Optimistic update handler for status changes
  const handleStatusUpdate = async (userToUpdate: ManagedUser, newStatus: ManagedUser['status']) => {
    const originalUsers = [...users];
    
    // Optimistically update UI
    const updatedUsers = users.map(u =>
      u.id === userToUpdate.id 
        ? { ...u, status: newStatus, ...(newStatus === 'Rejected' && { role: 'Buyer' as const }) } 
        : u
    );
    setUsers(updatedUsers);

    // Call server action
    try {
      await updateUserStatus(userToUpdate.id, newStatus);
      
      let description = `User ${userToUpdate.name}'s status is now ${newStatus}.`;
      if (newStatus === 'Active' && userToUpdate.status === 'Pending Approval') {
          description = `Seller application for ${userToUpdate.name} has been approved.`;
      }
      toast({ title: 'Status Updated', description });

    } catch (error) {
      // Revert on error
      setUsers(originalUsers); 
      toast({ title: 'Error', description: 'Failed to update user status.', variant: 'destructive' });
    }
  };

  // Optimistic update handler for role changes
  const handleRoleUpdate = async (userId: string, newRole: ManagedUser['role']) => {
      const originalUsers = [...users];
      const updatedUsers = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
      setUsers(updatedUsers);

      try {
          await updateUserRole(userId, newRole);
          toast({ title: 'Role Updated', description: `User role has been changed to ${newRole}.` });
      } catch (error) {
          setUsers(originalUsers);
          toast({ title: 'Error', description: 'Failed to update user role.', variant: 'destructive' });
      }
  };


  const handleConfirmBan = async () => {
    if (!userToBan) return;
    setIsBanning(true);
    await handleStatusUpdate(userToBan, 'Banned');
    setIsBanning(false);
    setUserToBan(null);
  };

  const handleConfirmReject = async () => {
    if (!userToReject) return;
    setIsRejecting(true);
    await handleStatusUpdate(userToReject, 'Rejected');
    setIsRejecting(false);
    setUserToReject(null);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage your users, their roles, and access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable 
            users={users} 
            onBanClick={handleBanClick} 
            onRejectClick={handleRejectClick}
            onRoleChange={handleRoleUpdate}
            onStatusChange={handleStatusUpdate}
          />
        </CardContent>
      </Card>
      {userToBan && (
        <BanUserDialog
            isOpen={!!userToBan}
            onOpenChange={(isOpen) => !isOpen && setUserToBan(null)}
            onConfirm={handleConfirmBan}
            isBanning={isBanning}
            userName={userToBan.name}
        />
      )}
      {userToReject && (
        <RejectUserDialog
            isOpen={!!userToReject}
            onOpenChange={(isOpen) => !isOpen && setUserToReject(null)}
            onConfirm={handleConfirmReject}
            isRejecting={isRejecting}
            userName={userToReject.name}
        />
      )}
    </div>
  )
}
