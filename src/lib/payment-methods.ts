'use client';

import type { PaymentMethod } from './types';

const PAYMENT_METHODS_KEY = 'yuni-payment-methods';

export function getPaymentMethods(): PaymentMethod[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const storedMethods = localStorage.getItem(PAYMENT_METHODS_KEY);
    // Add some mock data if it's empty for the demo
    if (!storedMethods) {
        const mockMethods: PaymentMethod[] = [
            {
                id: 'pm_1',
                cardholderName: 'John Doe',
                cardNumber: '4242424242424242',
                expiryDate: '12/25',
                cardType: 'visa',
            }
        ];
        localStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(mockMethods));
        return mockMethods;
    }
    return JSON.parse(storedMethods);
  } catch (error) {
    console.error("Failed to parse payment methods from localStorage", error);
    return [];
  }
}

export function savePaymentMethods(methods: PaymentMethod[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(methods));
  } catch (error) {
    console.error("Failed to save payment methods to localStorage", error);
  }
}

export function getCardType(cardNumber: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'other' {
    if (/^4/.test(cardNumber)) return 'visa';
    if (/^5[1-5]/.test(cardNumber)) return 'mastercard';
    if (/^3[47]/.test(cardNumber)) return 'amex';
    if (/^6(?:011|5)/.test(cardNumber)) return 'discover';
    return 'other';
}
