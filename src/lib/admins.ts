
// In a real application, this would be a database check against a user's roles or permissions.
export const adminEmails: string[] = [
    'will@email.com',
    'olivia.martin@email.com',
    'hitechsoftware03@gmail.com'
];

export const isAdmin = (email: string | null | undefined): boolean => {
    if (!email) {
        return false;
    }
    return adminEmails.includes(email);
};
