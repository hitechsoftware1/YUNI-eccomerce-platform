"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  ShoppingBag,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthModal } from "@/components/auth-modal";

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-sm shadow-sm">
        <div className={`container mx-auto flex h-16 items-center justify-between px-4 transition-opacity duration-300 md:h-20 md:px-6 ${isMobileSearchOpen ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-7 w-7 text-primary" />
              <span className="text-2xl font-bold font-headline text-primary">
                YUNI
              </span>
            </Link>
          </div>

          <div className="hidden flex-1 justify-center px-8 md:flex">
            <div className="relative w-full max-w-lg">
              <Input
                type="search"
                placeholder="Search products, brands and categories"
                className="h-10 w-full rounded-full border-primary/50 bg-transparent pl-10 pr-4 focus:border-primary focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2"
            >
              <User className="h-5 w-5" />
              Account
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart
            </Button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
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
                <div className="flex flex-col gap-6 p-6">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-bold"
                  >
                    <ShoppingBag className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold font-headline text-primary">
                      YUNI
                    </span>
                  </Link>
                  <nav className="flex flex-col gap-4 mt-8">
                    <Button
                      variant="ghost"
                      onClick={() => setIsAuthModalOpen(true)}
                      className="flex items-center justify-start gap-2"
                    >
                      <User className="h-5 w-5" />
                      Account
                    </Button>
                    <Button variant="ghost" className="flex items-center justify-start gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Cart
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile search overlay */}
        <div className={`absolute inset-0 bg-background transition-opacity duration-300 md:hidden ${isMobileSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="container mx-auto flex h-full items-center gap-2 px-4">
            <div className="relative w-full">
              <Input
                autoFocus
                type="search"
                placeholder="Search..."
                className="h-10 w-full rounded-full border-primary/50 bg-transparent pl-10 pr-4 focus:border-primary focus:ring-primary"
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
