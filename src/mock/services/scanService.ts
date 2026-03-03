import type { Scan } from '../data/scans';
import { mockScans, mockScanDetail } from '../data/scans';

class ScanService {
    async getScans(): Promise<Scan[]> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockScans;
    }

    async getScanById(id: string): Promise<Scan | undefined> {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (id === 'new-scan') return mockScanDetail;
        return mockScans.find(s => s.id === id);
    }
}

export const scanService = new ScanService();
