import type { User } from '../data/users';
import { initialUsers } from '../data/users';

const USERS_KEY = 'mock_users';

class AuthService {
    private users: User[] = [];

    constructor() {
        this.initUsers();
    }

    private initUsers() {
        const storedUsers = localStorage.getItem(USERS_KEY);
        if (storedUsers) {
            this.users = JSON.parse(storedUsers);
        } else {
            this.users = [...initialUsers];
            localStorage.setItem(USERS_KEY, JSON.stringify(this.users));
        }
    }

    async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: Omit<User, 'password'> }> {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const user = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return { success: false, message: 'User not found with this email.' };
        }

        if (user.password !== password) {
            return { success: false, message: 'Invalid password. Please try again.' };
        }

        const { password: _, ...userWithoutPassword } = user;
        return {
            success: true,
            message: 'Logged in successfully!',
            user: userWithoutPassword,
        };
    }

    async register(userData: Omit<User, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string; user?: Omit<User, 'password'> }> {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const existingUser = this.users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase());

        if (existingUser) {
            return { success: false, message: 'An account with this email already exists.' };
        }

        const newUser: User = {
            ...userData,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
        };

        this.users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(this.users));

        const { password: _, ...userWithoutPassword } = newUser;
        return {
            success: true,
            message: 'Account created successfully!',
            user: userWithoutPassword,
        };
    }
}

export const authService = new AuthService();