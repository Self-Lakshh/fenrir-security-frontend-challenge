import { useNavigate } from 'react-router-dom';
import { ChevronRight, FileDown, Square, Home } from 'lucide-react';

const ScanHeader = () => {
    const navigate = useNavigate();

    return (
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm font-medium">
                <button onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                    <Home className="w-3.5 h-3.5" />
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
                <span className="text-muted-foreground font-bold">Private Assets</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
                <span className="text-foreground font-bold">New Scan</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
                <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-card border border-border/50 text-xs sm:text-sm font-bold hover:bg-secondary transition-all shadow-lg active:scale-95">
                    <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Export Report
                </button>
                <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs sm:text-sm font-bold hover:bg-red-500/20 transition-all shadow-lg active:scale-95">
                    <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" /> Stop Scan
                </button>
            </div>
        </header>
    );
};

export default ScanHeader;
