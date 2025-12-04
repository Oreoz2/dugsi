'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTenant } from '@/lib/contexts/TenantContext'
import {
  BookOpen,
  TrendingUp,
  Users,
  Search,
  Download,
  Loader2,
  RefreshCw,
  Plus,
  Award,
  Target
} from 'lucide-react'

type ProgressRecord = {
  id: string
  studentId: string
  subject: string
  progressType: string
  currentLevel?: string
  progressPercentage: number
  grade?: string
  notes?: string
  assessmentDate: string
  student: {
    englishName: string
    arabicName?: string
    studentId: string
    classLevel?: string
  }
}

export function ProgressTracking() {
  const { tenant, isLoading: tenantLoading } = useTenant()
  const [records, setRecords] = useState<ProgressRecord[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')

  useEffect(() => {
    if (!tenant) return

    async function fetchData() {
      try {
        setLoading(true)
        const [progressRes, studentsRes] = await Promise.all([
          fetch('/api/progress'),
          fetch('/api/students')
        ])

        if (!progressRes.ok || !studentsRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const [progressData, studentsData] = await Promise.all([
          progressRes.json(),
          studentsRes.json()
        ])

        setRecords(progressData)
        setStudents(studentsData.filter((s: any) => s.tenantId === tenant.id))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tenant])

  const handleAddProgress = async (studentId: string, data: any) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          studentId,
          tenantId: tenant?.id,
        }),
      })

      if (!response.ok) throw new Error('Failed to add progress')

      const newRecord = await response.json()
      setRecords([...records, newRecord])
    } catch (err) {
      alert('Failed to add progress record')
    }
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

  const filteredRecords = records.filter(r => {
    const matchesSearch = r.student.englishName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || r.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  const avgProgress = records.length > 0
    ? Math.round(records.reduce((acc, r) => acc + r.progressPercentage, 0) / records.length)
    : 0

  const subjects = [...new Set(records.map(r => r.subject))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            Progress Tracking
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor student academic progress
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Progress
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{records.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold text-green-600">{avgProgress}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Students Tracked</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subjects</p>
                <p className="text-2xl font-bold">{subjects.length}</p>
              </div>
              <Target className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Progress Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map(record => (
          <Card key={record.id} className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{record.student.englishName}</h3>
                  <p className="text-sm text-muted-foreground">{record.student.studentId}</p>
                </div>
                <Badge>{record.subject}</Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span className="font-bold">{record.progressPercentage}%</span>
                  </div>
                  <Progress value={record.progressPercentage} className="h-2" />
                </div>

                {record.grade && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Grade:</span>
                    <Badge variant="secondary">{record.grade}</Badge>
                  </div>
                )}

                {record.currentLevel && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Level:</span>
                    <span className="font-medium">{record.currentLevel}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{record.progressType}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Assessed:</span>
                  <span>{new Date(record.assessmentDate).toLocaleDateString()}</span>
                </div>

                {record.notes && (
                  <p className="text-sm text-muted-foreground italic mt-2">
                    {record.notes}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Progress Records</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedSubject !== 'all'
                ? 'Try adjusting your filters'
                : 'Start tracking student progress'}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Progress Record
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
