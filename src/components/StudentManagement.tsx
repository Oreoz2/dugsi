'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useTenant } from '@/lib/contexts/TenantContext'
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  Heart,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  User,
  School,
  Loader2,
  RefreshCw
} from 'lucide-react'

type Student = {
  id: string
  studentId: string
  englishName: string
  arabicName?: string | null
  dateOfBirth?: Date | null
  gender?: string | null
  classLevel?: string | null
  yearGroup?: string | null
  status: string
  enrollmentDate: Date
  phone?: string | null
  email?: string | null
  address?: string | null
  guardianName?: string | null
  guardianPhone?: string | null
  guardianEmail?: string | null
  guardianRelationship?: string | null
  quranProgress: number
  attendanceRate: number
  outstandingFees: number
}

export default function StudentManagement() {
  const { tenant, isLoading: tenantLoading } = useTenant()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // Fetch students
  useEffect(() => {
    if (!tenant) return

    async function fetchStudents() {
      try {
        setLoading(true)
        const response = await fetch('/api/students')

        if (!response.ok) {
          throw new Error('Failed to fetch students')
        }

        const data = await response.json()
        // Filter by current tenant
        const tenantStudents = data.filter((s: any) => s.tenantId === tenant.id)
        setStudents(tenantStudents)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [tenant])

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || student.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete student')

      setStudents(students.filter(s => s.id !== id))
    } catch (err) {
      alert('Failed to delete student')
    }
  }

  const handleSave = async (formData: any) => {
    try {
      const method = selectedStudent ? 'PATCH' : 'POST'
      const url = selectedStudent ? `/api/students/${selectedStudent.id}` : '/api/students'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tenantId: tenant?.id,
        }),
      })

      if (!response.ok) throw new Error('Failed to save student')

      const savedStudent = await response.json()

      if (selectedStudent) {
        setStudents(students.map(s => s.id === savedStudent.id ? savedStudent : s))
      } else {
        setStudents([...students, savedStudent])
      }

      setShowForm(false)
      setSelectedStudent(null)
    } catch (err) {
      alert('Failed to save student')
    }
  }

  if (tenantLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading students...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Students</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showForm) {
    return (
      <StudentForm
        student={selectedStudent}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false)
          setSelectedStudent(null)
        }}
      />
    )
  }

  if (showDetails && selectedStudent) {
    return (
      <StudentDetails
        student={selectedStudent}
        onClose={() => {
          setShowDetails(false)
          setSelectedStudent(null)
        }}
        onEdit={(student) => {
          setSelectedStudent(student)
          setShowDetails(false)
          setShowForm(true)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-8 h-8" />
            Student Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage student records and information
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedStudent(null)
            setShowForm(true)
          }}
          className="rounded-md"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
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
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {students.filter(s => s.status === 'Active').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold">
                  {students.length > 0
                    ? Math.round(students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length)
                    : 0}%
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Fees</p>
                <p className="text-2xl font-bold text-orange-600">
                  £{students.reduce((acc, s) => acc + s.outstandingFees, 0).toLocaleString()}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-md bg-background"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
            </select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      {filteredStudents.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Students Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by adding your first student'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Button onClick={() => setShowForm(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={(s) => {
                setSelectedStudent(s)
                setShowForm(true)
              }}
              onDelete={handleDelete}
              onView={(s) => {
                setSelectedStudent(s)
                setShowDetails(true)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// StudentCard, StudentForm, and StudentDetails components remain the same but I'll include them for completeness
function StudentCard({ student, onEdit, onDelete, onView }: any) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-orange-500'
      case 'graduated': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {student.englishName.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{student.englishName}</h3>
              {student.arabicName && (
                <p className="text-sm text-muted-foreground">{student.arabicName}</p>
              )}
              <p className="text-xs text-muted-foreground">ID: {student.studentId}</p>
            </div>
          </div>

          <div className={`w-3 h-3 rounded-full ${getStatusColor(student.status)}`} />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <School className="w-4 h-4 text-muted-foreground" />
            <span>{student.classLevel || 'No class'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Attendance: {student.attendanceRate}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onView(student)}>
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(student)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(student.id)} className="text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {student.outstandingFees > 0 && (
            <Badge variant="destructive">£{student.outstandingFees} due</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function StudentForm({ student, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    studentId: student?.studentId || '',
    englishName: student?.englishName || '',
    arabicName: student?.arabicName || '',
    dateOfBirth: student?.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : '',
    gender: student?.gender || 'Male',
    classLevel: student?.classLevel || '',
    yearGroup: student?.yearGroup || '',
    status: student?.status || 'Active',
    phone: student?.phone || '',
    email: student?.email || '',
    address: student?.address || '',
    guardianName: student?.guardianName || '',
    guardianPhone: student?.guardianPhone || '',
    guardianEmail: student?.guardianEmail || '',
    guardianRelationship: student?.guardianRelationship || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{student ? 'Edit Student' : 'Add New Student'}</CardTitle>
        <CardDescription>
          {student ? 'Update student information' : 'Register a new student'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="contact">Contact & Family</TabsTrigger>
              <TabsTrigger value="academic">Academic Info</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="englishName">Full Name (English)</Label>
                  <Input
                    id="englishName"
                    value={formData.englishName}
                    onChange={(e) => setFormData({ ...formData, englishName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="arabicName">Full Name (Arabic)</Label>
                  <Input
                    id="arabicName"
                    value={formData.arabicName}
                    onChange={(e) => setFormData({ ...formData, arabicName: e.target.value })}
                    dir="rtl"
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="guardianName">Parent/Guardian Name</Label>
                  <Input
                    id="guardianName"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="guardianPhone">Guardian Phone</Label>
                  <Input
                    id="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="guardianEmail">Guardian Email</Label>
                  <Input
                    id="guardianEmail"
                    type="email"
                    value={formData.guardianEmail}
                    onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="guardianRelationship">Relationship</Label>
                  <Input
                    id="guardianRelationship"
                    value={formData.guardianRelationship}
                    onChange={(e) => setFormData({ ...formData, guardianRelationship: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Full address including postcode..."
                />
              </div>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="classLevel">Class</Label>
                  <Input
                    id="classLevel"
                    value={formData.classLevel}
                    onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="yearGroup">Year Group</Label>
                  <Input
                    id="yearGroup"
                    value={formData.yearGroup}
                    onChange={(e) => setFormData({ ...formData, yearGroup: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {student ? 'Update Student' : 'Add Student'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function StudentDetails({ student, onClose, onEdit }: any) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {student.englishName.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{student.englishName}</CardTitle>
              {student.arabicName && (
                <CardDescription className="text-base">{student.arabicName}</CardDescription>
              )}
              <Badge variant="secondary" className="mt-1">
                ID: {student.studentId}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onEdit(student)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Personal Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gender:</span>
                  <span>{student.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date of Birth:</span>
                  <span>{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Class:</span>
                  <span>{student.classLevel || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge>{student.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Guardian Information</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{student.guardianName || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{student.guardianPhone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{student.guardianEmail || 'N/A'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {student.address && (
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </h4>
              <p className="text-sm text-muted-foreground">{student.address}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
