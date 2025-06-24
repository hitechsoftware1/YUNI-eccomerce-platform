
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, X, Share, PlusSquare } from "lucide-react";

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
  const [showBanner, setShowBanner] = React.useState(false);
  const [isIos, setIsIos] = React.useState(false);

  React.useEffect(() => {
    // This effect should only run on the client.
    if (typeof window === 'undefined') {
      return;
    }

    // Don't show the banner if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    // Check for iOS
    const isDeviceIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIos(isDeviceIos);

    if (isDeviceIos) {
      const dismissed = sessionStorage.getItem('ios-install-prompt-dismissed') === 'true';
      if (!dismissed) {
        setShowBanner(true);
      }
    } else {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }
    
    return () => {
      if (!isDeviceIos) {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
        setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    if (isIos) {
      sessionStorage.setItem('ios-install-prompt-dismissed', 'true');
    }
  };

  if (!showBanner) {
    return null;
  }

  // iOS-specific banner
  if (isIos && !deferredPrompt) {
     return (
      <div
        className="fixed bottom-16 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md md:rounded-lg animate-in slide-in-from-bottom-5"
      >
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between gap-2">
              <div className="flex-grow">
                  <h4 className="font-bold font-headline">Install the YUNI App</h4>
                  <p className="text-sm text-gray-300">
                      Tap the <Share className="inline-block h-4 w-4 align-text-bottom" /> icon, then 'Add to Home Screen' <PlusSquare className="inline-block h-4 w-4 align-text-bottom" />.
                  </p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleDismiss} className="text-gray-400 hover:text-white hover:bg-gray-700 h-8 w-8 shrink-0">
                  <X className="h-5 w-5" />
              </Button>
          </div>
        </div>
      </div>
    );
  }

  // Standard banner for Android/Desktop
  if (deferredPrompt) {
    return (
      <div
        className="fixed bottom-16 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md md:rounded-lg animate-in slide-in-from-bottom-5"
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
  
  return null;
}
