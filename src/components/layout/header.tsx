
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  ShoppingBag,
  X,
  LayoutDashboard,
  Heart,
  LayoutGrid,
  Package,
  Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthModal } from "@/components/auth-modal";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { Badge } from "@/components/ui/badge";
import { isAdmin } from "@/lib/admins";
import { Separator } from "@/components/ui/separator";

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { itemCount } = useCart();
  const { currentUser } = useAuth();
  const router = useRouter();
  const isUserAdmin = isAdmin(currentUser?.email);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      if (isMobileSearchOpen) {
        setIsMobileSearchOpen(false);
      }
    }
  };

  const AccountButton = () => {
    if (currentUser) {
      return (
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <Link href="/account">
            <LayoutDashboard className="h-5 w-5" />
            Account
          </Link>
        </Button>
      );
    }
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsAuthModalOpen(true)}
        className="flex items-center gap-2"
      >
        <User className="h-5 w-5" />
        Account
      </Button>
    );
  };

  const MobileAccountButton = ({ closeSheet }: { closeSheet?: () => void }) => {
    const handleClick = () => {
      if (!currentUser) {
        setIsAuthModalOpen(true);
      }
      if (closeSheet) closeSheet();
    };

    if (currentUser) {
      return (
        <Button asChild variant="ghost" className="justify-start">
          <Link href="/account" onClick={handleClick} className="w-full">
            <LayoutDashboard className="mr-2 h-5 w-5" />
            My Account
          </Link>
        </Button>
      );
    }
    return (
      <Button variant="ghost" onClick={handleClick} className="justify-start w-full">
        <User className="mr-2 h-5 w-5" />
        Login / Register
      </Button>
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-sm shadow-sm">
        <div className={`container mx-auto flex h-16 items-center justify-between px-2 sm:px-4 md:h-20 md:px-6 transition-opacity duration-300 ${isMobileSearchOpen ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-7 w-7 text-primary" />
              <span className="text-2xl font-bold font-headline text-primary">
                YUNI
              </span>
            </Link>
          </div>

          <div className="hidden flex-1 justify-center px-8 sm:flex">
            <div className="relative w-full max-w-lg">
              <Input
                type="search"
                placeholder="Search products, brands and categories"
                className="h-10 w-full rounded-full border-primary/50 bg-transparent pl-10 pr-4 focus:border-primary focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <AccountButton />
            <Button asChild variant="ghost" size="sm" className="flex items-center gap-2 relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                Cart
                {itemCount > 0 && (
                   <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">{itemCount}</Badge>
                )}
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-1 sm:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileSearchOpen(true)}>
              <Search className="h-6 w-6" />
              <span className="sr-only">Toggle Search</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                {( {close} ) => (
                    <div className="flex flex-col p-4">
                      <Link
                          href="/"
                          className="mb-4 flex items-center gap-2 text-lg font-bold"
                          onClick={close}
                      >
                          <ShoppingBag className="h-6 w-6 text-primary" />
                          <span className="text-xl font-bold font-headline text-primary">
                          YUNI
                          </span>
                      </Link>
                      <nav className="flex flex-col gap-1">
                        <MobileAccountButton closeSheet={close} />
                        
                        {currentUser && (
                          <Button asChild variant="ghost" className="justify-start">
                              <Link href="/account#order-history" onClick={close}>
                                  <Package className="mr-2 h-5 w-5" />
                                  My Orders
                              </Link>
                          </Button>
                        )}

                        <Button asChild variant="ghost" className="justify-start">
                          <Link href="/wishlist" onClick={close}>
                            <Heart className="mr-2 h-5 w-5" />
                            Wishlist
                          </Link>
                        </Button>
                        
                        <Button asChild variant="ghost" className="justify-start">
                          <Link href="/#categories" onClick={close}>
                            <LayoutGrid className="mr-2 h-5 w-5" />
                            Categories
                          </Link>
                        </Button>
                        
                        <Button asChild variant="ghost" className="justify-start relative">
                            <Link href="/cart" onClick={close}>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Cart
                                {itemCount > 0 && (
                                    <Badge variant="destructive" className="ml-auto">{itemCount}</Badge>
                                )}
                            </Link>
                        </Button>

                        <Separator className="my-2" />

                        <Button asChild variant="ghost" className="justify-start">
                          <Link href="/become-a-seller" onClick={close}>
                            <Store className="mr-2 h-5 w-5" />
                            Become a Seller
                          </Link>
                        </Button>

                        {isUserAdmin && (
                           <Button asChild variant="ghost" className="justify-start">
                              <Link href="/admin/dashboard" onClick={close}>
                                  <LayoutDashboard className="mr-2 h-5 w-5" />
                                  Admin Dashboard
                              </Link>
                          </Button>
                        )}
                      </nav>
                    </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile search overlay */}
        <div className={`absolute inset-0 bg-background transition-opacity duration-300 sm:hidden ${isMobileSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="container mx-auto flex h-full items-center gap-2 px-2 sm:px-4">
            <div className="relative w-full">
              <Input
                autoFocus
                type="search"
                placeholder="Search..."
                className="h-10 w-full rounded-full border-primary/50 bg-transparent pl-10 pr-4 focus:border-primary focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileSearchOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close Search</span>
            </Button>
          </div>
        </div>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  );
}
