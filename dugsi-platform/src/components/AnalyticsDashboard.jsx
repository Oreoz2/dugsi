import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar
} from 'recharts'
import { 
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  Calendar,
  Clock,
  Target,
  Award,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Share,
  Settings,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Star,
  Zap,
  Globe,
  Smartphone,
  Mail,
  Phone,
  MessageSquare,
  Bell,
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Calculator,
  FileText,
  Printer,
  Save,
  Upload,
  ExternalLink,
  Copy,
  Archive,
  Bookmark,
  Flag,
  Heart,
  ThumbsUp,
  Smile,
  Frown,
  Meh,
  MapPin,
  Building,
  School,
  Home,
  Car,
  Bus,
  Train,
  Plane,
  Ship,
  Bike
} from 'lucide-react'

// Mock analytics data
const mockAnalyticsData = {
  overview: {
    totalStudents: 156,
    totalTeachers: 12,
    totalClasses: 8,
    averageAttendance: 92.5,
    totalRevenue: 45600,
    collectionRate: 87.3,
    activeAnnouncements: 5,
    pendingTasks: 3
  },
  
  attendanceData: [
    { month: 'Jan', attendance: 89, target: 90 },
    { month: 'Feb', attendance: 91, target: 90 },
    { month: 'Mar', attendance: 88, target: 90 },
    { month: 'Apr', attendance: 93, target: 90 },
    { month: 'May', attendance: 95, target: 90 },
    { month: 'Jun', attendance: 92, target: 90 },
    { month: 'Jul', attendance: 94, target: 90 },
    { month: 'Aug', attendance: 92, target: 90 }
  ],
  
  progressData: [
    { subject: 'Quran', beginner: 45, intermediate: 35, advanced: 20 },
    { subject: 'Arabic', beginner: 50, intermediate: 30, advanced: 25 },
    { subject: 'Aqeedah', beginner: 40, intermediate: 40, advanced: 30 },
    { subject: 'Fiqh', beginner: 55, intermediate: 25, advanced: 20 },
    { subject: 'Seerah', beginner: 48, intermediate: 32, advanced: 28 },
    { subject: 'Hadith', beginner: 42, intermediate: 38, advanced: 25 }
  ],
  
  revenueData: [
    { month: 'Jan', revenue: 38000, expenses: 25000, profit: 13000 },
    { month: 'Feb', revenue: 42000, expenses: 26000, profit: 16000 },
    { month: 'Mar', revenue: 39000, expenses: 24000, profit: 15000 },
    { month: 'Apr', revenue: 45000, expenses: 28000, profit: 17000 },
    { month: 'May', revenue: 47000, expenses: 29000, profit: 18000 },
    { month: 'Jun', revenue: 44000, expenses: 27000, profit: 17000 },
    { month: 'Jul', revenue: 48000, expenses: 30000, profit: 18000 },
    { month: 'Aug', revenue: 45600, expenses: 28500, profit: 17100 }
  ],
  
  classDistribution: [
    { name: 'Year 5', value: 22, color: '#8884d8' },
    { name: 'Year 6', value: 25, color: '#82ca9d' },
    { name: 'Year 7', value: 28, color: '#ffc658' },
    { name: 'Year 8', value: 24, color: '#ff7c7c' },
    { name: 'Year 9', value: 20, color: '#8dd1e1' },
    { name: 'Year 10', value: 18, color: '#d084d0' },
    { name: 'Year 11', value: 12, color: '#ffb347' },
    { name: 'Year 12', value: 7, color: '#87ceeb' }
  ],
  
  performanceMetrics: [
    { metric: 'Quran Memorization', current: 78, target: 85, trend: 'up' },
    { metric: 'Arabic Proficiency', current: 82, target: 80, trend: 'up' },
    { metric: 'Islamic Studies', current: 75, target: 80, trend: 'down' },
    { metric: 'Attendance Rate', current: 92, target: 90, trend: 'up' },
    { metric: 'Fee Collection', current: 87, target: 90, trend: 'up' },
    { metric: 'Parent Satisfaction', current: 94, target: 95, trend: 'stable' }
  ],
  
  topPerformers: [
    { name: 'Fatima Al-Zahra', class: 'Year 7', score: 98, subject: 'Quran', avatar: 'FA' },
    { name: 'Omar Ibn Khattab', class: 'Year 9', score: 96, subject: 'Arabic', avatar: 'OIK' },
    { name: 'Aisha Siddique', class: 'Year 5', score: 95, subject: 'Aqeedah', avatar: 'AS' },
    { name: 'Ali Hassan', class: 'Year 8', score: 94, subject: 'Fiqh', avatar: 'AH' },
    { name: 'Maryam Ahmed', class: 'Year 6', score: 93, subject: 'Seerah', avatar: 'MA' }
  ],
  
  recentActivities: [
    { type: 'attendance', message: 'Year 7 achieved 98% attendance this week', time: '2 hours ago', icon: Users },
    { type: 'progress', message: 'Omar completed Juz 15 memorization', time: '4 hours ago', icon: Award },
    { type: 'payment', message: 'Received $1,200 in fee payments today', time: '6 hours ago', icon: DollarSign },
    { type: 'announcement', message: 'New Ramadan schedule published', time: '1 day ago', icon: Bell },
    { type: 'achievement', message: '5 students completed Arabic Level 2', time: '2 days ago', icon: Star }
  ]
}

