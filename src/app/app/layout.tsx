'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
    BookOpen,
    Users,
    Calendar,
    BarChart3,
    Settings,
    Bell,
    Search,
    Menu,
    Home,
    MessageSquare,
    CreditCard,
    FileText,
    UserCheck,
    LogOut,
    User
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

// Navigation items
const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/app" },
    { icon: Users, label: "Students", path: "/app/students" },
    { icon: UserCheck, label: "Attendance", path: "/app/attendance" },
    { icon: BookOpen, label: "Progress", path: "/app/progress" },
    { icon: Calendar, label: "Classes", path: "/app/classes" },
    { icon: MessageSquare, label: "Communication", path: "/app/communication" },
    { icon: CreditCard, label: "Finance", path: "/app/finance" },
    { icon: FileText, label: "Reports", path: "/app/reports" },
    { icon: BarChart3, label: "Analytics", path: "/app/analytics" },
    { icon: Settings, label: "Settings", path: "/app/settings" }
]

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const user = session?.user

    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <div className="flex flex-col h-full">
                {/* Logo Section */}
                <div className="flex items-center gap-3 p-6 border-b border-border">
                    <div className="text-2xl">🕌</div>
                    <div>
                        <h1 className="font-bold text-foreground">Al-Noor Academy</h1>
                        <p className="text-sm text-muted-foreground">Management Portal</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navigationItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={onClose}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-all hover:scale-[1.02] ${isActive
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'text-foreground hover:bg-muted'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 p-3 rounded-md bg-muted mb-3">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={user?.image || ''} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{user?.name || 'User'}</p>
                            <p className="text-sm text-muted-foreground truncate">{user?.email || 'Role'}</p>
                        </div>
                    </div>

                    <Button
                        onClick={() => signOut()}
                        variant="ghost"
                        className="w-full justify-start gap-3 text-foreground hover:bg-muted rounded-md"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

function Header({ onMenuClick }: { onMenuClick: () => void }) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const user = session?.user

    const getPageTitle = () => {
        const item = navigationItems.find(item => item.path === pathname)
        return item ? item.label : 'Dashboard'
    }

    return (
        <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onMenuClick}
                        className="lg:hidden rounded-md"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    <div>
                        <h2 className="text-lg font-bold text-foreground">{getPageTitle()}</h2>
                        <p className="text-sm text-muted-foreground">Welcome back, {user?.name || 'User'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search students, classes..."
                            className="pl-10 pr-4 py-2 w-64 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Notifications */}
                    <Button variant="ghost" size="sm" className="relative rounded-md">
                        <Bell className="w-5 h-5" />
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
                            3
                        </Badge>
                    </Button>

                    {/* Profile */}
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.image || ''} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="lg:ml-64">
                <Header onMenuClick={() => setSidebarOpen(true)} />

                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
