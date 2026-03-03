import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/App'
import {
    LayoutDashboard,
    FileText,
    Zap,
    Calendar,
    Bell,
    Settings,
    LifeBuoy,
    Menu,
    X,
    LogOut,
    ChevronRight,
    Search,
    Moon,
    Sun,
    Monitor
} from 'lucide-react'
import { useState } from 'react'
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
import { useTheme } from '@/components/theme'

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/dashboard' },
    { name: 'Projects', icon: FileText, path: '/dashboard/projects' },
    { name: 'Scans', icon: Zap, path: '/dashboard/scans' },
    { name: 'Schedule', icon: Calendar, path: '/dashboard/schedule' },
]

const bottomNavItems = [
    { name: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
    { name: 'Support', icon: LifeBuoy, path: '/dashboard/support' },
]

const PostLoginLayout = () => {
    const { logout } = useAuth()
    const { theme, setTheme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/sign-in')
    }

    const NavLink = ({ item }: { item: typeof navItems[0] }) => {
        const isActive = location.pathname === item.path
        return (
            <Link
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    }`}
            >
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : ''}`} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(12,200,168,0.6)]"></div>
                )}
            </Link>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 border-r border-border bg-card/30 backdrop-blur-xl sticky top-0 h-screen overflow-y-auto no-scrollbar">
                <div className="p-8 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary border-[3px] border-background shadow-[0_0_15px_rgba(12,200,168,0.3)]"></div>
                    <span className="font-bold text-2xl tracking-tighter">aps</span>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1">
                    {navItems.map((item) => (
                        <NavLink key={item.path} item={item} />
                    ))}
                </nav>

                <div className="px-4 py-6 space-y-1 border-t border-border mt-auto">
                    {bottomNavItems.map((item) => (
                        <NavLink key={item.path} item={item} />
                    ))}

                    {/* User Profile / Dropdown */}
                    <div className="pt-6 mt-6 border-t border-border">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="w-full flex items-center gap-3 px-2 mb-2 hover:bg-secondary/50 p-2 rounded-xl transition-all cursor-pointer group">
                                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-2 border-border/50 group-hover:border-primary/50 transition-colors">
                                        <img
                                            src="/avatar.jpg"
                                            alt="User"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Admin&background=0CC8A8&color=fff`
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-sm font-bold truncate">admin@edu.com</p>
                                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Security Lead</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-data-[state=open]:rotate-90 transition-transform" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-border/50">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <div className="flex items-center">
                                                {theme === "light" ? <Sun className="mr-2 h-4 w-4" /> : theme === "dark" ? <Moon className="mr-2 h-4 w-4" /> : <Monitor className="mr-2 h-4 w-4" />}
                                                <span>Theme</span>
                                            </div>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent className="bg-card/95 backdrop-blur-xl border-border/50">
                                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                                    <Sun className="mr-2 h-4 w-4" />
                                                    <span>Light</span>
                                                    {theme === "light" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                                    <Moon className="mr-2 h-4 w-4" />
                                                    <span>Dark</span>
                                                    {theme === "dark" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                                    <Monitor className="mr-2 h-4 w-4" />
                                                    <span>System</span>
                                                    {theme === "system" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </aside>

            {/* Mobile Nav Toggle */}
            <div className="lg:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-3 bg-card border border-border rounded-2xl shadow-xl text-foreground active:scale-95 transition-transform"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
                    <nav className="flex flex-col items-center justify-center h-full p-8 space-y-4">
                        <div className="mb-12 flex items-center gap-3 scale-125">
                            <div className="w-8 h-8 rounded-full bg-primary border-[3px] border-background shadow-[0_0_15px_rgba(12,200,168,0.3)]"></div>
                            <span className="font-bold text-3xl tracking-tighter">aps</span>
                        </div>

                        {[...navItems, ...bottomNavItems].map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-2xl font-bold flex items-center gap-4 py-3 ${location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                            >
                                <item.icon className="w-8 h-8" />
                                {item.name}
                            </Link>
                        ))}

                        <button
                            onClick={handleLogout}
                            className="mt-8 text-2xl font-bold text-red-500 flex items-center gap-4 py-3"
                        >
                            <LogOut className="w-8 h-8" />
                            Sign out
                        </button>
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 min-w-0 bg-background/50 relative overflow-x-hidden">
                {/* Header (Breadcrumbs and Global Search) */}
                <header className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10 py-6 bg-background/20 backdrop-blur-lg border-b border-border/10">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Dashboard</span>
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground font-bold">Overiew</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="bg-secondary/50 border border-border/50 rounded-full py-2 pl-10 pr-6 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="p-2.5 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all relative">
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-background"></span>
                            </button>
                            <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5">
                                <div className="w-full h-full rounded-full bg-secondary overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=Admin&background=0CC8A8&color=fff" alt="User" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default PostLoginLayout