function MetricCard({ title, value, change, changeType, icon: Icon, color = "blue" }) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    orange: "text-orange-600 bg-orange-100",
    purple: "text-purple-600 bg-purple-100",
    red: "text-red-600 bg-red-100",
    teal: "text-teal-600 bg-teal-100"
  }

  return (
    <Card className="rounded-card shadow-card hover-lift transition-modern">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {change && (
              <div className={`flex items-center mt-2 text-sm ${
                changeType === 'positive' ? 'text-green-600' : 
                changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {changeType === 'positive' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : changeType === 'negative' ? (
                  <TrendingDown className="w-4 h-4 mr-1" />
                ) : (
                  <Activity className="w-4 h-4 mr-1" />
                )}
                {change}
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="w-8 h-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function PerformanceMetricCard({ metric }) {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getProgressColor = (current, target) => {
    if (current >= target) return 'bg-green-600'
    if (current >= target * 0.8) return 'bg-orange-600'
    return 'bg-red-600'
  }

  const percentage = Math.min((metric.current / metric.target) * 100, 100)

  return (
    <Card className="rounded-card shadow-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-sm">{metric.metric}</h4>
          {getTrendIcon(metric.trend)}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Current: {metric.current}%</span>
            <span>Target: {metric.target}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(metric.current, metric.target)}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            {metric.current >= metric.target ? 'Target Achieved' : `${metric.target - metric.current}% to target`}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TopPerformerCard({ performer }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-card border border-border hover:bg-muted/50 transition-colors">
      <Avatar className="w-10 h-10">
        <AvatarFallback className="bg-primary text-primary-foreground">
          {performer.avatar}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <h4 className="font-medium text-sm">{performer.name}</h4>
        <p className="text-xs text-muted-foreground">{performer.class} • {performer.subject}</p>
      </div>
      
      <div className="text-right">
        <div className="font-bold text-lg text-green-600">{performer.score}%</div>
        <div className="flex items-center">
          <Star className="w-3 h-3 text-yellow-500 mr-1" />
          <span className="text-xs text-muted-foreground">Top Score</span>
        </div>
      </div>
    </div>
  )
}

function ActivityItem({ activity }) {
  const Icon = activity.icon

  return (
    <div className="flex items-start gap-3 p-3 rounded-card hover:bg-muted/50 transition-colors">
      <div className="p-2 bg-muted rounded-full">
        <Icon className="w-4 h-4" />
      </div>
      
      <div className="flex-1">
        <p className="text-sm">{activity.message}</p>
        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
      </div>
    </div>
  )
}

export function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('last-30-days')

  const data = mockAnalyticsData

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights and performance metrics
          </p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="last-year">Last Year</option>
          </select>
          
          <Button variant="outline" className="rounded-button">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          
          <Button variant="outline" className="rounded-button">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          
          <Button className="rounded-button">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Students"
          value={data.overview.totalStudents}
          change="+8% from last month"
          changeType="positive"
          icon={Users}
          color="blue"
        />
        
        <MetricCard
          title="Average Attendance"
          value={`${data.overview.averageAttendance}%`}
          change="+2.5% from last month"
          changeType="positive"
          icon={Calendar}
          color="green"
        />
        
        <MetricCard
          title="Total Revenue"
          value={`$${data.overview.totalRevenue.toLocaleString()}`}
          change="+12% from last month"
          changeType="positive"
          icon={DollarSign}
          color="purple"
        />
        
        <MetricCard
          title="Collection Rate"
          value={`${data.overview.collectionRate}%`}
          change="+3.2% from last month"
          changeType="positive"
          icon={Target}
          color="teal"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 rounded-modern">
          <TabsTrigger value="overview" className="rounded-button">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="attendance" className="rounded-button">
            <Calendar className="w-4 h-4 mr-2" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="progress" className="rounded-button">
            <GraduationCap className="w-4 h-4 mr-2" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="finance" className="rounded-button">
            <DollarSign className="w-4 h-4 mr-2" />
            Finance
          </TabsTrigger>
          <TabsTrigger value="performance" className="rounded-button">
            <Award className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Class Distribution */}
            <Card className="rounded-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Student Distribution by Class
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.classDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.classDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="rounded-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Key Performance Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {data.performanceMetrics.slice(0, 4).map((metric, index) => (
                    <PerformanceMetricCard key={index} metric={metric} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card className="rounded-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Top Performers This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.topPerformers.map((performer, index) => (
                    <TopPerformerCard key={index} performer={performer} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="rounded-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.recentActivities.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChartIcon className="w-5 h-5" />
                Attendance Trends
              </CardTitle>
              <CardDescription>
                Monthly attendance rates compared to targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data.attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#8884d8" 
                    strokeWidth={3}
                    name="Actual Attendance"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Student Progress by Subject
              </CardTitle>
              <CardDescription>
                Distribution of students across different learning levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="beginner" stackId="a" fill="#ffc658" name="Beginner" />
                  <Bar dataKey="intermediate" stackId="a" fill="#8884d8" name="Intermediate" />
                  <Bar dataKey="advanced" stackId="a" fill="#82ca9d" name="Advanced" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Financial Performance
              </CardTitle>
              <CardDescription>
                Monthly revenue, expenses, and profit analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    name="Revenue"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stackId="2" 
                    stroke="#ff7c7c" 
                    fill="#ff7c7c" 
                    name="Expenses"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="profit" 
                    stackId="3" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    name="Profit"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.performanceMetrics.map((metric, index) => (
              <PerformanceMetricCard key={index} metric={metric} />
            ))}
          </div>

          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Detailed Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Academic Excellence</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Students with 90%+ scores:</span>
                        <span className="font-medium">42 (27%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Students with 80-89% scores:</span>
                        <span className="font-medium">68 (44%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Students with 70-79% scores:</span>
                        <span className="font-medium">35 (22%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Students below 70%:</span>
                        <span className="font-medium text-red-600">11 (7%)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Improvement Areas</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <span className="text-sm">Islamic Studies needs attention</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Arabic proficiency exceeding targets</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Attendance consistently high</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm">Parent satisfaction very positive</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AnalyticsDashboard

