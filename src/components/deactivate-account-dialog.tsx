
'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeactivateAccountDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeactivateAccountDialog({ 
    isOpen, 
    onOpenChange, 
    onConfirm
}: DeactivateAccountDialogProps) {
  const [isDeactivating, setIsDeactivating] = React.useState(false);

  const handleConfirm = () => {
    setIsDeactivating(true);
    // Simulate async action
    setTimeout(() => {
        onConfirm();
        setIsDeactivating(false);
    }, 1500);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently deactivate your account and remove all your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeactivating}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm} 
            disabled={isDeactivating} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeactivating ? 'Deactivating...' : 'Deactivate Account'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
