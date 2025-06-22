"use client";

import * as React from "react";
import Link from "next/link";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth-modal";

export function BottomNav() {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

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
            variant="ghost"
            className="inline-flex flex-col items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <ShoppingCart className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Cart</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setIsAuthModalOpen(true)}
            className="inline-flex flex-col items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <User className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">Account</span>
          </Button>
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  );
}
