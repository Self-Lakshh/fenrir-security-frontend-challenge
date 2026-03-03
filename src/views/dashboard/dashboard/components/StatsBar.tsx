import type { LucideIcon } from 'lucide-react'
import {
  AlertCircle,
  AlertTriangle,
  Search,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from 'lucide-react'
import type { DashboardStats } from '@/mock/data/dashboard'

interface StatsBarProps {
  stats: DashboardStats
}

interface SeverityItemProps {
  label: string
  count: number
  trend: string
  icon: LucideIcon
  color: string
  bg: string
}

const StatsBar = ({ stats }: StatsBarProps) => {
  return (
    <div className="w-full bg-card border-b border-border">

      {/* Meta row */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 text-sm text-muted-foreground">
        <InfoItem label="Org" value="Project X" />
        <Divider />
        <InfoItem label="Owner" value="Nammagiri" />
        <Divider />
        <InfoItem label="Total scans" value={stats.totalScans} />
        <Divider />
        <InfoItem label="Scheduled" value={stats.scheduled} />
        <Divider />
        <InfoItem label="Rescans" value={stats.rescans} />
        <Divider />
        <InfoItem label="Failed" value={stats.failedScans} />
        <Divider />
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-emerald-600" />
          <span>{stats.lastScan}</span>
        </div>
      </div>

      {/* Severity grid — 2 cols on mobile/tablet, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        <SeverityItem label="Critical severity" count={stats.severity.critical} trend={stats.trends.critical} icon={ShieldAlert} color="text-red-600" bg="bg-red-100" />
        <SeverityItem label="High severity" count={stats.severity.high} trend={stats.trends.high} icon={AlertCircle} color="text-orange-600" bg="bg-orange-100" />
        <SeverityItem label="Medium severity" count={stats.severity.medium} trend={stats.trends.medium} icon={AlertTriangle} color="text-yellow-600" bg="bg-yellow-100" />
        <SeverityItem label="Low severity" count={stats.severity.low} trend={stats.trends.low} icon={Search} color="text-blue-600" bg="bg-blue-100" />
      </div>

    </div>
  )
}

const InfoItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex items-center gap-1.5">
    <span className="font-medium capitalize">{label}:</span>
    <span className="text-foreground font-semibold">{value}</span>
  </div>
)

const Divider = () => (
  <div className="hidden md:block h-4 w-px bg-border" />
)

const SeverityItem = ({ label, count, trend, icon: Icon, color, bg }: SeverityItemProps) => {
  const isIncrease = trend.includes('increase')

  return (
    <div className="flex items-start justify-between px-4 sm:px-6 py-4 sm:py-6">
      <div>
        <div className="flex items-center gap-3 sm:gap-5 mb-3">
          <span className="text-xs sm:text-sm font-medium capitalize text-muted-foreground">{label}</span>
          <div className={`p-1.5 sm:p-2 rounded-md ${bg}`}>
            <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${color}`} />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl font-bold">{count}</span>
          <span className={`flex items-center text-xs font-medium ${isIncrease ? 'text-red-600' : 'text-green-600'}`}>
            {isIncrease ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </span>
        </div>
      </div>
    </div>
  )
}

export default StatsBar