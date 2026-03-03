export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    position: string;
    createdAt: string;
}

const DEFAULT_MOCK_PASSWORD = 'password123';

export const initialUsers: User[] = [
    {
        id: '1',
        firstName: 'Demo',
        lastName: 'User',
        email: 'test@example.com',
        password: DEFAULT_MOCK_PASSWORD,
        position: 'Security Lead',
        createdAt: new Date().toISOString(),
    },
];
