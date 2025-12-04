'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useTenant } from '@/lib/contexts/TenantContext'
import {
  FileText,
  Download,
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  Calendar,
  Loader2,
  RefreshCw,
  AlertCircle,
  BarChart3
} from 'lucide-react'

export function ReportsCenter() {
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

  const generateReport = (type: string) => {
    alert(`Generating ${type} report...`)
  }

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

  const totalRevenue = finance.reduce((sum, f) => sum + f.amount, 0)
  const totalCollected = finance.reduce((sum, f) => sum + f.paidAmount, 0)
  const avgAttendance = attendance.length > 0
    ? Math.round(attendance.filter(a => a.status === 'Present').length / attendance.length * 100)
    : 0
  const avgProgress = progress.length > 0
    ? Math.round(progress.reduce((sum, p) => sum + p.progressPercentage, 0) / progress.length)
    : 0

  const reports = [
    {
      title: 'Student Enrollment Report',
      description: 'Comprehensive list of all enrolled students with demographics',
      icon: Users,
      color: 'text-blue-500',
      stats: `${students.length} students`,
      type: 'enrollment'
    },
    {
      title: 'Attendance Report',
      description: 'Detailed attendance records and statistics',
      icon: Calendar,
      color: 'text-green-500',
      stats: `${avgAttendance}% avg attendance`,
      type: 'attendance'
    },
    {
      title: 'Academic Progress Report',
      description: 'Student progress across all subjects and assessments',
      icon: BookOpen,
      color: 'text-purple-500',
      stats: `${avgProgress}% avg progress`,
      type: 'progress'
    },
    {
      title: 'Financial Report',
      description: 'Fee collection, outstanding balances, and revenue analysis',
      icon: DollarSign,
      color: 'text-orange-500',
      stats: `£${totalCollected.toLocaleString()} collected`,
      type: 'financial'
    },
    {
      title: 'Class Performance Report',
      description: 'Class-wise performance metrics and comparisons',
      icon: TrendingUp,
      color: 'text-indigo-500',
      stats: `${students.length} students tracked`,
      type: 'performance'
    },
    {
      title: 'Monthly Summary Report',
      description: 'Comprehensive monthly overview of all activities',
      icon: BarChart3,
      color: 'text-pink-500',
      stats: 'All metrics included',
      type: 'monthly'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="w-8 h-8" />
            Reports Center
          </h2>
          <p className="text-muted-foreground mt-1">
            Generate and download comprehensive reports
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold text-green-600">{avgAttendance}%</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold text-purple-600">{avgProgress}%</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-orange-600">£{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => {
          const Icon = report.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-secondary ${report.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <Badge variant="secondary">{report.stats}</Badge>
                </div>

                <Button
                  className="w-full"
                  onClick={() => generateReport(report.type)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Download className="w-4 h-4 mr-2" />
              Export All Data (CSV)
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Generate Custom Report
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Automated Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
