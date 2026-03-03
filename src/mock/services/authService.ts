import type { User } from '../data/users';
import { initialUsers } from '../data/users';

const USERS_KEY = 'mock_users';

class AuthService {
    private users: User[] = [];

    constructor() {
        this.initUsers();
    }

    private initUsers() {
        const stored = localStorage.getItem(USERS_KEY);
        this.users = stored ? JSON.parse(stored) : [...initialUsers];
        if (!stored) {
            localStorage.setItem(USERS_KEY, JSON.stringify(this.users));
        }
    }

    async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: Omit<User, 'password'> }> {
        await new Promise<void>((resolve) => setTimeout(resolve, 800));

        const user = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

        if (!user) return { success: false, message: 'No account found with this email.' };
        if (user.password !== password) return { success: false, message: 'Invalid password. Please try again.' };

        const { password: _pw, ...safeUser } = user;
        return { success: true, message: 'Logged in successfully!', user: safeUser };
    }

    async register(userData: Omit<User, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string; user?: Omit<User, 'password'> }> {
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));

        const exists = this.users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());
        if (exists) return { success: false, message: 'An account with this email already exists.' };

        const newUser: User = {
            ...userData,
            id: Math.random().toString(36).substring(2, 11),
            createdAt: new Date().toISOString(),
        };

        this.users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(this.users));

        const { password: _pw, ...safeUser } = newUser;
        return { success: true, message: 'Account created successfully!', user: safeUser };
    }
}

export const authService = new AuthService();