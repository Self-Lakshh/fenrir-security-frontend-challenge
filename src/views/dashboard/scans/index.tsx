import { useEffect, useState } from 'react'
import { scanService } from '@/mock/services/scanService'
import type { Scan } from '@/mock/data/scans'
import ScanOverview from './components/ScanOverview'
import ScanConsole from './components/ScanConsole'

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
        <div className="flex flex-col min-h-[calc(100vh-56px)]">

            {/* Main content */}
            <div className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-4 lg:p-5">
                <ScanOverview scan={scan} />
                <ScanConsole />
            </div>

            {/* Sticky page footer */}
            <div className="sticky bottom-0 z-10 bg-background border-t border-border px-4 sm:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-4 sm:gap-6">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground inline-block" />Sub-Agents: 0</span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground inline-block" />Parallel Executions: 2</span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground inline-block" />Operations: 1</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 font-semibold">
                    <span className="text-red-500">Critical: 0</span>
                    <span className="text-orange-500">High: 0</span>
                    <span className="text-yellow-500">Medium: 0</span>
                    <span className="text-green-500">Low: 0</span>
                </div>
            </div>

        </div>
    )
}

export default Scans