
'use client';

import type { LoginActivity } from './types';

const LOGIN_ACTIVITY_KEY = 'yuni-login-activity';

// In a real app, this would use a backend service with IP-based geolocation
// and proper user agent parsing. For this demo, we use localStorage to simulate persistence.

export function getLoginActivity(): LoginActivity[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const storedActivity = localStorage.getItem(LOGIN_ACTIVITY_KEY);
    const activity = storedActivity ? (JSON.parse(storedActivity) as LoginActivity[]) : [];
    
    // Ensure only the most recent entry is marked as 'current'
    if (activity.length > 0) {
        activity.forEach((act, index) => {
            act.isCurrent = index === 0;
        });
    }
    return activity;

  } catch (error) {
    console.error("Failed to parse login activity from localStorage", error);
    return [];
  }
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

    try {
        const existingActivity = getLoginActivity();
        // Remove 'isCurrent' flag from previous logs
        const updatedHistory = existingActivity.map(act => ({...act, isCurrent: false}));
        // Add the new activity to the start and cap the history at 5 entries
        const newHistory = [newActivity, ...updatedHistory].slice(0, 5);
        localStorage.setItem(LOGIN_ACTIVITY_KEY, JSON.stringify(newHistory));
    } catch (error) {
        console.error("Failed to save login activity to localStorage", error);
    }
}
