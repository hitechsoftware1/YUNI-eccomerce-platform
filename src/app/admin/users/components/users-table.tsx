
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, UserX, UserCheck, Shield, ShoppingBag, User as UserIcon } from 'lucide-react';
import type { ManagedUser } from '@/lib/types';
import { cn } from "@/lib/utils";
import { updateUserRole, updateUserStatus } from '@/lib/user-actions';
import { useToast } from '@/hooks/use-toast';

interface UsersTableProps {
  users: ManagedUser[];
  onBanClick: (user: ManagedUser) => void;
}

export function UsersTable({ users, onBanClick }: UsersTableProps) {
    const router = useRouter();
    const { toast } = useToast();

    const handleRoleChange = async (userId: string, role: ManagedUser['role']) => {
        try {
            await updateUserRole(userId, role);
            toast({ title: 'Role Updated', description: `User role has been changed to ${role}.` });
            router.refresh();
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to update user role.', variant: 'destructive' });
        }
    }

    const handleStatusToggle = async (user: ManagedUser) => {
        const newStatus = user.status === 'Active' ? 'Banned' : 'Active';
        if (newStatus === 'Banned') {
            onBanClick(user);
            return;
        }

        try {
            await updateUserStatus(user.id, newStatus);
            toast({ title: 'Status Updated', description: `User is now ${newStatus}.` });
            router.refresh();
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to update user status.', variant: 'destructive' });
        }
    }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Last Login</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
            <TableCell>
                 <Badge variant="secondary" className="capitalize flex gap-1.5 w-fit">
                    {user.role === 'Admin' && <Shield className="h-3 w-3" />}
                    {user.role === 'Seller' && <ShoppingBag className="h-3 w-3" />}
                    {user.role === 'Buyer' && <UserIcon className="h-3 w-3" />}
                    {user.role}
                 </Badge>
            </TableCell>
            <TableCell>
                <Badge variant={user.status === 'Banned' ? 'destructive' : 'outline'} className={cn('capitalize', user.status === 'Active' && 'border-green-500 text-green-600')}>
                    {user.status}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {new Date(user.lastLogin).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Change Role</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={user.role} onValueChange={(value) => handleRoleChange(user.id, value as ManagedUser['role'])}>
                            <DropdownMenuRadioItem value="Admin">Admin</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Seller">Seller</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Buyer">Buyer</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuItem
                    className={cn(user.status === 'Active' ? "text-destructive focus:text-destructive" : "text-green-600 focus:text-green-700")}
                    onClick={() => handleStatusToggle(user)}
                  >
                    {user.status === 'Active' ? <UserX className="mr-2 h-4 w-4" /> : <UserCheck className="mr-2 h-4 w-4" />}
                    {user.status === 'Active' ? 'Ban User' : 'Unban User'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
