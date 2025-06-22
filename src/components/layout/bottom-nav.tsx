
"use client";

import * as React from "react";
import Link from "next/link";
import { Home, LayoutGrid, ShoppingCart, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth-modal";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { Badge } from "@/components/ui/badge";

export function BottomNav() {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const { itemCount } = useCart();
  const { currentUser } = useAuth();

  const AccountButton = () => {
    if (currentUser) {
      return (
        <Button
          asChild
          variant="ghost"
          className="inline-flex flex-col items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Link href="/account">
            <LayoutDashboard className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Account</span>
          </Link>
        </Button>
      );
    }
    return (
      <Button
        variant="ghost"
        onClick={() => setIsAuthModalOpen(true)}
        className="inline-flex flex-col items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <User className="h-6 w-6 mb-1" />
        <span className="text-xs font-medium">Account</span>
      </Button>
    );
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card p-2 md:hidden">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
          <Button
            asChild
            variant="ghost"
            className="inline-flex flex-col items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Link href="/">
              <Home className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Home</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="inline-flex flex-col items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <LayoutGrid className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Categories</span>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="inline-flex relative flex-col items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Cart</span>
              {itemCount > 0 && (
                <Badge variant="destructive" className="absolute top-0 right-4 h-5 w-5 flex items-center justify-center p-0">{itemCount}</Badge>
              )}
            </Link>
          </Button>
          <AccountButton />
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  );
}
