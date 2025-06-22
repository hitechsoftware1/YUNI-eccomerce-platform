"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

// Define the interface for the BeforeInstallPromptEvent
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPwaBanner() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);

  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setDeferredPrompt(null);
  };

  if (!deferredPrompt || window.matchMedia('(display-mode: standalone)').matches) {
    return null;
  }

  return (
    <div
      className="fixed bottom-16 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md md:rounded-lg"
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Download className="h-8 w-8 text-primary" />
          <div>
            <h4 className="font-bold font-headline">Get the YUNI App</h4>
            <p className="text-sm text-gray-300">
              For a faster, better shopping experience.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleInstallClick}>Install</Button>
          <Button variant="ghost" size="icon" onClick={handleDismiss} className="text-gray-400 hover:text-white hover:bg-gray-700 h-8 w-8">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
