
import type { PaymentMethod } from './types';
import { db } from './db';

// This file simulates a cloud database for payment methods.
// In a real app, this would be a secure, encrypted database store.

export function getPaymentMethods(): PaymentMethod[] {
    // In a real app: await db.collection('users').doc(userId).collection('paymentMethods').get()
    return db.paymentMethods;
}

export function savePaymentMethods(methods: PaymentMethod[]): void {
    // In a real app, this would be a series of database updates.
    db.paymentMethods = methods;
}

export function getCardType(cardNumber: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'other' {
    if (/^4/.test(cardNumber)) return 'visa';
    if (/^5[1-5]/.test(cardNumber)) return 'mastercard';
    if (/^3[47]/.test(cardNumber)) return 'amex';
    if (/^6(?:011|5)/.test(cardNumber)) return 'discover';
    return 'other';
}
