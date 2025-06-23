'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { LayoutDashboard, ShoppingBag, Package, Users, LogOut, Package2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Toaster } from '@/components/ui/toaster';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, loading, logOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/');
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const getPageTitle = () => {
    if (pathname === '/admin/dashboard') return 'Dashboard';
    if (pathname.startsWith('/admin/products')) return 'Products';
    if (pathname.startsWith('/admin/orders')) return 'Orders';
    if (pathname.startsWith('/admin/customers')) return 'Customers';
    return 'Admin';
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Package2 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-primary">YUNI Admin</h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/admin/dashboard" isActive={pathname === '/admin/dashboard'}>
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="/admin/products" isActive={pathname.startsWith('/admin/products')}>
                <Package />
                Products
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <ShoppingBag />
                Orders
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton disabled>
                <Users />
                Customers
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
             <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || ''} />
                <AvatarFallback>
                    {getInitials(currentUser.displayName || currentUser.email)}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-sm truncate">{currentUser.displayName || 'Admin User'}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
            </div>
            <SidebarMenuButton variant="ghost" size="icon" onClick={logOut}>
                <LogOut />
            </SidebarMenuButton>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 bg-background/80 backdrop-blur-sm p-2 flex items-center gap-2 border-b">
           <SidebarTrigger className="md:hidden" />
           <h2 className="font-semibold">{getPageTitle()}</h2>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
