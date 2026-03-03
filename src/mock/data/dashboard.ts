export interface DashboardStats {
    totalScans: number;
    scheduled: number;
    rescans: number;
    failedScans: number;
    lastScan: string;
    severity: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
    trends: {
        critical: string;
        high: string;
        medium: string;
        low: string;
    };
}

export const mockDashboardStats: DashboardStats = {
    totalScans: 100,
    scheduled: 1000,
    rescans: 100,
    failedScans: 100,
    lastScan: '10 mins ago',
    severity: {
        critical: 86,
        high: 16,
        medium: 26,
        low: 16,
    },
    trends: {
        critical: '+2% increase than yesterday',
        high: '+0.9% increase than yesterday',
        medium: '+0.9% decrease than yesterday',
        low: '+0.9% increase than yesterday',
    }
};
