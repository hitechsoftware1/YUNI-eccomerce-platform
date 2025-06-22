"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

export function InstallPwaBanner() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // Show banner after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transform bg-gray-900 text-white shadow-lg transition-transform duration-500 ease-in-out md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:max-w-md md:rounded-lg ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
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
          <Button size="sm" className="bg-primary hover:bg-primary/90">Install</Button>
          <Button variant="ghost" size="icon" onClick={handleDismiss} className="text-gray-400 hover:text-white hover:bg-gray-700 h-8 w-8">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
