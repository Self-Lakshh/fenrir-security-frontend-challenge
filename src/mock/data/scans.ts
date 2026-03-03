export interface Scan {
    id: string;
    name: string;
    type: 'Greybox' | 'Blackbox';
    status: 'Completed' | 'Scheduled' | 'Failed' | 'In Progress';
    progress: number;
    vulnerabilities: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
    lastScan: string;
    targets?: string;
    startedAt?: string;
    credentials?: string;
    files?: string;
    checklists?: string;
}

export const mockScans: Scan[] = [
    {
        id: '1',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: '2',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: '3',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: '4',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: '5',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: '6',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: '7',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: '8',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Scheduled',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 0, low: 0 },
        lastScan: '4d ago',
    },
    {
        id: '9',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Scheduled',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 0, low: 0 },
        lastScan: '4d ago',
    },
    {
        id: '10',
        name: 'IoT Devices',
        type: 'Blackbox',
        status: 'Failed',
        progress: 10,
        vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 },
        lastScan: '3d ago',
    },
    {
        id: '11',
        name: 'Temp Data',
        type: 'Blackbox',
        status: 'Failed',
        progress: 10,
        vulnerabilities: { critical: 2, high: 4, medium: 6, low: 1 },
        lastScan: '3d ago',
    },
];

export const mockScanDetail: Scan = {
    id: 'new-scan',
    name: 'New Scan',
    type: 'Greybox',
    status: 'In Progress',
    progress: 0,
    vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
    lastScan: 'Just now',
    targets: 'google.com',
    startedAt: 'Nov 22, 09:00AM',
    credentials: '2 Active',
    files: 'Control.pdf',
    checklists: '40/350',
};
