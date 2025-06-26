// In a real application, this would be a database check against a user's roles or permissions.
export const adminEmails: string[] = [
    'will@email.com',
    'olivia.martin@email.com'
];

export const isAdmin = (email: string | null | undefined): boolean => {
    if (!email) {
        return false;
    }
    return adminEmails.includes(email);
};
