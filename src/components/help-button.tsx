"use client";

import * as React from "react";
import { HelpCircle, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";
import { WhatsappIcon } from "./icons/whatsapp-icon";

export function HelpButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-lg md:bottom-4"
        onClick={() => setIsOpen(true)}
        aria-label="Help"
      >
        <HelpCircle className="h-7 w-7" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Need Help?</DialogTitle>
            <DialogDescription>
              Our customer support team is here for you.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button asChild className="w-full justify-start" size="lg">
              <a href="tel:+256740522738">
                <Phone className="mr-4" /> Call Us (+256 740 522738)
              </a>
            </Button>
            <Button asChild className="w-full justify-start" size="lg" variant="secondary">
               <a href="https://wa.me/256740522738" target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="mr-4" /> Chat on WhatsApp
              </a>
            </Button>
             <Button asChild className="w-full justify-start" size="lg" variant="secondary">
              <Link href="/contact">
                <MessageSquare className="mr-4" /> Send us a message
              </Link>
            </Button>
          </div>
          <DialogFooter className="text-sm text-muted-foreground">
            Support is available 24/7.
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
