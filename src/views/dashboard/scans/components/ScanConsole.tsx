import { Settings2, ChevronDown, X } from 'lucide-react';

const logs = [
    { time: '[09:00:00]', text: "I'll begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration." },
    { time: '[09:01:00]', text: "Good! target is online. Now let me perform port scanning to identify running services." },
    { time: '[09:02:00]', text: "Excellent reconnaissance results:", child: "- helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)" },
    { time: '', text: "Let me probe the web server on target first to understand its structure." },
    { time: '[09:03:00]', text: "Great! I found a login page for a Help Desk Platform. I can see a useful comment: \"TODO: Delete the testing account (test:test)\". Let me test this credential. The login redirects to /password/test. Let me follow that path and explore it." },
    { time: '[09:04:00]', text: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to '#' which means the current page. Let me try a different approach." },
    { time: '[09:05:00]', text: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the test:test password directly on other endpoints." },
    { time: '[09:06:00]', text: "Great! I can access the dashboard using the 'X-UserId: 10032' header. The dashboard shows \"Welcome, John Doe\". This suggests an **IDOR vulnerability** - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application..." },
];

const ScanConsole = () => {
    return (
        <div className="bg-card/30 backdrop-blur-xl rounded-[40px] border border-border/10 overflow-hidden shadow-2xl h-[600px] flex flex-col">
            <div className="p-6 border-b border-border/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                    <span className="font-bold text-sm">Live Scan Console</span>
                    <span className="px-2 py-0.5 rounded bg-secondary/50 text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                        <Settings2 className="w-3 h-3" /> Running...
                    </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <ChevronDown className="w-4 h-4 cursor-pointer hover:text-foreground" />
                    <X className="w-4 h-4 cursor-pointer hover:text-foreground" />
                </div>
            </div>

            <div className="flex border-b border-border/10">
                <button className="px-8 py-3 text-sm font-bold border-b-2 border-primary text-primary bg-primary/5">Activity Log</button>
                <button className="px-8 py-3 text-sm font-bold text-muted-foreground hover:text-foreground transition-all">Verification Loops</button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto no-scrollbar font-mono text-[13px] leading-relaxed">
                {logs.map((log, i) => (
                    <div key={i} className="mb-6 animate-in fade-in slide-in-from-left-2 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex gap-4">
                            {log.time && <span className="text-muted-foreground shrink-0">{log.time}</span>}
                            <div className="text-foreground/90">
                                {log.text.split(/(\*\*.*?\*\*|'.*?'|#|\/api|test:test)/).map((part, idx) => {
                                    if (part.startsWith('**') && part.endsWith('**'))
                                        return <span key={idx} className="text-red-500 font-bold">{part.slice(2, -2)}</span>;
                                    if (part.startsWith("'") && part.endsWith("'"))
                                        return <span key={idx} className="bg-primary/10 text-primary px-1 rounded">{part}</span>;
                                    if (part === 'test:test' || part === 'X-UserId: 10032')
                                        return <span key={idx} className="text-teal-400 font-bold">{part}</span>;
                                    if (part === '/api' || part === '/password/test')
                                        return <span key={idx} className="bg-secondary/50 px-1 rounded font-bold">{part}</span>;
                                    if (part === 'helpdesk.democorp.com')
                                        return <span key={idx} className="text-teal-400 underline decoration-teal-400/30">{part}</span>;
                                    return part;
                                })}
                            </div>
                        </div>
                        {log.child && (
                            <div className="ml-16 mt-2 text-muted-foreground/60 flex gap-4">
                                <span>|</span>
                                <span>{log.child}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 bg-secondary/20 border-t border-border/10 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-8">
                <div className="flex gap-8">
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div> Sub-Agents: 0</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div> Parallel Executions: 2</div>
                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></div> Operations: 1</div>
                </div>
            </div>
        </div>
    );
};

export default ScanConsole;
