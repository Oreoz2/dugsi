'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTenant } from '@/lib/contexts/TenantContext'
import {
  Calendar,
  UserCheck,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Download,
  Loader2,
  RefreshCw,
  Save,
  Eye
} from 'lucide-react'

type AttendanceRecord = {
  id: string
  studentId: string
  date: string
  status: string
  notes?: string
  student: {
    englishName: string
    arabicName?: string
    studentId: string
    classLevel?: string
  }
}

export function AttendanceManagement() {
  const { tenant, isLoading: tenantLoading } = useTenant()
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)

  // Fetch attendance records
  useEffect(() => {
    if (!tenant) return

    async function fetchData() {
      try {
        setLoading(true)
        const [attendanceRes, studentsRes] = await Promise.all([
          fetch(`/api/attendance?date=${selectedDate}`),
          fetch('/api/students')
        ])

        if (!attendanceRes.ok || !studentsRes.ok) {
          throw new Error('Failed to fetch data')
        }

        const [attendanceData, studentsData] = await Promise.all([
          attendanceRes.json(),
          studentsRes.json()
        ])

        setRecords(attendanceData)
        setStudents(studentsData.filter((s: any) => s.tenantId === tenant.id))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tenant, selectedDate])

  const handleMarkAttendance = async (studentId: string, status: string) => {
    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          date: selectedDate,
          status,
          tenantId: tenant?.id,
        }),
      })

      if (!response.ok) throw new Error('Failed to mark attendance')

      const newRecord = await response.json()
      setRecords([...records, newRecord])
    } catch (err) {
      alert('Failed to mark attendance')
    }
  }

  const handleBulkMarkPresent = async () => {
    try {
      const promises = students
        .filter(s => !records.find(r => r.studentId === s.id))
        .map(student =>
          fetch('/api/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              studentId: student.id,
              date: selectedDate,
              status: 'Present',
              tenantId: tenant?.id,
            }),
          })
        )

      await Promise.all(promises)

      // Refresh data
      const response = await fetch(`/api/attendance?date=${selectedDate}`)
      const data = await response.json()
      setRecords(data)
    } catch (err) {
      alert('Failed to mark all present')
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

  const todayRecords = records.filter(r => r.date.startsWith(selectedDate))
  const presentCount = todayRecords.filter(r => r.status === 'Present').length
  const absentCount = todayRecords.filter(r => r.status === 'Absent').length
  const lateCount = todayRecords.filter(r => r.status === 'Late').length
  const attendanceRate = students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <UserCheck className="w-8 h-8" />
            Attendance Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Track and manage student attendance
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { }}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleBulkMarkPresent}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Present
          </Button>
        </div>
      </div>

      {/* Stats */}
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
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-red-600">{absentCount}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-2xl font-bold">{attendanceRate}%</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="date">Date:</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-auto"
            />
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance - {new Date(selectedDate).toLocaleDateString()}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {students
              .filter(s => s.englishName.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(student => {
                const record = todayRecords.find(r => r.studentId === student.id)
                return (
                  <Card key={student.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{student.englishName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {student.studentId} • {student.classLevel || 'No class'}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {record ? (
                            <Badge className={
                              record.status === 'Present' ? 'bg-green-500' :
                                record.status === 'Absent' ? 'bg-red-500' :
                                  record.status === 'Late' ? 'bg-orange-500' :
                                    'bg-blue-500'
                            }>
                              {record.status}
                            </Badge>
                          ) : (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleMarkAttendance(student.id, 'Present')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Present
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMarkAttendance(student.id, 'Absent')}
                              >
                                Absent
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMarkAttendance(student.id, 'Late')}
                              >
                                Late
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
