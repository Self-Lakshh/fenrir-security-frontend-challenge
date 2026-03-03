import { useEffect, useState } from "react"
import { dashboardService } from "@/mock/services/dashboardService"
import { scanService } from "@/mock/services/scanService"
import type { DashboardStats } from "@/mock/data/dashboard"
import type { Scan } from "@/mock/data/scans"
import StatsBar from "./components/StatsBar"
import ScanTable from "./components/ScanTable"

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [scans, setScans] = useState<Scan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [statsData, scansData] = await Promise.all([
        dashboardService.getStats(),
        scanService.getScans(),
      ])
      setStats(statsData)
      setScans(scansData)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    )

  return (
    <div className="flex flex-col">

      <div className="mt-2">
        <StatsBar stats={stats!} />
      </div>

      <div className="p-3 sm:p-4 lg:p-5">
        <ScanTable scans={scans} />
      </div>

    </div>
  )
}

export default Dashboard