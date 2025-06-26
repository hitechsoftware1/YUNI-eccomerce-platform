
'use client';

import * as React from 'react';
import Link from 'next/link';
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
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  LogOut, 
  Package2, 
  Home,
  Search,
  Bell,
  User,
  ImageIcon,
  AppWindow,
  GalleryHorizontal,
  Store,
  Settings,
  ShieldCheck,
  CreditCard,
  Palette,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Toaster } from '@/components/ui/toaster';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { isAdmin } from '@/lib/admins';
import { useToast } from '@/hooks/use-toast';
import { markAllAsReadAction } from '@/lib/notification-actions';
import type { Notification } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

export function AdminLayoutClient({
  notifications: initialNotifications,
  children,
}: {
  notifications: Notification[];
  children: React.ReactNode;
}) {
  const { currentUser, loading, logOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = React.useState(initialNotifications);

  React.useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  const unreadCount = React.useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const handleOpenChange = async (open: boolean) => {
    // When the menu is closed and there are unread items, mark them as read
    if (!open && unreadCount > 0) {
      // Optimistic update on the client
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      await markAllAsReadAction();
    }
  };

  React.useEffect(() => {
    if (loading) return;

    if (!currentUser) {
      router.push('/');
      return;
    }

    if (!isAdmin(currentUser.email)) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to view this page.',
        variant: 'destructive',
      });
      router.push('/');
    }
  }, [currentUser, loading, router, toast]);

  if (loading || !currentUser || !isAdmin(currentUser.email)) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p>Loading or redirecting...</p>
      </div>
    );
  }
  
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package2 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-primary">YUNI Admin</h1>
            </div>
            <SidebarMenuButton asChild variant="ghost" size="icon" tooltip="View Site">
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <Home />
              </Link>
            </SidebarMenuButton>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-0">
            <SidebarGroup>
                <SidebarGroupLabel>Dashboards</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/admin/dashboard'}>
                        <Link href="/admin/dashboard">
                        <LayoutDashboard />
                        Dashboard
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>Content</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/banners')}>
                        <Link href="/admin/banners">
                        <ImageIcon />
                        Hero Banners
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/promocards')}>
                        <Link href="/admin/promocards">
                        <AppWindow />
                        Promo Cards
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/promobanners')}>
                        <Link href="/admin/promobanners">
                        <GalleryHorizontal />
                        Promo Banners
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
                <SidebarGroupLabel>Management</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/products')}>
                        <Link href="/admin/products">
                        <Package />
                        Products
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/orders')}>
                        <Link href="/admin/orders">
                        <ShoppingBag />
                        Orders
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/users')}>
                        <Link href="/admin/users">
                            <Users />
                            Users
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/sellers')}>
                        <Link href="/admin/sellers">
                            <Store />
                            Sellers
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3">
             <Button variant="ghost" className="w-full justify-start gap-2" onClick={logOut}>
                <LogOut />
                Logout
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
           <SidebarTrigger className="sm:hidden" />
           <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <div className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
                    )}
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[350px]">
                <div className="flex items-center justify-between p-2">
                    <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <span className="text-xs font-medium text-primary">{unreadCount} new</span>
                    )}
                </div>
                <DropdownMenuSeparator />
                <ScrollArea className="h-auto max-h-[400px]">
                    {notifications.length > 0 ? (
                    notifications.map(n => (
                        <DropdownMenuItem key={n.id} asChild className="cursor-pointer">
                        <Link href={n.href || '#'} className={cn(
                            "flex flex-col items-start gap-0.5 p-2 whitespace-normal focus:bg-accent",
                            !n.read && "bg-accent/50"
                        )}>
                            <p className="font-semibold text-sm">{n.title}</p>
                            <p className="text-sm text-muted-foreground">{n.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })}
                            </p>
                        </Link>
                        </DropdownMenuItem>
                    ))
                    ) : (
                    <div className="text-center text-sm text-muted-foreground p-4">
                        You're all caught up!
                    </div>
                    )}
                </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || 'User'} />
                        <AvatarFallback>{getInitials(currentUser.displayName || currentUser.email)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/account">Profile</Link></DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem asChild><Link href="/account#appearance"><Palette className="mr-2 h-4 w-4" />Appearance</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/account#login-security"><ShieldCheck className="mr-2 h-4 w-4" />Login & Security</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/account#payment-methods"><CreditCard className="mr-2 h-4 w-4" />Payment Methods</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/account#notification-preferences"><Bell className="mr-2 h-4 w-4" />Notifications</Link></DropdownMenuItem>
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
