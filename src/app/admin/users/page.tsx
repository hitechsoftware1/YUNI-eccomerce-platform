
import { getUsers } from "@/lib/users";
import { UsersClient } from "./components/users-client";
import type { ManagedUser } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function UsersPage() {
  const users: ManagedUser[] = getUsers();
  return <UsersClient users={users} />;
}
