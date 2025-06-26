import type { LoginActivity } from './types';

export const allLoginActivity: LoginActivity[] = [
    {
        id: 'log1',
        device: 'Chrome on Windows',
        deviceType: 'desktop',
        location: 'Kampala, UG',
        ipAddress: '192.168.1.1',
        date: '2024-07-30T10:00:00Z',
        isCurrent: true,
    },
    {
        id: 'log2',
        device: 'Safari on iPhone',
        deviceType: 'mobile',
        location: 'Jinja, UG',
        ipAddress: '10.0.0.5',
        date: '2024-07-28T15:30:00Z',
    },
    {
        id: 'log3',
        device: 'Chrome on Mac OS',
        deviceType: 'desktop',
        location: 'Entebbe, UG',
        ipAddress: '198.51.100.2',
        date: '2024-07-23T08:45:00Z',
    }
];

export function getLoginActivity(): LoginActivity[] {
    // Mock function, returns all activity
    return allLoginActivity;
}
