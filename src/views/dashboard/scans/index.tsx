import { useEffect, useState } from 'react'
import { scanService } from '@/mock/services/scanService'
import type { Scan } from '@/mock/data/scans'
import ScanHeader from './components/ScanHeader'
import ScanOverview from './components/ScanOverview'
import ScanConsole from './components/ScanConsole'
import FindingLog from './components/FindingLog'

const Scans = () => {
    const [scan, setScan] = useState<Scan | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchScan = async () => {
            const data = await scanService.getScanById('new-scan')
            if (data) setScan(data)
            setLoading(false)
        }
        fetchScan()
    }, [])

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
    )

    if (!scan) return <div>Scan not found</div>

    return (
        <div className="max-w-[1600px] mx-auto">
            <ScanHeader />
            <ScanOverview scan={scan} />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                <div className="xl:col-span-8">
                    <ScanConsole />
                </div>
                <div className="xl:col-span-4 h-full">
                    <FindingLog />
                </div>
            </div>
        </div>
    )
}

export default Scans