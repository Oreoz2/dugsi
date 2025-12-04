import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import SettingsPage from './components/SettingsPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import UserManagement from './components/UserManagement.jsx'
import StudentManagement from './components/StudentManagement.jsx'
import AttendanceManagement from './components/AttendanceManagement.jsx'
import ProgressTracking from './components/ProgressTracking.jsx'
import CurriculumManagement from './components/CurriculumManagement.jsx'
import CommunicationCenter from './components/CommunicationCenter.jsx'
import FinanceManagement from './components/FinanceManagement.jsx'
import AnalyticsDashboard from './components/AnalyticsDashboard.jsx'
import ReportsCenter from './components/ReportsCenter.jsx'
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
  GraduationCap,
  MessageSquare,
  CreditCard,
  FileText,
  UserCheck,
  TrendingUp,
  Clock,
  Star,
  LogOut,
  User
} from 'lucide-react'
import './App.css'

// Mock tenant data - in real app this would come from API
const tenants = {
  demo1: {
    name: "Al-Noor Islamic Academy",
    logo: "🕌",
    theme: "demo1",
    subdomain: "alnoor"
  },
  demo2: {
    name: "Madinah Learning Center", 
    logo: "📚",
    theme: "demo2",
    subdomain: "madinah"
  },
  demo3: {
    name: "Barakah Madrasah",
    logo: "🌟", 
    theme: "demo3",
    subdomain: "barakah"
  }
}

// Mock user data
const currentUser = {
  name: "Ahmed Hassan",
  role: "Teacher",
  avatar: "",
  initials: "AH"
}

// Navigation items
const navigationItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Users, label: "Students", path: "/students" },
  { icon: UserCheck, label: "Attendance", path: "/attendance" },
  { icon: BookOpen, label: "Progress", path: "/progress" },
  { icon: Calendar, label: "Classes", path: "/classes" },
  { icon: MessageSquare, label: "Communication", path: "/communication" },
  { icon: CreditCard, label: "Finance", path: "/finance" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" }
]

// Dashboard stats
const dashboardStats = [
  {
    title: "Total Students",
    value: "248",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Today's Attendance", 
    value: "92%",
    change: "+2.1%",
    trend: "up",
    icon: UserCheck,
    color: "text-green-600"
  },
  {
    title: "Progress Updates",
    value: "45/52",
    change: "86%",
    trend: "up", 
    icon: TrendingUp,
    color: "text-purple-600"
  },
  {
    title: "Outstanding Fees",
    value: "£12,450",
    change: "-8.3%",
    trend: "down",
    icon: CreditCard,
    color: "text-orange-600"
  }
]

// Recent activities
const recentActivities = [
  {
    id: 1,
    type: "progress",
    student: "Fatima Al-Zahra",
    action: "Completed Surah Al-Baqarah verses 1-20",
    time: "2 hours ago",
    icon: BookOpen
  },
  {
    id: 2,
    type: "attendance",
    student: "Omar Ibn Khattab",
    action: "Marked present for Tajweed class",
    time: "3 hours ago", 
    icon: UserCheck
  },
  {
    id: 3,
    type: "communication",
    student: "Aisha Siddique",
    action: "Parent message sent regarding progress",
    time: "5 hours ago",
    icon: MessageSquare
  },
  {
    id: 4,
    type: "finance",
    student: "Ali Hassan",
    action: "Fee payment received",
    time: "1 day ago",
    icon: CreditCard
  }
]

