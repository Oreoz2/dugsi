import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  Calendar,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3,
  TrendingUp,
  TrendingDown,
  User,
  School,
  BookOpen,
  Eye,
  Edit,
  Save,
  RotateCcw,
  Plus,
  Minus,
  CalendarDays,
  Timer,
  UserCheck,
  UserX,
  Clock3,
  MapPin,
  MessageSquare
} from 'lucide-react'

// Mock attendance data
const mockAttendanceData = [
  {
    id: 1,
    date: '2024-08-10',
    class: 'Year 7',
    teacher: 'Ustadha Fatima',
    totalStudents: 12,
    present: 11,
    absent: 1,
    late: 0,
    excused: 0,
    students: [
      { id: 1, name: 'Fatima Al-Zahra', status: 'present', time: '09:00', notes: '' },
      { id: 2, name: 'Omar Ibn Khattab', status: 'present', time: '09:02', notes: '' },
      { id: 3, name: 'Aisha Siddique', status: 'absent', time: '', notes: 'Family emergency' },
      { id: 4, name: 'Ali Hassan', status: 'present', time: '08:58', notes: '' },
      { id: 5, name: 'Khadija Bint Khuwaylid', status: 'present', time: '09:01', notes: '' },
      { id: 6, name: 'Umar Al-Faruq', status: 'present', time: '09:05', notes: '' },
      { id: 7, name: 'Zainab Al-Kubra', status: 'present', time: '08:55', notes: '' },
      { id: 8, name: 'Hassan Ibn Ali', status: 'present', time: '09:03', notes: '' },
      { id: 9, name: 'Ruqayyah Bint Muhammad', status: 'present', time: '09:00', notes: '' },
      { id: 10, name: 'Abdullah Ibn Abbas', status: 'present', time: '08:59', notes: '' },
      { id: 11, name: 'Umm Kulthum', status: 'present', time: '09:04', notes: '' },
      { id: 12, name: 'Bilal Ibn Rabah', status: 'present', time: '09:01', notes: '' }
    ]
  },
  {
    id: 2,
    date: '2024-08-09',
    class: 'Year 7',
    teacher: 'Ustadha Fatima',
    totalStudents: 12,
    present: 10,
    absent: 2,
    late: 0,
    excused: 1,
    students: [
      { id: 1, name: 'Fatima Al-Zahra', status: 'present', time: '09:00', notes: '' },
      { id: 2, name: 'Omar Ibn Khattab', status: 'absent', time: '', notes: 'Sick' },
      { id: 3, name: 'Aisha Siddique', status: 'present', time: '09:01', notes: '' },
      { id: 4, name: 'Ali Hassan', status: 'excused', time: '', notes: 'Medical appointment' },
      { id: 5, name: 'Khadija Bint Khuwaylid', status: 'present', time: '09:02', notes: '' },
      { id: 6, name: 'Umar Al-Faruq', status: 'present', time: '09:00', notes: '' },
      { id: 7, name: 'Zainab Al-Kubra', status: 'present', time: '08:58', notes: '' },
      { id: 8, name: 'Hassan Ibn Ali', status: 'present', time: '09:03', notes: '' },
      { id: 9, name: 'Ruqayyah Bint Muhammad', status: 'absent', time: '', notes: 'No reason provided' },
      { id: 10, name: 'Abdullah Ibn Abbas', status: 'present', time: '09:01', notes: '' },
      { id: 11, name: 'Umm Kulthum', status: 'present', time: '09:00', notes: '' },
      { id: 12, name: 'Bilal Ibn Rabah', status: 'present', time: '09:02', notes: '' }
    ]
  }
]

const classes = [
  { id: 1, name: 'Year 5', level: 'Beginner', students: 15, teacher: 'Ustadha Khadija', schedule: '09:00-10:30' },
  { id: 2, name: 'Year 6', level: 'Beginner', students: 18, teacher: 'Ustadh Muhammad', schedule: '10:45-12:15' },
  { id: 3, name: 'Year 7', level: 'Intermediate', students: 12, teacher: 'Ustadha Fatima', schedule: '09:00-10:30' },
  { id: 4, name: 'Year 8', level: 'Intermediate', students: 14, teacher: 'Ustadh Omar', schedule: '13:00-14:30' },
  { id: 5, name: 'Year 9', level: 'Advanced', students: 10, teacher: 'Ustadh Abdullah', schedule: '14:45-16:15' }
]

