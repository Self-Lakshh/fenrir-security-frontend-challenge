type Severity = 'Critical' | 'High' | 'Medium'

interface Finding {
    severity: Severity
    title: string
    endpoint: string
    desc: string
    time: string
}

const FINDINGS: Finding[] = [
    {
        severity: 'Critical',
        title: 'SQL Injection in Authentication Endpoint',
        endpoint: '/api/users/profile',
        desc: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
        time: '10:45:23',
    },
    {
        severity: 'High',
        title: 'Unauthorized Access to User Metadata',
        endpoint: '/api/auth/login',
        desc: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.',
        time: '10:45:23',
    },
    {
        severity: 'Medium',
        title: 'Broken Authentication Rate Limiting',
        endpoint: '/api/search',
        desc: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
        time: '10:45:23',
    },
]

const SEVERITY_STYLES: Record<Severity, string> = {
    Critical: 'bg-red-500 text-white ring-2 ring-red-500/30',
    High: 'bg-orange-500 text-white',
    Medium: 'bg-yellow-500 text-white',
}

const FindingLog = () => {
    return (
        <div className="flex flex-col gap-6">
            <h4 className="font-bold text-sm px-2">Finding Log</h4>

            {FINDINGS.map((finding, i) => (
                <div
                    key={i}
                    className="bg-card/40 backdrop-blur-xl border border-border/10 rounded-[24px] p-6 shadow-xl hover:border-primary/30 transition-all animate-in slide-in-from-right-4 duration-500"
                    style={{ animationDelay: `${i * 150}ms` }}
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${SEVERITY_STYLES[finding.severity]}`}>
                            {finding.severity}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground">{finding.time}</span>
                    </div>

                    <h5 className="font-bold text-sm mb-1 leading-tight">{finding.title}</h5>
                    <p className="text-primary text-[11px] font-bold mb-3">{finding.endpoint}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{finding.desc}</p>
                </div>
            ))}

            <div className="mt-auto pt-10 flex items-center gap-4 text-[11px] font-bold px-2 uppercase tracking-widest">
                <span className="text-red-500">Critical: 0</span>
                <span className="text-orange-500">High: 0</span>
                <span className="text-yellow-500">Medium: 0</span>
                <span className="text-green-500">Low: 0</span>
            </div>
        </div>
    )
}

export default FindingLog
