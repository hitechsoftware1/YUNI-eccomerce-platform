
'use client';

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

interface RejectUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isRejecting: boolean;
  userName: string;
}

export function RejectUserDialog({ 
    isOpen, 
    onOpenChange, 
    onConfirm, 
    isRejecting, 
    userName 
}: RejectUserDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reject Seller Application?</AlertDialogTitle>
          <AlertDialogDescription>
            This will reject the seller application for "{userName}". Their role will be reverted to 'Buyer'. Are you sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRejecting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm} 
            disabled={isRejecting} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isRejecting ? 'Rejecting...' : 'Reject Application'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
