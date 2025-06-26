'use client';

import type { Address } from './types';

const ADDRESS_STORAGE_KEY = 'yuni-user-addresses';

// In a real app, these would be API calls to a backend service.
// For this demo, we'll use localStorage to simulate persistence.

export function getAddresses(): Address[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const storedAddresses = localStorage.getItem(ADDRESS_STORAGE_KEY);
    return storedAddresses ? JSON.parse(storedAddresses) : [];
  } catch (error) {
    console.error("Failed to parse addresses from localStorage", error);
    return [];
  }
}

export function saveAddresses(addresses: Address[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
  } catch (error) {
    console.error("Failed to save addresses to localStorage", error);
  }
}
