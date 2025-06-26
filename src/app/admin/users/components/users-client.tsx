
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersTable } from "./users-table";
import { BanUserDialog } from './ban-user-dialog';
import { useToast } from '@/hooks/use-toast';
import type { ManagedUser } from '@/lib/types';
import { updateUserStatus } from '@/lib/user-actions';

interface UsersClientProps {
    users: ManagedUser[];
}

export function UsersClient({ users: initialUsers }: UsersClientProps) {
  const [users, setUsers] = React.useState<ManagedUser[]>(initialUsers);
  const [userToBan, setUserToBan] = React.useState<ManagedUser | null>(null);
  const [isBanning, setIsBanning] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  React.useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleBanClick = (user: ManagedUser) => {
    setUserToBan(user);
  };

  const handleConfirmBan = async () => {
    if (!userToBan) return;

    setIsBanning(true);
    try {
      await updateUserStatus(userToBan.id, 'Banned');
      toast({
        title: 'User Banned',
        description: `User "${userToBan.name}" has been successfully banned.`,
      });
      setUserToBan(null);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to ban user. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsBanning(false);
    }
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
          <UsersTable users={users} onBanClick={handleBanClick} />
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
    </div>
  )
}
