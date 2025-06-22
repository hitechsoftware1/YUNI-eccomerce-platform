"use client";

import * as React from "react";
import { HelpCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function HelpButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-24 right-4 z-50 h-14 w-14 rounded-full shadow-lg md:bottom-4"
        aria-label="Open help menu"
        onClick={() => setIsOpen(true)}
      >
        <HelpCircle className="h-7 w-7" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">
              Help & Support
            </DialogTitle>
            <DialogDescription>
              Find answers to your questions or get in touch with us.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h3 className="mb-4 text-lg font-semibold">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  You can track your order from the "My Orders" section in your account page once you are logged in. We will also send you an email with tracking information once your order ships.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We offer a 30-day return policy for most items. Please visit our Returns & Refunds page for detailed information on how to initiate a return.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout for faster delivery.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="border-t pt-4">
             <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
             <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">+256740522738</span>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-foreground">support@yuni.com</span>
                </div>
             </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
