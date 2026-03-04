import { Settings2, ChevronDown, X } from 'lucide-react'
import FindingLog from './FindingLog'

const logs = [
    { time: '[09:00:00]', text: "I'll begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration." },
    { time: '[09:01:00]', text: "Good! target is online. Now let me perform port scanning to identify running services." },
    { time: '[09:02:00]', text: "Excellent reconnaissance results:", child: "- helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)" },
    { time: '', text: "Let me probe the web server on target first to understand its structure." },
    { time: '[09:03:00]', text: "Great! I found a login page for a Help Desk Platform. I can see a useful comment: \"TODO: Delete the testing account (test:test)\". Let me test this credential. The login redirects to /password/test. Let me follow that path and explore it." },
    { time: '[09:04:00]', text: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to '#' which means the current page. Let me try a different approach." },
    { time: '[09:05:00]', text: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the test:test password directly on other endpoints." },
    { time: '[09:06:00]', text: "Great! I can access the dashboard using the 'X-UserId: 10032' header. The dashboard shows \"Welcome, John Doe\". This suggests an **IDOR vulnerability** - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application..." },
]

const ScanConsole = () => {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">

            {/* Header — bg-background */}
            <div className="bg-background px-4 sm:px-6 py-3 border-b border-border flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-semibold text-sm">Live Scan Console</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 bg-secondary px-2.5 py-0.5 rounded-full">
                        <Settings2 className="w-3 h-3" /> Running...
                    </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <ChevronDown className="w-4 h-4 cursor-pointer hover:text-foreground" />
                    <X className="w-4 h-4 cursor-pointer hover:text-foreground" />
                </div>
            </div>

            {/* Body: Activity (bg-card) | Finding Log (bg-background) */}
            <div className="flex flex-col xl:flex-row flex-1 min-h-0">

                {/* Left — Activity Log (bg-card) */}
                <div className="flex-1 flex flex-col bg-card border-b xl:border-b-0 xl:border-r border-border min-h-0">

                    <div className="flex border-b border-border shrink-0">
                        <button className="relative px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-primary">
                            Activity Log
                            <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                        </button>
                        <button className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition">Verification Loops</button>
                    </div>

                    {/* Log output */}
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 font-mono text-[11px] sm:text-[13px] leading-relaxed min-h-[300px] max-h-[480px] xl:max-h-none">
                        {logs.map((log, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex gap-2 sm:gap-4">
                                    {log.time && <span className="text-muted-foreground shrink-0">{log.time}</span>}
                                    <div className="text-foreground/90 min-w-0 break-words">
                                        {log.text.split(/(\*\*.*?\*\*|'.*?'|#|\/api|test:test)/).map((part, idx) => {
                                            if (part.startsWith('**') && part.endsWith('**'))
                                                return <span key={idx} className="text-red-500 font-bold">{part.slice(2, -2)}</span>
                                            if (part.startsWith("'") && part.endsWith("'"))
                                                return <span key={idx} className="bg-primary/10 text-primary px-1 rounded">{part}</span>
                                            if (part === 'test:test' || part === 'X-UserId: 10032')
                                                return <span key={idx} className="text-teal-400 font-bold">{part}</span>
                                            if (part === '/api' || part === '/password/test')
                                                return <span key={idx} className="bg-secondary/50 px-1 rounded font-bold">{part}</span>
                                            return part
                                        })}
                                    </div>
                                </div>
                                {log.child && (
                                    <div className="ml-8 sm:ml-16 mt-1 text-muted-foreground/60 flex gap-3">
                                        <span>|</span>
                                        <span className="break-words">{log.child}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Finding Log (bg-background, cards are bg-card) */}
                <div className="xl:w-[360px] bg-background flex flex-col">
                    <FindingLog />
                </div>
            </div>

        </div>
    )
}

export default ScanConsole