function Sidebar({ isOpen, onClose, user, onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (path) => {
    navigate(path)
    onClose() // Close sidebar on mobile after navigation
  }

  // Filter navigation items based on user role
  const getFilteredNavigationItems = () => {
    let items = [...navigationItems]
    
    // Add User Management for Super Admin only
    if (user?.role === 'Super Admin') {
      items.splice(-1, 0, { icon: User, label: "User Management", path: "/users" })
    }
    
    return items
  }

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
          <div className="text-2xl">🕌</div>
          <div>
            <h1 className="font-bold text-sidebar-foreground">Al-Noor Academy</h1>
            <p className="text-sm text-sidebar-foreground/60">Management Portal</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 scrollbar-modern overflow-y-auto">
          {getFilteredNavigationItems().map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-modern text-left transition-modern hover-lift ${
                  isActive 
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-card' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
        
        {/* User Profile */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-3 rounded-modern bg-sidebar-accent mb-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sidebar-accent-foreground truncate">{user?.name || 'User'}</p>
              <p className="text-sm text-sidebar-accent-foreground/60">{user?.role || 'Role'}</p>
            </div>
          </div>
          
          <Button
            onClick={onLogout}
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-modern"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

function Header({ onMenuClick, user }) {
  const location = useLocation()
  
  const getPageTitle = () => {
    const path = location.pathname
    let allItems = [...navigationItems]
    
    // Add User Management for title resolution
    if (user?.role === 'Super Admin') {
      allItems.splice(-1, 0, { icon: User, label: "User Management", path: "/users" })
    }
    
    const item = allItems.find(item => item.path === path)
    return item ? item.label : 'Dashboard'
  }

  return (
    <header className="bg-card border-b border-border shadow-card">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden rounded-button"
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
              className="pl-10 pr-4 py-2 w-64 bg-background border border-input rounded-input focus-modern"
            />
          </div>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative rounded-button">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
              3
            </Badge>
          </Button>
          
          {/* Profile */}
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

function StatCard({ stat }) {
  const Icon = stat.icon
  return (
    <Card className="rounded-card shadow-card hover-lift transition-modern">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className={`text-sm flex items-center gap-1 mt-1 ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-3 h-3" />
              {stat.change}
            </p>
          </div>
          <div className={`p-3 rounded-modern bg-secondary ${stat.color}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ activity }) {
  const Icon = activity.icon
  return (
    <div className="flex items-start gap-4 p-4 rounded-modern hover:bg-muted/50 transition-modern">
      <div className="p-2 rounded-modern bg-primary/10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground">{activity.student}</p>
        <p className="text-sm text-muted-foreground">{activity.action}</p>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <Clock className="w-3 h-3" />
          {activity.time}
        </p>
      </div>
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate()

  const handleQuickAction = (action) => {
    switch(action) {
      case 'attendance':
        navigate('/attendance')
        break
      case 'progress':
        navigate('/progress')
        break
      case 'communication':
        navigate('/communication')
        break
      case 'reports':
        navigate('/reports')
        break
      default:
        break
    }
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="rounded-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => handleQuickAction('attendance')}
              className="w-full justify-start rounded-button hover-scale transition-modern"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Mark Attendance
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleQuickAction('progress')}
              className="w-full justify-start rounded-button hover-scale transition-modern"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Update Progress
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleQuickAction('communication')}
              className="w-full justify-start rounded-button hover-scale transition-modern"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleQuickAction('reports')}
              className="w-full justify-start rounded-button hover-scale transition-modern"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card className="lg:col-span-2 rounded-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 max-h-96 scrollbar-modern overflow-y-auto">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </CardContent>
        </Card>
      </div>
      
      {/* Additional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-modern bg-muted/50">
                <div>
                  <p className="font-medium">Quran Recitation</p>
                  <p className="text-sm text-muted-foreground">Grade 3A</p>
                </div>
                <Badge variant="secondary">9:00 AM</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-modern bg-muted/50">
                <div>
                  <p className="font-medium">Tajweed Class</p>
                  <p className="text-sm text-muted-foreground">Grade 4B</p>
                </div>
                <Badge variant="secondary">11:00 AM</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-modern bg-muted/50">
                <div>
                  <p className="font-medium">Islamic Studies</p>
                  <p className="text-sm text-muted-foreground">Grade 5A</p>
                </div>
                <Badge variant="secondary">2:00 PM</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Class Average Progress</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Attendance Rate</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Parent Engagement</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTenant, setCurrentTenant] = useState('demo1')
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    // Apply tenant theme
    document.documentElement.setAttribute('data-tenant', currentTenant)
  }, [currentTenant])

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('madrasah_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('madrasah_user')
      }
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('madrasah_user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('madrasah_user')
  }

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        tenant={tenants[currentTenant]} 
      />
    )
  }
  
  return (
    <Router>
      <div className="min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          user={user}
          onLogout={handleLogout}
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
          <Header onMenuClick={() => setSidebarOpen(true)} user={user} />
          
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentManagement />} />
              <Route path="/attendance" element={<AttendanceManagement />} />
              <Route path="/progress" element={<ProgressTracking />} />
              <Route path="/classes" element={<CurriculumManagement />} />
              <Route path="/communication" element={<CommunicationCenter />} />
              <Route path="/finance" element={<FinanceManagement />} />
              <Route path="/reports" element={<ReportsCenter />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
        
        {/* Theme Switcher (Demo) */}
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="rounded-card shadow-modal">
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-3">Demo Themes</p>
              <div className="flex gap-2">
                {Object.entries(tenants).map(([key, tenant]) => (
                  <Button
                    key={key}
                    size="sm"
                    variant={currentTenant === key ? "default" : "outline"}
                    onClick={() => setCurrentTenant(key)}
                    className="rounded-button"
                  >
                    {tenant.logo}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Router>
  )
}

export default App
