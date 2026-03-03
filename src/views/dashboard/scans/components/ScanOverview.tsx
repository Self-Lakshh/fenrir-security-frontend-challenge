import type { LucideIcon } from 'lucide-react'
import type { Scan } from '@/mock/data/scans'
import { Search, Share2, Beaker, ShieldCheck, FileText } from 'lucide-react'

interface ScanOverviewProps {
    scan: Scan
}

interface StepProps {
    icon: LucideIcon
    label: string
    isActive?: boolean
    isCompleted?: boolean
}

const Step = ({ icon: Icon, label, isActive, isCompleted }: StepProps) => (
    <div className="flex flex-col items-center gap-2 sm:gap-4 relative">
        <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive
                ? 'bg-primary border-primary text-white scale-110 ring-4 ring-primary/20'
                : isCompleted
                    ? 'bg-primary/20 border-primary/50 text-primary'
                    : 'bg-card border-border/50 text-muted-foreground'
            }`}>
            <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>
        <span className={`text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
            {label}
        </span>
    </div>
)

const MetaField = ({ label, value, highlight }: { label: string; value?: string; highlight?: boolean }) => (
    <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
        <p className={`font-bold text-sm tracking-tight ${highlight ? 'text-primary' : ''}`}>{value ?? '—'}</p>
    </div>
)

const SCAN_STEPS: { icon: LucideIcon; label: string }[] = [
    { icon: Search, label: 'Spidering' },
    { icon: Share2, label: 'Mapping' },
    { icon: Beaker, label: 'Testing' },
    { icon: ShieldCheck, label: 'Validating' },
    { icon: FileText, label: 'Reporting' },
]

const ScanOverview = ({ scan }: ScanOverviewProps) => {
    return (
        <div className="bg-card/30 backdrop-blur-xl rounded-2xl sm:rounded-[40px] border border-border/10 p-5 sm:p-8 lg:p-10 mb-6 sm:mb-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">

                {/* Progress ring */}
                <div className="lg:col-span-3 flex justify-center">
                    <div className="relative w-32 h-32 sm:w-44 sm:h-44">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 176 176">
                            <circle cx="88" cy="88" r="78" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-secondary/30" />
                            <circle
                                cx="88" cy="88" r="78"
                                stroke="currentColor" strokeWidth="8" fill="transparent"
                                strokeDasharray={2 * Math.PI * 78}
                                strokeDashoffset={2 * Math.PI * 78 * (1 - scan.progress / 100)}
                                className="text-primary transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl sm:text-4xl font-black">{scan.progress}%</span>
                            <span className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">In Progress</span>
                        </div>
                    </div>
                </div>

                {/* Steps + meta */}
                <div className="lg:col-span-9 flex flex-col gap-6 sm:gap-10">

                    {/* Step pipeline — horizontal scroll on small screens */}
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="flex items-center justify-between relative px-2 sm:px-4 min-w-[360px]">
                            <div className="absolute top-5 sm:top-7 left-8 right-8 h-0.5 bg-border/20 -z-0" />
                            {SCAN_STEPS.map((step, i) => (
                                <Step key={step.label} icon={step.icon} label={step.label} isActive={i === 0} />
                            ))}
                        </div>
                    </div>

                    {/* Meta fields grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-4">
                        <MetaField label="Scan Type" value={`${scan.type} Box`} />
                        <MetaField label="Targets" value={scan.targets} />
                        <MetaField label="Started At" value={scan.startedAt} />
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 col-span-2 sm:col-span-1 lg:col-span-1">
                            <MetaField label="Credentials" value={scan.credentials} />
                            <MetaField label="Checklists" value={scan.checklists} highlight />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ScanOverview
