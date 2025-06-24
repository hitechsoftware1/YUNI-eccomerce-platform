"use client";

import { Phone, Mail, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

export function HelpButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-lg md:bottom-4"
          aria-label="Help"
        >
          <HelpCircle className="h-7 w-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
          <DialogDescription>
            How can we help you today? Choose an option below to get in touch with our team.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button asChild size="lg">
            <a href="tel:+256740522738" className="flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Call Us
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://wa.me/256740522738" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <WhatsappIcon className="h-5 w-5 fill-current text-green-500" />
              Chat on WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="mailto:support@yuni.com" className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              Send an Email
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
