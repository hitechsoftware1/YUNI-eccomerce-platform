'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Address } from '@/lib/types';
import { AddressForm, type AddressFormValues } from './address-form';
import { Pencil, Trash2, PlusCircle, BookUser } from 'lucide-react';

interface AddressBookModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  addresses: Address[];
  onAddressesUpdate: (addresses: Address[]) => void;
}

export function AddressBookModal({ isOpen, onOpenChange, addresses, onAddressesUpdate }: AddressBookModalProps) {
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState<Address | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsFormVisible(true);
  };
  
  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsFormVisible(true);
  };

  const handleDelete = (addressId: string) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    onAddressesUpdate(updatedAddresses);
  };

  const handleSave = async (data: AddressFormValues) => {
    setIsSaving(true);
    let updatedAddresses;
    if (editingAddress) {
      // Update existing address
      updatedAddresses = addresses.map(addr =>
        addr.id === editingAddress.id ? { ...addr, ...data } : addr
      );
    } else {
      // Add new address
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        ...data,
      };
      updatedAddresses = [...addresses, newAddress];
    }
    onAddressesUpdate(updatedAddresses);
    setIsSaving(false);
    setIsFormVisible(false);
    setEditingAddress(null);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingAddress(null);
  };
  
  // Reset form visibility when modal closes
  React.useEffect(() => {
    if (!isOpen) {
        setIsFormVisible(false);
        setEditingAddress(null);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Address Book</DialogTitle>
          <DialogDescription>
            Manage your shipping addresses for faster checkout.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {!isFormVisible && (
                <div className="space-y-4">
                    {addresses.length > 0 ? (
                        addresses.map(address => (
                            <div key={address.id} className="text-sm rounded-md border p-4 flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{address.fullName}</p>
                                    <p className="text-muted-foreground">{address.addressLine1}</p>
                                    <p className="text-muted-foreground">{address.city}, {address.postalCode}</p>
                                    <p className="text-muted-foreground">{address.country}</p>
                                    <p className="text-muted-foreground">Phone: {address.phoneNumber}</p>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(address)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(address.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-10 rounded-lg bg-secondary/50">
                            <BookUser className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">No addresses saved</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Add an address to get started.</p>
                        </div>
                    )}
                     <Button className="w-full" onClick={handleAddNew}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Address
                    </Button>
                </div>
            )}
            {isFormVisible && (
                 <AddressForm 
                    initialData={editingAddress ? editingAddress : undefined}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    isSaving={isSaving}
                 />
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
