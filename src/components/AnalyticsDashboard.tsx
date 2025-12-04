'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useTenant } from '@/lib/contexts/TenantContext'
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  Calendar,
  Loader2,
  RefreshCw,
  AlertCircle,
  Target,
  Award,
  Activity
} from 'lucide-react'

export function AnalyticsDashboard() {
  const { tenant, isLoading: tenantLoading } = useTenant()
  const [students, setStudents] = useState<any[]>([])
  const [attendance, setAttendance] = useState<any[]>([])
  const [progress, setProgress] = useState<any[]>([])
  const [finance, setFinance] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!tenant) return

    async function fetchData() {
      try {
        setLoading(true)
        const [studentsRes, attendanceRes, progressRes, financeRes] = await Promise.all([
          fetch('/api/students'),
          fetch('/api/attendance'),
          fetch('/api/progress'),
          fetch('/api/finance')
        ])

        const [studentsData, attendanceData, progressData, financeData] = await Promise.all([
          studentsRes.json(),
          attendanceRes.json(),
          progressRes.json(),
          financeRes.json()
        ])

        setStudents(studentsData.filter((s: any) => s.tenantId === tenant.id))
        setAttendance(attendanceData)
        setProgress(progressData)
        setFinance(financeData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tenant])

  if (tenantLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Calculate metrics
  const totalStudents = students.length
  const activeStudents = students.filter(s => s.status === 'Active').length

  const presentCount = attendance.filter(a => a.status === 'Present').length
  const avgAttendance = attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 0

  const avgProgress = progress.length > 0
    ? Math.round(progress.reduce((sum, p) => sum + p.progressPercentage, 0) / progress.length)
    : 0

  const totalRevenue = finance.reduce((sum, f) => sum + f.amount, 0)
  const totalCollected = finance.reduce((sum, f) => sum + f.paidAmount, 0)
  const collectionRate = totalRevenue > 0 ? Math.round((totalCollected / totalRevenue) * 100) : 0

  // Trend calculations (comparing to previous period - simplified)
  const studentGrowth = 12 // Mock growth percentage
  const attendanceTrend = 5 // Mock trend
  const progressTrend = 8 // Mock trend
  const revenueTrend = 15 // Mock trend

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="w-8 h-8" />
            Analytics Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">
            Real-time insights and performance metrics
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+{studentGrowth}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl font-bold text-green-600">{avgAttendance}%</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+{attendanceTrend}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold text-purple-600">{avgProgress}%</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+{progressTrend}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-orange-600">£{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+{revenueTrend}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Performance Indicators
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Student Enrollment</span>
                <span className="font-bold">{activeStudents}/{totalStudents}</span>
              </div>
              <Progress value={(activeStudents / totalStudents) * 100} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Attendance Rate</span>
                <span className="font-bold">{avgAttendance}%</span>
              </div>
              <Progress value={avgAttendance} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Academic Progress</span>
                <span className="font-bold">{avgProgress}%</span>
              </div>
              <Progress value={avgProgress} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Fee Collection</span>
                <span className="font-bold">{collectionRate}%</span>
              </div>
              <Progress value={collectionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Users className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">{students.length} students enrolled</p>
                <p className="text-xs text-muted-foreground">Total student count</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="w-5 h-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">{attendance.length} attendance records</p>
                <p className="text-xs text-muted-foreground">Tracked this period</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">{progress.length} progress updates</p>
                <p className="text-xs text-muted-foreground">Academic assessments</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <DollarSign className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">£{totalCollected.toLocaleString()} collected</p>
                <p className="text-xs text-muted-foreground">Out of £{totalRevenue.toLocaleString()} total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Top Performers</p>
                <p className="text-lg font-bold">
                  {progress.filter(p => p.progressPercentage >= 90).length} students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">On Track</p>
                <p className="text-lg font-bold">
                  {progress.filter(p => p.progressPercentage >= 70 && p.progressPercentage < 90).length} students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Need Support</p>
                <p className="text-lg font-bold">
                  {progress.filter(p => p.progressPercentage < 70).length} students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
