import type { DashboardStats } from '../data/dashboard';
import { mockDashboardStats } from '../data/dashboard';

class DashboardService {
    async getStats(): Promise<DashboardStats> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockDashboardStats;
    }
}

export const dashboardService = new DashboardService();
