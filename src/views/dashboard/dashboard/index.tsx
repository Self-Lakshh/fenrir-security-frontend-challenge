import { useEffect, useState } from 'react'
import { Plus, Filter, LayoutGrid, ArrowUpRight, ArrowDownRight, MoreHorizontal, Clock, AlertCircle, CheckCircle2, XCircle, Search, Zap } from 'lucide-react'
import { dashboardService } from '@/mock/services/dashboardService'
import { scanService } from '@/mock/services/scanService'
import type { DashboardStats } from '@/mock/data/dashboard'
import type { Scan } from '@/mock/data/scans'
import { useNavigate } from 'react-router-dom'

const StatusBadge = ({ status }: { status: Scan['status'] }) => {
    switch (status) {
        case 'Completed':
            return <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-green-500/20"><CheckCircle2 className="w-3 h-3" /> {status}</span>
        case 'Scheduled':
            return <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-blue-500/20"><Clock className="w-3 h-3" /> {status}</span>
        case 'Failed':
            return <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-red-500/20"><XCircle className="w-3 h-3" /> {status}</span>
        case 'In Progress':
            return <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-yellow-500/20 animate-pulse"><Clock className="w-3 h-3" /> {status}</span>
        default:
            return null
    }
}

const VulnBadge = ({ count, type }: { count: number, type: 'critical' | 'high' | 'medium' | 'low' }) => {
    const colors = {
        critical: 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]',
        high: 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]',
        medium: 'bg-yellow-500 text-white shadow-[0_0_10px_rgba(245,158,11,0.4)]',
        low: 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]',
    }
    if (count === 0) return <span className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold bg-secondary/30 text-muted-foreground">-</span>
    return <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${colors[type]}`}>{count}</span>
}

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [scans, setScans] = useState<Scan[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const [statsData, scansData] = await Promise.all([
                dashboardService.getStats(),
                scanService.getScans()
            ])
            setStats(statsData)
            setScans(scansData)
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading) return (
        <div className="flex items-center justify-center h-96">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
    )

    return (
        <div className="space-y-10">
            {/* Upper Summary Bar */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center px-4 py-6 bg-card/20 backdrop-blur-md rounded-[24px] border border-border/10 shadow-2xl">
                <div className="px-4 border-r border-border/10 last:border-0 text-center lg:text-left transition-all hover:scale-105 duration-300">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Org: <span className="text-foreground">Project X</span></p>
                </div>
                <div className="px-4 border-r border-border/10 last:border-0 text-center lg:text-left transition-all hover:scale-105 duration-300">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Owner: <span className="text-foreground">Nammagiri</span></p>
                </div>
                <div className="px-4 border-r border-border/10 last:border-0 text-center lg:text-left transition-all hover:scale-105 duration-300">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Total Scans: <span className="text-foreground">{stats?.totalScans}</span></p>
                </div>
                <div className="px-4 border-r border-border/10 last:border-0 text-center lg:text-left transition-all hover:scale-105 duration-300">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Scheduled: <span className="text-foreground">{stats?.scheduled}</span></p>
                </div>
                <div className="px-4 border-r border-border/10 last:border-0 text-center lg:text-left transition-all hover:scale-105 duration-300">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Rescans: <span className="text-foreground">{stats?.rescans}</span></p>
                </div>
                <div className="px-4 last:border-0 text-center lg:text-left transition-all hover:scale-105 duration-300">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">Failed Scans: <span className="text-foreground">{stats?.failedScans}</span></p>
                </div>
            </div>

            {/* Severity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {[
                    { label: 'Critical Severity', count: stats?.severity.critical, trend: stats?.trends.critical, icon: LayoutGrid, color: 'red' },
                    { label: 'High Severity', count: stats?.severity.high, trend: stats?.trends.high, icon: AlertCircle, color: 'orange' },
                    { label: 'Medium Severity', count: stats?.severity.medium, trend: stats?.trends.medium, icon: AlertCircle, color: 'yellow' },
                    { label: 'Low Severity', count: stats?.severity.low, trend: stats?.trends.low, icon: Search, color: 'green' }
                ].map((item, i) => (
                    <div key={i} className="bg-card/40 backdrop-blur-xl p-6 rounded-[32px] border border-border/10 shadow-xl group hover:border-primary/30 transition-all duration-500">
                        <div className="flex justify-between items-start mb-6">
                            <p className="text-sm font-bold text-muted-foreground/80">{item.label}</p>
                            <div className={`p-3 rounded-2xl bg-${item.color}-500/10 border border-${item.color}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                                <item.icon className={`w-5 h-5 text-${item.color}-500`} />
                            </div>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <h3 className="text-4xl font-extrabold tracking-tight">{item.count}</h3>
                            <div className={`flex items-center gap-1 text-[10px] font-bold ${item.trend?.includes('increase') ? 'text-red-500' : 'text-green-500'}`}>
                                {item.trend?.includes('increase') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {item.trend}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Scans Table Card */}
            <div className="bg-card/30 backdrop-blur-xl rounded-[40px] border border-border/10 overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-border/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search scans by name or type..."
                            className="w-full bg-secondary/30 border border-border/20 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-secondary/50 border border-border/20 text-sm font-bold hover:bg-secondary transition-all">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-secondary/50 border border-border/20 text-sm font-bold hover:bg-secondary transition-all">
                            <LayoutGrid className="w-4 h-4" /> Column
                        </button>
                        <button
                            onClick={() => navigate('/scans')}
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white text-sm font-bold hover:bg-[#0bb598] transition-all shadow-lg shadow-primary/20"
                        >
                            <Plus className="w-4 h-4" /> New scan
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border/5">
                                <th className="px-8 py-5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Scan Name</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Type</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Progress</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Vulnerability</th>
                                <th className="px-8 py-5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Last Scan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/5">
                            {scans.map((scan) => (
                                <tr key={scan.id} className="group hover:bg-secondary/20 transition-all cursor-pointer" onClick={() => navigate('/scans')}>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-center">
                                                <Zap className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="font-bold text-sm">{scan.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-medium text-muted-foreground">{scan.type}</td>
                                    <td className="px-8 py-5">
                                        <StatusBadge status={scan.status} />
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4 min-w-[120px]">
                                            <div className="flex-1 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${scan.status === 'Failed' ? 'bg-red-500' : 'bg-primary'
                                                        }`}
                                                    style={{ width: `${scan.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-extrabold text-muted-foreground">{scan.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <VulnBadge count={scan.vulnerabilities.critical} type="critical" />
                                            <VulnBadge count={scan.vulnerabilities.high} type="high" />
                                            <VulnBadge count={scan.vulnerabilities.medium} type="medium" />
                                            <VulnBadge count={scan.vulnerabilities.low} type="low" />
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-3 group/row">
                                            <span className="text-sm font-medium text-muted-foreground group-hover/row:text-foreground transition-colors">{scan.lastScan}</span>
                                            <button className="p-2 rounded-lg hover:bg-secondary opacity-0 group-hover:opacity-100 transition-all">
                                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-border/10 flex items-center justify-between text-[11px] font-bold text-muted-foreground">
                    <span>Showing {scans.length} of 100 Scans</span>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-secondary/30 hover:bg-secondary transition-all">Prev</button>
                        <button className="px-3 py-1.5 rounded-lg bg-secondary/30 hover:bg-secondary transition-all">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard