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
}

const Step = ({ icon: Icon, label, isActive }: StepProps) => (
    <div className="flex flex-col items-center gap-2 z-10">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${isActive
            ? 'bg-primary border-primary text-white shadow-[0_0_12px_3px] shadow-emerald-500/40 ring-4 ring-emerald-500/20'
            : 'bg-background border-border text-muted-foreground'
            }`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <span className={`text-[9px] sm:text-[10px] font-semibold whitespace-nowrap ${isActive ? 'text-primary' : 'text-muted-foreground'
            }`}>
            {label}
        </span>
    </div>
)

const MetaField = ({ label, value, highlight }: { label: string; value?: string; highlight?: boolean }) => (
    <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-semibold text-muted-foreground">{label}</span>
        <span className={`text-sm font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>{value ?? '—'}</span>
    </div>
)

const STEPS: { icon: LucideIcon; label: string }[] = [
    { icon: Search, label: 'Spidering' },
    { icon: Share2, label: 'Mapping' },
    { icon: Beaker, label: 'Testing' },
    { icon: ShieldCheck, label: 'Validating' },
    { icon: FileText, label: 'Reporting' },
]

const ScanOverview = ({ scan }: ScanOverviewProps) => {
    return (
        <div className="bg-card border border-border rounded-xl p-4 sm:p-5 mb-5 sm:mb-6">
            <div className="flex gap-4 sm:gap-6 items-center">

                {/* Progress ring */}
                <div className="w-[10%] shrink-0 flex justify-center border-r border-border pr-4 sm:pr-6 self-stretch items-center">
                    <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20">
                        <div className="absolute inset-0 rounded-full bg-zinc-950 flex flex-col items-center justify-center">
                            <span className="px-2 py-0.5 text-md sm:text-base font-bold text-primary rounded">
                                0%
                            </span>
                            <span className="text-[8px] sm:text-[9px] text-muted-foreground font-medium mt-1">
                                In Progress
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right block */}
                <div className="flex-1 min-w-0">

                    {/* Step pipeline */}
                    <div className="overflow-x-auto no-scrollbar pt-2 pb-5 sm:pb-6 border-b border-border mb-4 sm:mb-5">
                        <div className="relative flex items-start justify-between min-w-[320px] px-4">
                            {/* Connecting line */}
                            <div className="absolute top-5 sm:top-6 left-8 right-8 h-px bg-border" />
                            {STEPS.map((step, i) => (
                                <Step key={step.label} icon={step.icon} label={step.label} isActive={i === 0} />
                            ))}
                        </div>
                    </div>

                    {/* Meta fields — justify-between */}
                    <div className="flex items-start justify-between gap-2 overflow-x-auto no-scrollbar">
                        <MetaField label="Scan Type" value={scan.type === 'Greybox' ? 'Grey Box' : 'Black Box'} />
                        <MetaField label="Targets" value={scan.targets} />
                        <MetaField label="Started At" value={scan.startedAt} />
                        <MetaField label="Credentials" value={scan.credentials} />
                        <MetaField label="Files" value={scan.files} />
                        <MetaField label="Checklists" value={scan.checklists} highlight />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ScanOverview
