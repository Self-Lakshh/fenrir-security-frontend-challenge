import { useState } from "react"
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "@/App"
import {
    LayoutDashboard,
    FolderKanban,
    Zap,
    CalendarDays,
    Bell,
    Settings,
    LifeBuoy,
    LogOut,
    ChevronRight,
    Moon,
    Sun,
    Monitor,
    Home,
    Download,
    Square,
    Menu,
    X,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { useTheme } from "@/components/theme"

const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Projects", icon: FolderKanban, path: "/dashboard/projects" },
    { name: "Scans", icon: Zap, path: "/dashboard/scans" },
    { name: "Schedule", icon: CalendarDays, path: "/dashboard/schedule" },
]

const bottomNavItems = [
    { name: "Notifications", icon: Bell, path: "/dashboard/notifications" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
    { name: "Support", icon: LifeBuoy, path: "/dashboard/support" },
]

const buildBreadcrumbs = (pathname: string) => {
    const parts = pathname.replace("/dashboard", "").split("/").filter(Boolean)
    return parts.length === 0
        ? ["Dashboard"]
        : ["Dashboard", ...parts.map(p => p.charAt(0).toUpperCase() + p.slice(1))]
}

interface SidebarProps {
    pathname: string
    avatarUrl: string
    initials: string
    displayName: string
    displayEmail: string
    displayPosition: string
    theme: string
    setTheme: (t: "light" | "dark" | "system") => void
    onLogout: () => void
    onNavClick?: () => void
}

// Stable component — defined outside layout to prevent remount on parent re-render
const SidebarContent = ({
    pathname,
    avatarUrl,
    initials,
    displayName,
    displayEmail,
    displayPosition,
    theme,
    setTheme,
    onLogout,
    onNavClick,
}: SidebarProps) => {
    const [imgError, setImgError] = useState(false)
    const navigate = useNavigate()
    const active = (path: string) =>
        path === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(path)

    return (
        <>
            {/* Logo */}
            <div className="h-14 flex items-center px-6 shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="relative w-7 h-7">
                        <div className="absolute inset-0 rounded-full bg-primary" />
                        <div className="absolute inset-0 m-auto w-3.5 h-3.5 rounded-full bg-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">aps</span>
                </div>
            </div>

            {/* Nav + user — fills remaining height */}
            <div className="flex-1 flex flex-col px-3 pt-6 overflow-y-auto min-h-0">
                <div className="space-y-1">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onNavClick}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all duration-200 rounded-full ${active(item.path)
                                ? "bg-emerald-300/30 text-primary"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                }`}
                        >
                            <item.icon className={`w-[18px] h-[18px] ${active(item.path) ? "text-primary" : ""}`} />
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="my-8 border-t border-border" />

                <div className="space-y-1">
                    {bottomNavItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onNavClick}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all duration-200 rounded-full ${active(item.path)
                                ? "bg-emerald-300/30 text-primary"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                }`}
                        >
                            <item.icon className={`w-[18px] h-[18px] ${active(item.path) ? "text-primary" : ""}`} />
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* User menu */}
                <div className="mt-auto pt-4 pb-2 border-t border-border">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-full hover:bg-secondary transition">
                                {/* Avatar with initials fallback */}
                                {!imgError ? (
                                    <img
                                        src={avatarUrl}
                                        alt={displayName}
                                        className="w-9 h-9 rounded-full border border-border shrink-0"
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
                                        {initials}
                                    </div>
                                )}
                                <div className="flex-1 text-left min-w-0">
                                    <p className="text-sm font-semibold truncate">{displayEmail}</p>
                                    <p className="text-xs text-muted-foreground">{displayPosition}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="top" align="start" className="w-56">
                            <DropdownMenuLabel>
                                <div className="flex flex-col">
                                    <span className="font-semibold">{displayName}</span>
                                    <span className="text-xs text-muted-foreground">{displayEmail}</span>
                                </div>
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                {/* Theme segmented control */}
                                <div className="px-2 py-2">
                                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">Theme</p>
                                    <div className="flex bg-secondary rounded-lg p-0.5 gap-0.5">
                                        {([
                                            { value: 'light', Icon: Sun, label: 'Light' },
                                            { value: 'dark', Icon: Moon, label: 'Dark' },
                                            { value: 'system', Icon: Monitor, label: 'System' },
                                        ] as const).map(({ value, Icon, label }) => (
                                            <button
                                                key={value}
                                                onClick={(e) => { e.stopPropagation(); setTheme(value) }}
                                                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md text-[11px] font-semibold transition-all ${theme === value
                                                    ? 'bg-background text-foreground shadow-sm'
                                                    : 'text-muted-foreground hover:text-foreground'
                                                    }`}
                                            >
                                                <Icon className="w-3 h-3 shrink-0" />
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <DropdownMenuItem onClick={() => { navigate('/dashboard/settings'); onNavClick?.() }}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={onLogout} className="text-red-600 focus:text-red-600 focus:bg-red-500/10">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    )
}

const PostLoginLayout = () => {
    const { logout, user } = useAuth()
    const { theme, setTheme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate("/sign-in")
    }

    const closeMobile = () => setMobileOpen(false)

    const breadcrumbs = buildBreadcrumbs(location.pathname)

    const displayName = user ? `${user.firstName} ${user.lastName}` : "User"
    const displayEmail = user?.email ?? "user@example.com"
    const displayPosition = user?.position ?? "Security Lead"
    const initials = user
        ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
        : "U"
    const avatarUrl = `https://api.dicebear.com/7.x/adventurer/png?seed=${encodeURIComponent(displayName)}&size=128&backgroundColor=facc15`

    const sidebarProps: SidebarProps = {
        pathname: location.pathname,
        avatarUrl,
        initials,
        displayName,
        displayEmail,
        displayPosition,
        theme,
        setTheme,
        onLogout: handleLogout,
    }

    return (
        <div className="min-h-screen flex bg-background text-foreground">

            {/* Sidebar — desktop */}
            <aside className="hidden lg:flex flex-col w-[240px] border-r border-border bg-card sticky top-0 h-screen">
                <SidebarContent {...sidebarProps} />
            </aside>

            {/* Backdrop — mobile */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={closeMobile}
                />
            )}

            {/* Drawer — mobile */}
            <aside
                className={`fixed top-0 right-0 z-50 h-screen w-[280px] flex flex-col bg-card border-l border-border shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close trigger */}
                <button
                    onClick={closeMobile}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition text-muted-foreground hover:text-foreground z-10"
                    aria-label="Close menu"
                >
                    <X className="w-5 h-5" />
                </button>

                <SidebarContent {...sidebarProps} onNavClick={closeMobile} />
            </aside>

            {/* Main area */}
            <div className="flex-1 flex flex-col min-w-0">

                <header className="h-14 flex items-center justify-between px-6 bg-card border-b border-border sticky top-0 z-30">

                    {/* Breadcrumbs */}
                    <nav className="flex items-center text-sm">
                        <Link
                            to="/dashboard"
                            className={`px-3 py-2 transition-colors ${location.pathname === "/dashboard"
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <Home className="w-4 h-4" />
                        </Link>

                        {breadcrumbs.slice(1).map((crumb, i) => {
                            const isLast = i === breadcrumbs.slice(1).length - 1
                            return (
                                <div key={i} className="flex items-center">
                                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 mx-1" />
                                    <span className={`px-3 py-2 transition-colors ${isLast ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                                        {crumb}
                                    </span>
                                </div>
                            )
                        })}
                    </nav>

                    {/* Header actions */}
                    <div className="flex items-center gap-3">
                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-border rounded-lg bg-card hover:bg-secondary">
                            <Download className="w-4 h-4" />
                            Export Report
                        </button>

                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20">
                            <Square className="w-3.5 h-3.5 fill-red-500" />
                            Stop Scan
                        </button>

                        {/* Mobile menu trigger */}
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition text-muted-foreground hover:text-foreground"
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default PostLoginLayout