'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PaymentMethodForm, type PaymentMethodFormValues } from './payment-method-form';
import type { PaymentMethod } from '@/lib/types';
import { getCardType } from '@/lib/payment-methods';

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (method: PaymentMethod) => void;
}

export function AddPaymentMethodModal({ isOpen, onOpenChange, onSave }: AddPaymentMethodModalProps) {
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (data: PaymentMethodFormValues) => {
    setIsSaving(true);
    const newMethod: PaymentMethod = {
        id: `pm_${Date.now()}`,
        cardholderName: data.cardholderName,
        cardNumber: data.cardNumber,
        expiryDate: data.expiryDate,
        cardType: getCardType(data.cardNumber),
    };

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSave(newMethod);
    setIsSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Payment Method</DialogTitle>
          <DialogDescription>
            Your card details are stored securely.
          </DialogDescription>
        </DialogHeader>
        <PaymentMethodForm 
            onSave={handleSave}
            onCancel={() => onOpenChange(false)}
            isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
}
