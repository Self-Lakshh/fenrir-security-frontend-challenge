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
    Critical: 'bg-red-500 text-white',
    High: 'bg-orange-500 text-white',
    Medium: 'bg-yellow-500 text-white',
}

const FindingLog = () => {
    return (
        <div className="flex flex-col h-full">

            {/* Title */}
            <div className="px-4 py-3 border-b border-border shrink-0">
                <h4 className="font-semibold text-sm">Finding Log</h4>
            </div>

            {/* Findings */}
            <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3 min-h-[200px]">
                {FINDINGS.map((finding, i) => (
                    <div
                        key={i}
                        className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide ${SEVERITY_STYLES[finding.severity]}`}>
                                {finding.severity}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{finding.time}</span>
                        </div>
                        <h5 className="font-semibold text-sm mb-1 leading-snug">{finding.title}</h5>
                        <p className="text-primary text-[11px] font-medium mb-2">{finding.endpoint}</p>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{finding.desc}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FindingLog
