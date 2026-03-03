export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string; // In a real app, this would be hashed
    createdAt: string;
}

export const initialUsers: User[] = [
    {
        id: '1',
        firstName: 'Demo',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password123',
        createdAt: new Date().toISOString(),
    },
];
