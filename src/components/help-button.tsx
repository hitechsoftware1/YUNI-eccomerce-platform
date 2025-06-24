"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HelpButton() {
  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-lg md:bottom-4"
      aria-label="Call support"
    >
      <a href="tel:+256740522738">
        <Phone className="h-7 w-7" />
      </a>
    </Button>
  );
}
