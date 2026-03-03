import type { Scan } from '@/mock/data/scans';
import { Search, Share2, Beaker, ShieldCheck, FileText } from 'lucide-react';

interface ScanOverviewProps {
    scan: Scan;
}

const Step = ({ icon: Icon, label, isActive, isCompleted }: { icon: any, label: string, isActive?: boolean, isCompleted?: boolean }) => (
    <div className="flex flex-col items-center gap-4 relative">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isActive
            ? 'bg-primary border-primary shadow-[0_0_20px_rgba(12,200,168,0.4)] text-white scale-110'
            : isCompleted
                ? 'bg-primary/20 border-primary/50 text-primary'
                : 'bg-card border-border/50 text-muted-foreground'
            }`}>
            <Icon className="w-6 h-6" />
        </div>
        <span className={`text-[11px] font-bold uppercase tracking-widest ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>{label}</span>
    </div>
);

const ScanOverview = ({ scan }: ScanOverviewProps) => {
    return (
        <div className="bg-card/30 backdrop-blur-xl rounded-[40px] border border-border/10 p-10 mb-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                {/* Progress Circle */}
                <div className="lg:col-span-3 flex justify-center">
                    <div className="relative w-44 h-44">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="88"
                                cy="88"
                                r="78"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-secondary/30"
                            />
                            <circle
                                cx="88"
                                cy="88"
                                r="78"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * 78}
                                strokeDashoffset={2 * Math.PI * 78 * (1 - scan.progress / 100)}
                                className="text-primary transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black">{scan.progress}%</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">In Progress</span>
                        </div>
                    </div>
                </div>

                {/* Steps */}
                <div className="lg:col-span-9 flex flex-col gap-10">
                    <div className="flex items-center justify-between relative px-4">
                        {/* Connector Line */}
                        <div className="absolute top-7 left-10 right-10 h-0.5 bg-border/20 -z-0"></div>
                        <Step icon={Search} label="Spidering" isActive={true} />
                        <Step icon={Share2} label="Mapping" />
                        <Step icon={Beaker} label="Testing" />
                        <Step icon={ShieldCheck} label="Validating" />
                        <Step icon={FileText} label="Reporting" />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-4 pt-4">
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Scan Type</p>
                            <p className="font-bold text-sm tracking-tight">{scan.type} Box</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Targets</p>
                            <p className="font-bold text-sm tracking-tight uppercase">{scan.targets}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Started At</p>
                            <p className="font-bold text-sm tracking-tight">{scan.startedAt}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Credentials</p>
                                <p className="font-bold text-sm tracking-tight">{scan.credentials}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Checklists</p>
                                <p className="font-bold text-sm tracking-tight text-primary">{scan.checklists}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScanOverview;