function AttendanceCard({ attendance, onEdit, onView }) {
  const attendanceRate = Math.round((attendance.present / attendance.totalStudents) * 100)
  
  const getAttendanceColor = (rate) => {
    if (rate >= 95) return 'text-green-600'
    if (rate >= 85) return 'text-blue-600'
    if (rate >= 75) return 'text-orange-600'
    return 'text-red-600'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <Card className="rounded-card shadow-card hover-lift transition-modern">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">{attendance.class}</h3>
            <p className="text-sm text-muted-foreground">{formatDate(attendance.date)}</p>
            <p className="text-xs text-muted-foreground">Teacher: {attendance.teacher}</p>
          </div>
          
          <div className="text-right">
            <div className={`text-2xl font-bold ${getAttendanceColor(attendanceRate)}`}>
              {attendanceRate}%
            </div>
            <p className="text-xs text-muted-foreground">Attendance</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-sm font-medium">{attendance.present}</p>
            <p className="text-xs text-muted-foreground">Present</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mx-auto mb-1">
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-sm font-medium">{attendance.absent}</p>
            <p className="text-xs text-muted-foreground">Absent</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mx-auto mb-1">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-sm font-medium">{attendance.late}</p>
            <p className="text-xs text-muted-foreground">Late</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-1">
              <AlertCircle className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm font-medium">{attendance.excused}</p>
            <p className="text-xs text-muted-foreground">Excused</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Total: {attendance.totalStudents} students
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(attendance)}
              className="rounded-button"
            >
              <Eye className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(attendance)}
              className="rounded-button"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AttendanceForm({ selectedClass, selectedDate, onSave, onCancel }) {
  const [attendanceData, setAttendanceData] = useState(() => {
    // Initialize with mock data or empty data
    const existingData = mockAttendanceData.find(
      a => a.class === selectedClass && a.date === selectedDate
    )
    
    if (existingData) {
      return existingData.students
    }
    
    // Create empty attendance data for the class
    const classInfo = classes.find(c => c.name === selectedClass)
    if (!classInfo) return []
    
    // Mock student list for the class
    const mockStudents = [
      'Fatima Al-Zahra', 'Omar Ibn Khattab', 'Aisha Siddique', 'Ali Hassan',
      'Khadija Bint Khuwaylid', 'Umar Al-Faruq', 'Zainab Al-Kubra', 'Hassan Ibn Ali',
      'Ruqayyah Bint Muhammad', 'Abdullah Ibn Abbas', 'Umm Kulthum', 'Bilal Ibn Rabah'
    ].slice(0, classInfo.students)
    
    return mockStudents.map((name, index) => ({
      id: index + 1,
      name,
      status: 'present',
      time: '',
      notes: ''
    }))
  })

  const updateStudentStatus = (studentId, status) => {
    setAttendanceData(prev => prev.map(student => 
      student.id === studentId 
        ? { 
            ...student, 
            status, 
            time: status === 'present' ? new Date().toLocaleTimeString('en-GB', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }) : ''
          }
        : student
    ))
  }

  const updateStudentNotes = (studentId, notes) => {
    setAttendanceData(prev => prev.map(student => 
      student.id === studentId ? { ...student, notes } : student
    ))
  }

  const markAllPresent = () => {
    const currentTime = new Date().toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    setAttendanceData(prev => prev.map(student => ({
      ...student,
      status: 'present',
      time: currentTime
    })))
  }

  const markAllAbsent = () => {
    setAttendanceData(prev => prev.map(student => ({
      ...student,
      status: 'absent',
      time: ''
    })))
  }

  const handleSave = () => {
    const summary = {
      class: selectedClass,
      date: selectedDate,
      students: attendanceData,
      present: attendanceData.filter(s => s.status === 'present').length,
      absent: attendanceData.filter(s => s.status === 'absent').length,
      late: attendanceData.filter(s => s.status === 'late').length,
      excused: attendanceData.filter(s => s.status === 'excused').length,
      totalStudents: attendanceData.length
    }
    onSave(summary)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-500 hover:bg-green-600'
      case 'absent': return 'bg-red-500 hover:bg-red-600'
      case 'late': return 'bg-orange-500 hover:bg-orange-600'
      case 'excused': return 'bg-blue-500 hover:bg-blue-600'
      default: return 'bg-gray-500 hover:bg-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />
      case 'absent': return <XCircle className="w-4 h-4" />
      case 'late': return <Clock className="w-4 h-4" />
      case 'excused': return <AlertCircle className="w-4 h-4" />
      default: return <User className="w-4 h-4" />
    }
  }

  return (
    <Card className="rounded-card shadow-modal">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Mark Attendance
            </CardTitle>
            <CardDescription>
              {selectedClass} - {new Date(selectedDate).toLocaleDateString('en-GB', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </CardDescription>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllPresent}
              className="rounded-button"
            >
              <Plus className="w-4 h-4 mr-1" />
              All Present
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAbsent}
              className="rounded-button"
            >
              <Minus className="w-4 h-4 mr-1" />
              All Absent
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {attendanceData.map(student => (
            <Card key={student.id} className="rounded-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{student.name}</h4>
                      {student.time && (
                        <p className="text-sm text-muted-foreground">
                          Arrived: {student.time}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {['present', 'absent', 'late', 'excused'].map(status => (
                        <Button
                          key={status}
                          variant={student.status === status ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updateStudentStatus(student.id, status)}
                          className={`rounded-button ${
                            student.status === status 
                              ? `${getStatusColor(status)} text-white` 
                              : ''
                          }`}
                        >
                          {getStatusIcon(status)}
                          <span className="ml-1 capitalize">{status}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {(student.status === 'absent' || student.status === 'excused' || student.notes) && (
                  <div className="mt-3">
                    <Input
                      placeholder="Add notes (reason for absence, etc.)"
                      value={student.notes}
                      onChange={(e) => updateStudentNotes(student.id, e.target.value)}
                      className="rounded-input"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 rounded-button"
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleSave}
            className="flex-1 rounded-button"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Attendance
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AttendanceDetails({ attendance, onClose, onEdit }) {
  if (!attendance) return null

  const attendanceRate = Math.round((attendance.present / attendance.totalStudents) * 100)
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100'
      case 'absent': return 'text-red-600 bg-red-100'
      case 'late': return 'text-orange-600 bg-orange-100'
      case 'excused': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4" />
      case 'absent': return <XCircle className="w-4 h-4" />
      case 'late': return <Clock className="w-4 h-4" />
      case 'excused': return <AlertCircle className="w-4 h-4" />
      default: return <User className="w-4 h-4" />
    }
  }

  return (
    <Card className="rounded-card shadow-modal">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{attendance.class} Attendance</CardTitle>
            <CardDescription className="text-base">
              {new Date(attendance.date).toLocaleDateString('en-GB', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </CardDescription>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onEdit(attendance)}
              className="rounded-button"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-button"
            >
              Close
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="rounded-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{attendanceRate}%</div>
              <p className="text-sm text-muted-foreground">Rate</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{attendance.present}</div>
              <p className="text-sm text-muted-foreground">Present</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{attendance.absent}</div>
              <p className="text-sm text-muted-foreground">Absent</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{attendance.late}</div>
              <p className="text-sm text-muted-foreground">Late</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{attendance.excused}</div>
              <p className="text-sm text-muted-foreground">Excused</p>
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <div>
          <h3 className="font-semibold mb-4">Student Details</h3>
          <div className="space-y-3">
            {attendance.students.map(student => (
              <Card key={student.id} className="rounded-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        {student.time && (
                          <p className="text-sm text-muted-foreground">
                            Arrived: {student.time}
                          </p>
                        )}
                        {student.notes && (
                          <p className="text-sm text-muted-foreground">
                            Note: {student.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Badge className={`rounded-button ${getStatusColor(student.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(student.status)}
                        <span className="capitalize">{student.status}</span>
                      </div>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AttendanceManagement() {
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendanceData)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedClass, setSelectedClass] = useState('Year 7')
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingAttendance, setEditingAttendance] = useState(null)
  const [viewingAttendance, setViewingAttendance] = useState(null)
  const [activeTab, setActiveTab] = useState('today')

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const todayRecords = filteredRecords.filter(record => record.date === selectedDate)

  const handleMarkAttendance = () => {
    setEditingAttendance(null)
    setShowForm(true)
  }

  const handleEditAttendance = (attendance) => {
    setEditingAttendance(attendance)
    setSelectedClass(attendance.class)
    setSelectedDate(attendance.date)
    setShowForm(true)
    setViewingAttendance(null)
  }

  const handleViewAttendance = (attendance) => {
    setViewingAttendance(attendance)
    setShowForm(false)
  }

  const handleSaveAttendance = (attendanceData) => {
    if (editingAttendance) {
      setAttendanceRecords(records => records.map(r => 
        r.id === editingAttendance.id ? { ...attendanceData, id: r.id } : r
      ))
    } else {
      const newRecord = {
        ...attendanceData,
        id: Math.max(...attendanceRecords.map(r => r.id)) + 1,
        teacher: classes.find(c => c.name === attendanceData.class)?.teacher || 'Unknown'
      }
      setAttendanceRecords([...attendanceRecords, newRecord])
    }
    setShowForm(false)
    setEditingAttendance(null)
  }

  // Calculate overall stats
  const totalClasses = classes.length
  const todayAttendance = todayRecords.length
  const averageAttendance = todayRecords.length > 0 
    ? Math.round(todayRecords.reduce((sum, record) => sum + (record.present / record.totalStudents * 100), 0) / todayRecords.length)
    : 0
  const totalAbsent = todayRecords.reduce((sum, record) => sum + record.absent, 0)

  if (showForm) {
    return (
      <div className="p-6 animate-fade-in">
        <AttendanceForm
          selectedClass={selectedClass}
          selectedDate={selectedDate}
          onSave={handleSaveAttendance}
          onCancel={() => {
            setShowForm(false)
            setEditingAttendance(null)
          }}
        />
      </div>
    )
  }

  if (viewingAttendance) {
    return (
      <div className="p-6 animate-fade-in">
        <AttendanceDetails
          attendance={viewingAttendance}
          onClose={() => setViewingAttendance(null)}
          onEdit={handleEditAttendance}
        />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage student attendance across all classes
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-button">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="rounded-button">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reports
          </Button>
          <Button onClick={handleMarkAttendance} className="rounded-button">
            <UserCheck className="w-4 h-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <p className="text-2xl font-bold">{totalClasses}</p>
              </div>
              <School className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Classes</p>
                <p className="text-2xl font-bold text-blue-600">{todayAttendance}</p>
              </div>
              <CalendarDays className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Attendance</p>
                <p className="text-2xl font-bold text-green-600">{averageAttendance}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Absent Today</p>
                <p className="text-2xl font-bold text-red-600">{totalAbsent}</p>
              </div>
              <UserX className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-modern">
          <TabsTrigger value="today" className="rounded-button">
            <Calendar className="w-4 h-4 mr-2" />
            Today's Attendance
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-button">
            <Clock3 className="w-4 h-4 mr-2" />
            Attendance History
          </TabsTrigger>
          <TabsTrigger value="classes" className="rounded-button">
            <School className="w-4 h-4 mr-2" />
            Class Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6 mt-6">
          {/* Date and Class Selection */}
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="rounded-input mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="class">Class</Label>
                  <select
                    id="class"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="mt-1 px-3 py-2 bg-background border border-input rounded-input focus-modern"
                  >
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.name}>
                        {cls.name} ({cls.level})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-1 min-w-64">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search classes or teachers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-input"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Attendance Records */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todayRecords.map(record => (
              <AttendanceCard
                key={record.id}
                attendance={record}
                onEdit={handleEditAttendance}
                onView={handleViewAttendance}
              />
            ))}
          </div>

          {todayRecords.length === 0 && (
            <Card className="rounded-card shadow-card">
              <CardContent className="p-8 text-center">
                <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No attendance records</h3>
                <p className="text-muted-foreground mb-4">
                  No attendance has been marked for {new Date(selectedDate).toLocaleDateString('en-GB')}
                </p>
                <Button onClick={handleMarkAttendance} className="rounded-button">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Mark Attendance
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search attendance history..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-input"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.map(record => (
              <AttendanceCard
                key={record.id}
                attendance={record}
                onEdit={handleEditAttendance}
                onView={handleViewAttendance}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="classes" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map(cls => (
              <Card key={cls.id} className="rounded-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{cls.name}</h3>
                    <Badge variant="secondary" className="rounded-button">
                      {cls.level}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Students:</span>
                      <span className="font-medium">{cls.students}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Teacher:</span>
                      <span className="font-medium">{cls.teacher}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Schedule:</span>
                      <span className="font-medium">{cls.schedule}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button 
                      variant="outline" 
                      className="w-full rounded-button"
                      onClick={() => {
                        setSelectedClass(cls.name)
                        setActiveTab('today')
                      }}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Mark Attendance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AttendanceManagement

