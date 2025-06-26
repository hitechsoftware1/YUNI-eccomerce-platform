
import { getNotificationsAction } from '@/lib/notification-actions';
import { AdminLayoutClient } from './layout-client';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notifications = await getNotificationsAction();
  return (
    <AdminLayoutClient notifications={notifications}>
      {children}
    </AdminLayoutClient>
  );
}
