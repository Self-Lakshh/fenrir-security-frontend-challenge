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
} from "lucide-react"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
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

const PostLoginLayout = () => {
    const { logout, user } = useAuth()
    const { theme, setTheme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate("/sign-in")
    }

    const breadcrumbs = buildBreadcrumbs(location.pathname)

    const displayName = user
        ? `${user.firstName} ${user.lastName}`.trim()
        : "User"

    const displayEmail = user?.email ?? "user@example.com"

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        displayName
    )}&background=0CC8A8&color=ffffff&bold=true&size=128`

    const NavLink = ({ item }: { item: typeof navItems[0] }) => {
        const isActive =
            item.path === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(item.path)

        return (
            <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all duration-200 rounded-full
        ${isActive
                        ? "bg-emerald-300/30 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
            >
                <item.icon
                    className={`w-[18px] h-[18px] ${isActive ? "text-primary" : ""
                        }`}
                />
                {item.name}
            </Link>
        )
    }

    return (
        <div className="min-h-screen flex bg-background text-foreground">

            {/* ───────────── Sidebar ───────────── */}
            <aside className="hidden lg:flex flex-col w-[240px] border-r border-border bg-card sticky top-0 h-screen">

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

                {/* Navigation Wrapper */}
                <div className="flex-1 flex flex-col px-3 pt-6">

                    {/* Top Nav */}
                    <div className="space-y-1">
                        {navItems.map(item => (
                            <NavLink key={item.path} item={item} />
                        ))}
                    </div>

                    {/* Divider + Gap */}
                    <div className="my-8 border-t border-border" />

                    {/* Bottom Nav */}
                    <div className="space-y-1">
                        {bottomNavItems.map(item => (
                            <NavLink key={item.path} item={item} />
                        ))}
                    </div>

                    {/* User Section (Always Bottom) */}
                    <div className="mt-auto pt-4 pb-2 border-t border-border">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-full hover:bg-secondary transition">
                                    <img
                                        src={avatarUrl}
                                        alt={displayName}
                                        className="w-9 h-9 rounded-full border border-border"
                                    />
                                    <div className="flex-1 text-left min-w-0">
                                        <p className="text-sm font-semibold truncate">
                                            {displayEmail}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Security Lead
                                        </p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent side="top" align="start" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{displayName}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {displayEmail}
                                        </span>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={() => navigate("/dashboard/settings")}
                                    >
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>

                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            {theme === "light" ? (
                                                <Sun className="mr-2 h-4 w-4" />
                                            ) : theme === "dark" ? (
                                                <Moon className="mr-2 h-4 w-4" />
                                            ) : (
                                                <Monitor className="mr-2 h-4 w-4" />
                                            )}
                                            Theme
                                        </DropdownMenuSubTrigger>

                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                                    Light
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                                    Dark
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                                    System
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-red-500 focus:text-red-500"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </aside>

            {/* ───────────── Main Area ───────────── */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Header */}
                <header className="h-14 flex items-center justify-between px-6 bg-card border-b border-border sticky top-0 z-30">

                    {/* Breadcrumbs */}
                    <nav className="flex items-center text-sm">

                        {/* Home (Dashboard) */}
                        <Link
                            to="/dashboard"
                            className={`px-3 py-2 transition-colors ${location.pathname === "/dashboard"
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <Home className="w-4 h-4" />
                        </Link>

                        {/* Other Breadcrumbs (Exclude Dashboard) */}
                        {breadcrumbs.slice(1).map((crumb, i) => {
                            const isLast = i === breadcrumbs.slice(1).length - 1

                            return (
                                <div key={i} className="flex items-center">
                                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 mx-1" />

                                    <span
                                        className={`px-3 py-2 transition-colors ${isLast
                                                ? "text-primary font-semibold"
                                                : "text-muted-foreground"
                                            }`}
                                    >
                                        {crumb}
                                    </span>
                                </div>
                            )
                        })}
                    </nav>

                    {/* Header Actions */}
                    <div className="flex items-center gap-3">
                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-border rounded-lg bg-card hover:bg-secondary">
                            <Download className="w-4 h-4" />
                            Export Report
                        </button>

                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20">
                            <Square className="w-3.5 h-3.5 fill-red-500" />
                            Stop Scan
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default PostLoginLayout