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
      <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-between px-4 sm:px-6 py-3 sm:py-4 text-sm text-muted-foreground gap-x-4 gap-y-3">
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
  // Compact form for mobile — just the number e.g. "12%"
  const trendShort = trend.split(' ')[0]

  return (
    <div className="flex items-start justify-between px-3 sm:px-5 py-3 sm:py-4 min-w-0 overflow-hidden">

      {/* Label + count + trend */}
      <div className="min-w-0 flex-1 mr-2">
        <span className="text-[11px] sm:text-sm font-medium capitalize text-muted-foreground block mb-2 sm:mb-3 truncate">
          {label}
        </span>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold">{count}</span>
          <span className={`flex items-center gap-0.5 text-[10px] sm:text-xs font-medium ${isIncrease ? 'text-red-600' : 'text-green-600'}`}>
            {isIncrease
              ? <ArrowUpRight className="w-3 h-3 shrink-0" />
              : <ArrowDownRight className="w-3 h-3 shrink-0" />
            }
            <span className="hidden sm:inline">{trend}</span>
            <span className="sm:hidden">{trendShort}</span>
          </span>
        </div>
      </div>

      {/* Icon — flex end */}
      <div className={`p-1.5 sm:p-2 rounded-md shrink-0 ${bg}`}>
        <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${color}`} />
      </div>

    </div>
  )
}

export default StatsBar
