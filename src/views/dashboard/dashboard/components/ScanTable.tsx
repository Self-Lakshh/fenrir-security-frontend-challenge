import { Search, Filter, LayoutGrid, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Scan } from '@/mock/data/scans'
import StatusBadge from './StatusBadge'
import VulnBadge from './VulnBadge'

interface ScanTableProps {
  scans: Scan[]
}

const ScanTable = ({ scans }: ScanTableProps) => {
  const navigate = useNavigate()

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">
        <div className="relative w-[280px] sm:w-[340px] md:w-[420px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search scans by name or type..."
            className="w-full bg-card border border-border rounded-lg py-2 sm:py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ToolbarButton icon={Filter} label="Filter" />
          <ToolbarButton icon={LayoutGrid} label="Column" />
          <button
            onClick={() => navigate('/dashboard/scans')}
            className="flex items-center gap-1.5 px-3 sm:px-5 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            New scan
          </button>
        </div>
      </div>

      {/* Horizontally scrollable table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="text-muted-foreground text-sm border-b border-border">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-medium">Scan name</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-medium">Type</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-medium">Status</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-medium">Progress</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-medium">Vulnerability</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right font-medium">Last scan</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => (
              <ScanRow key={scan.id} scan={scan} onClick={() => navigate('/dashboard/scans')} />
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

const ToolbarButton = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-sm font-medium border border-border rounded-lg bg-card hover:bg-secondary transition">
    <Icon className="w-4 h-4" />
    <span className="hidden sm:inline">{label}</span>
  </button>
)

const ScanRow = ({ scan, onClick }: { scan: Scan; onClick: () => void }) => {
  const vulnItems = [
    { count: scan.vulnerabilities.critical, type: 'critical' as const },
    { count: scan.vulnerabilities.high, type: 'high' as const },
    { count: scan.vulnerabilities.medium, type: 'medium' as const },
    { count: scan.vulnerabilities.low, type: 'low' as const },
  ].filter((v) => v.count > 0)

  return (
    <tr className="hover:bg-secondary/20 transition cursor-pointer" onClick={onClick}>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-foreground font-medium">{scan.name}</td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground">{scan.type}</td>
      <td className="px-4 sm:px-6 py-3 sm:py-4">
        <StatusBadge status={scan.status} />
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 min-w-[140px]">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full ${scan.status === 'Failed' ? 'bg-red-500' : 'bg-primary'}`}
              style={{ width: `${scan.progress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium shrink-0">{scan.progress}%</span>
        </div>
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-center gap-1 flex-wrap">
          {vulnItems.map((v, i) => (
            <VulnBadge key={i} count={v.count} type={v.type} />
          ))}
        </div>
      </td>
      <td className="px-4 sm:px-6 py-3 sm:py-4 text-right text-muted-foreground whitespace-nowrap">{scan.lastScan}</td>
    </tr>
  )
}

export default ScanTable