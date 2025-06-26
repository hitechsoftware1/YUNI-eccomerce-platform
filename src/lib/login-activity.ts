
'use client';

import type { LoginActivity } from './types';

// This file simulates tracking login activity.
// For this demo, we use an in-memory array that resets on page refresh.
// A real app would store this in a secure, server-side database.

let loginActivityHistory: LoginActivity[] = [];

export function getLoginActivity(): LoginActivity[] {
  // Ensure only the most recent entry is marked as 'current'
  if (loginActivityHistory.length > 0) {
      loginActivityHistory.forEach((act, index) => {
          act.isCurrent = index === 0;
      });
  }
  return loginActivityHistory;
}

export function addLoginActivity(): void {
    if (typeof window === 'undefined') {
        return;
    }

    const newActivity: LoginActivity = {
        id: `log-${Date.now()}`,
        // A real implementation would parse navigator.userAgent more robustly
        device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile Browser' : 'Desktop Browser', 
        deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        // IP & location would require a backend/cloud function
        location: 'Unknown Location',
        ipAddress: 'Unavailable',
        date: new Date().toISOString(),
        isCurrent: true,
    };
    
    // Remove 'isCurrent' flag from previous logs
    const updatedHistory = loginActivityHistory.map(act => ({...act, isCurrent: false}));
    // Add the new activity to the start and cap the history at 5 entries
    loginActivityHistory = [newActivity, ...updatedHistory].slice(0, 5);
}
