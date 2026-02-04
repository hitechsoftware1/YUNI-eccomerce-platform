'use client';

import * as React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getUserByIdAction } from '@/lib/user-actions';
import type { ManagedUser } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { AdminDashboardView } from '@/components/admin/admin-dashboard-view';
import { SellerDashboardView } from '@/components/admin/seller-dashboard-view';


export default function DashboardPage() {
    const { currentUser, loading: authLoading } = useAuth();
    const [user, setUser] = React.useState<ManagedUser | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUserData = async () => {
            if (authLoading) return;
            if (!currentUser) {
                setLoading(false);
                return;
            }
            const userData = await getUserByIdAction(currentUser.uid);
            setUser(userData || null);
            setLoading(false);
        }
        fetchUserData();
    }, [currentUser, authLoading]);

    if (loading || authLoading) {
        return (
            <div className="flex flex-col gap-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                    <Skeleton className="h-96" />
                    <Skeleton className="h-96" />
                </div>
            </div>
        );
    }

    if (user?.role === 'Admin') {
        return <AdminDashboardView />;
    }

    if (user?.role === 'Seller') {
        return <SellerDashboardView user={user} />;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">You do not have the required role to view this dashboard.</p>
        </div>
    );
}
