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
  GraduationCap,
  Heart,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Award,
  FileText,
  Download,
  Upload,
  MoreHorizontal,
  User,
  Home,
  School
} from 'lucide-react'

// Mock student data
const mockStudents = [
  {
    id: 1,
    studentId: 'STU001',
    name: 'Fatima Al-Zahra',
    arabicName: 'فاطمة الزهراء',
    dateOfBirth: '2010-03-15',
    age: 14,
    gender: 'Female',
    class: 'Year 7',
    level: 'Intermediate',
    status: 'active',
    enrollmentDate: '2023-09-01',
    avatar: '',
    email: 'fatima.alzahra@parent.com',
    phone: '+44 20 1234 5678',
    address: '123 Islamic Street, London, UK',
    parentName: 'Ahmad Al-Zahra',
    parentPhone: '+44 20 1234 5678',
    parentEmail: 'ahmad.alzahra@email.com',
    emergencyContact: '+44 20 9876 5432',
    medicalInfo: 'No known allergies',
    currentProgress: {
      quranMemorization: 15, // Juz completed
      arabicReading: 85,
      islamicStudies: 92,
      attendance: 96
    },
    fees: {
      monthly: 150,
      outstanding: 0,
      lastPayment: '2024-08-01'
    },
    notes: 'Excellent student with strong memorization skills'
  },
  {
    id: 2,
    studentId: 'STU002',
    name: 'Omar Ibn Khattab',
    arabicName: 'عمر بن الخطاب',
    dateOfBirth: '2008-07-22',
    age: 16,
    gender: 'Male',
    class: 'Year 9',
    level: 'Advanced',
    status: 'active',
    enrollmentDate: '2022-09-01',
    avatar: '',
    email: 'omar.khattab@parent.com',
    phone: '+44 20 2345 6789',
    address: '456 Masjid Road, Birmingham, UK',
    parentName: 'Abdullah Ibn Khattab',
    parentPhone: '+44 20 2345 6789',
    parentEmail: 'abdullah.khattab@email.com',
    emergencyContact: '+44 20 8765 4321',
    medicalInfo: 'Asthma - inhaler required',
    currentProgress: {
      quranMemorization: 25,
      arabicReading: 95,
      islamicStudies: 88,
      attendance: 94
    },
    fees: {
      monthly: 150,
      outstanding: 150,
      lastPayment: '2024-07-01'
    },
    notes: 'Advanced student, potential for leadership roles'
  },
  {
    id: 3,
    studentId: 'STU003',
    name: 'Aisha Siddique',
    arabicName: 'عائشة صديقة',
    dateOfBirth: '2012-11-08',
    age: 12,
    gender: 'Female',
    class: 'Year 5',
    level: 'Beginner',
    status: 'active',
    enrollmentDate: '2024-01-15',
    avatar: '',
    email: 'aisha.siddique@parent.com',
    phone: '+44 20 3456 7890',
    address: '789 Community Lane, Manchester, UK',
    parentName: 'Khadija Siddique',
    parentPhone: '+44 20 3456 7890',
    parentEmail: 'khadija.siddique@email.com',
    emergencyContact: '+44 20 7654 3210',
    medicalInfo: 'No medical conditions',
    currentProgress: {
      quranMemorization: 3,
      arabicReading: 65,
      islamicStudies: 78,
      attendance: 98
    },
    fees: {
      monthly: 120,
      outstanding: 0,
      lastPayment: '2024-08-01'
    },
    notes: 'New student, showing good progress'
  },
  {
    id: 4,
    studentId: 'STU004',
    name: 'Ali Hassan',
    arabicName: 'علي حسن',
    dateOfBirth: '2009-05-12',
    age: 15,
    gender: 'Male',
    class: 'Year 8',
    level: 'Intermediate',
    status: 'inactive',
    enrollmentDate: '2023-02-01',
    avatar: '',
    email: 'ali.hassan@parent.com',
    phone: '+44 20 4567 8901',
    address: '321 Education Avenue, Leeds, UK',
    parentName: 'Hassan Ali',
    parentPhone: '+44 20 4567 8901',
    parentEmail: 'hassan.ali@email.com',
    emergencyContact: '+44 20 6543 2109',
    medicalInfo: 'Diabetes - requires monitoring',
    currentProgress: {
      quranMemorization: 8,
      arabicReading: 70,
      islamicStudies: 75,
      attendance: 85
    },
    fees: {
      monthly: 150,
      outstanding: 450,
      lastPayment: '2024-05-01'
    },
    notes: 'Temporary leave due to family circumstances'
  }
]

const classes = [
  { id: 1, name: 'Year 5', level: 'Beginner', students: 15, teacher: 'Ustadha Khadija' },
  { id: 2, name: 'Year 6', level: 'Beginner', students: 18, teacher: 'Ustadh Muhammad' },
  { id: 3, name: 'Year 7', level: 'Intermediate', students: 12, teacher: 'Ustadha Fatima' },
  { id: 4, name: 'Year 8', level: 'Intermediate', students: 14, teacher: 'Ustadh Omar' },
  { id: 5, name: 'Year 9', level: 'Advanced', students: 10, teacher: 'Ustadh Abdullah' }
]

function StudentCard({ student, onEdit, onDelete, onView }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-orange-500'
      case 'graduated': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500'
      case 'Intermediate': return 'bg-blue-500'
      case 'Advanced': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <Card className="rounded-card shadow-card hover-lift transition-modern">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={student.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{student.name}</h3>
              <p className="text-sm text-muted-foreground">{student.arabicName}</p>
              <p className="text-xs text-muted-foreground">ID: {student.studentId}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(student.status)}`} />
            <Badge variant="secondary" className={`${getLevelColor(student.level)} text-white rounded-button`}>
              {student.level}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <School className="w-4 h-4" />
            <span>{student.class}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Age: {student.age} • Enrolled: {formatDate(student.enrollmentDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            <span>{student.parentName}</span>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs">
            <span>Quran Progress</span>
            <span>{student.currentProgress.quranMemorization}/30 Juz</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${(student.currentProgress.quranMemorization / 30) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-xs">
            <span>Attendance</span>
            <span>{student.currentProgress.attendance}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${student.currentProgress.attendance}%` }}
            ></div>
          </div>
        </div>

        {/* Fee Status */}
        <div className="flex items-center justify-between mb-4 p-2 rounded-modern bg-muted/50">
          <div className="text-sm">
            <span className="text-muted-foreground">Outstanding: </span>
            <span className={student.fees.outstanding > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
              £{student.fees.outstanding}
            </span>
          </div>
          {student.fees.outstanding > 0 && (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {student.status === 'active' ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <Clock className="w-4 h-4 text-orange-500" />
            )}
            <span className="text-sm capitalize">{student.status}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onView(student)}
              className="rounded-button"
            >
              <Eye className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(student)}
              className="rounded-button"
            >
              <Edit className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(student)}
              className="rounded-button text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StudentForm({ student, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    arabicName: student?.arabicName || '',
    dateOfBirth: student?.dateOfBirth || '',
    gender: student?.gender || 'Male',
    class: student?.class || 'Year 5',
    level: student?.level || 'Beginner',
    status: student?.status || 'active',
    email: student?.email || '',
    phone: student?.phone || '',
    address: student?.address || '',
    parentName: student?.parentName || '',
    parentPhone: student?.parentPhone || '',
    parentEmail: student?.parentEmail || '',
    emergencyContact: student?.emergencyContact || '',
    medicalInfo: student?.medicalInfo || '',
    monthlyFee: student?.fees?.monthly || 150,
    notes: student?.notes || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card className="rounded-card shadow-modal">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          {student ? 'Edit Student' : 'Add New Student'}
        </CardTitle>
        <CardDescription>
          {student ? 'Update student information' : 'Register a new student'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-modern">
              <TabsTrigger value="personal" className="rounded-button">Personal Info</TabsTrigger>
              <TabsTrigger value="contact" className="rounded-button">Contact & Family</TabsTrigger>
              <TabsTrigger value="academic" className="rounded-button">Academic Info</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name (English)</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="rounded-input mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="arabicName">Full Name (Arabic)</Label>
                  <Input
                    id="arabicName"
                    value={formData.arabicName}
                    onChange={(e) => setFormData({...formData, arabicName: e.target.value})}
                    className="rounded-input mt-2"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="rounded-input mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-input focus-modern"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="medicalInfo">Medical Information</Label>
                <Textarea
                  id="medicalInfo"
                  value={formData.medicalInfo}
                  onChange={(e) => setFormData({...formData, medicalInfo: e.target.value})}
                  className="rounded-input mt-2"
                  placeholder="Any medical conditions, allergies, or special requirements..."
                />
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parentName">Parent/Guardian Name</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className="rounded-input mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="parentPhone">Parent Phone</Label>
                  <Input
                    id="parentPhone"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                    className="rounded-input mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="parentEmail">Parent Email</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({...formData, parentEmail: e.target.value})}
                    className="rounded-input mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                    className="rounded-input mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="rounded-input mt-2"
                  placeholder="Full address including postcode..."
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="academic" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="class">Class</Label>
                  <select
                    id="class"
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                    className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-input focus-modern"
                    required
                  >
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.name}>
                        {cls.name} ({cls.level})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="level">Level</Label>
                  <select
                    id="level"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-input focus-modern"
                    required
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-input focus-modern"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="graduated">Graduated</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="monthlyFee">Monthly Fee (£)</Label>
                  <Input
                    id="monthlyFee"
                    type="number"
                    value={formData.monthlyFee}
                    onChange={(e) => setFormData({...formData, monthlyFee: parseInt(e.target.value)})}
                    className="rounded-input mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="rounded-input mt-2"
                  placeholder="Additional notes about the student..."
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 rounded-button"
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              className="flex-1 rounded-button"
            >
              {student ? 'Update Student' : 'Add Student'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function StudentDetails({ student, onClose, onEdit }) {
  if (!student) return null

  const calculateAge = (dateOfBirth) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <Card className="rounded-card shadow-modal">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-16 h-16">
              <AvatarImage src={student.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{student.name}</CardTitle>
              <CardDescription className="text-base">{student.arabicName}</CardDescription>
              <Badge variant="secondary" className="mt-1">
                ID: {student.studentId}
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onEdit(student)}
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
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-modern">
            <TabsTrigger value="overview" className="rounded-button">Overview</TabsTrigger>
            <TabsTrigger value="contact" className="rounded-button">Contact</TabsTrigger>
            <TabsTrigger value="progress" className="rounded-button">Progress</TabsTrigger>
            <TabsTrigger value="finance" className="rounded-button">Finance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age:</span>
                      <span>{calculateAge(student.dateOfBirth)} years old</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gender:</span>
                      <span>{student.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date of Birth:</span>
                      <span>{new Date(student.dateOfBirth).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Enrollment Date:</span>
                      <span>{new Date(student.enrollmentDate).toLocaleDateString('en-GB')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Academic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class:</span>
                      <span>{student.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <Badge variant="secondary" className="rounded-button">
                        {student.level}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge 
                        variant={student.status === 'active' ? 'default' : 'secondary'}
                        className="rounded-button"
                      >
                        {student.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {student.medicalInfo && (
              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Medical Information
                  </h4>
                  <p className="text-sm text-muted-foreground">{student.medicalInfo}</p>
                </CardContent>
              </Card>
            )}

            {student.notes && (
              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Notes
                  </h4>
                  <p className="text-sm text-muted-foreground">{student.notes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Parent/Guardian</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{student.parentName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{student.parentPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{student.parentEmail}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Emergency Contact</h4>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{student.emergencyContact}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-card">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </h4>
                <p className="text-sm text-muted-foreground">{student.address}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-4">Quran Memorization</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{student.currentProgress.quranMemorization}/30 Juz</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${(student.currentProgress.quranMemorization / 30) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((student.currentProgress.quranMemorization / 30) * 100)}% Complete
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-4">Attendance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rate</span>
                      <span>{student.currentProgress.attendance}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${student.currentProgress.attendance}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-4">Arabic Reading</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span>{student.currentProgress.arabicReading}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-purple-500 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${student.currentProgress.arabicReading}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-4">Islamic Studies</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score</span>
                      <span>{student.currentProgress.islamicStudies}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-orange-500 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${student.currentProgress.islamicStudies}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="finance" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Monthly Fee</h4>
                  <p className="text-2xl font-bold text-green-600">£{student.fees.monthly}</p>
                </CardContent>
              </Card>

              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Outstanding</h4>
                  <p className={`text-2xl font-bold ${student.fees.outstanding > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    £{student.fees.outstanding}
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-card">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Last Payment</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(student.fees.lastPayment).toLocaleDateString('en-GB')}
                  </p>
                </CardContent>
              </Card>
            </div>

            {student.fees.outstanding > 0 && (
              <Card className="rounded-card border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h4 className="font-medium text-red-800">Outstanding Fees</h4>
                  </div>
                  <p className="text-sm text-red-700">
                    This student has outstanding fees of £{student.fees.outstanding}. 
                    Please contact the parent/guardian to arrange payment.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export function StudentManagement() {
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClass, setFilterClass] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterLevel, setFilterLevel] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [viewingStudent, setViewingStudent] = useState(null)
  const [activeTab, setActiveTab] = useState('students')

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.arabicName.includes(searchTerm) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = filterClass === 'all' || student.class === filterClass
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus
    const matchesLevel = filterLevel === 'all' || student.level === filterLevel
    
    return matchesSearch && matchesClass && matchesStatus && matchesLevel
  })

  const handleAddStudent = () => {
    setEditingStudent(null)
    setShowForm(true)
  }

  const handleEditStudent = (student) => {
    setEditingStudent(student)
    setShowForm(true)
    setViewingStudent(null)
  }

  const handleViewStudent = (student) => {
    setViewingStudent(student)
    setShowForm(false)
  }

  const handleSaveStudent = (studentData) => {
    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? {
        ...s, 
        ...studentData,
        fees: {
          ...s.fees,
          monthly: studentData.monthlyFee
        }
      } : s))
    } else {
      const newStudent = {
        id: Math.max(...students.map(s => s.id)) + 1,
        studentId: `STU${String(Math.max(...students.map(s => s.id)) + 1).padStart(3, '0')}`,
        ...studentData,
        enrollmentDate: new Date().toISOString().split('T')[0],
        avatar: '',
        currentProgress: {
          quranMemorization: 0,
          arabicReading: 0,
          islamicStudies: 0,
          attendance: 100
        },
        fees: {
          monthly: studentData.monthlyFee,
          outstanding: 0,
          lastPayment: new Date().toISOString().split('T')[0]
        }
      }
      setStudents([...students, newStudent])
    }
    setShowForm(false)
    setEditingStudent(null)
  }

  const handleDeleteStudent = (student) => {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      setStudents(students.filter(s => s.id !== student.id))
    }
  }

  const stats = {
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    inactive: students.filter(s => s.status === 'inactive').length,
    outstanding: students.filter(s => s.fees.outstanding > 0).length
  }

  if (showForm) {
    return (
      <div className="p-6 animate-fade-in">
        <StudentForm
          student={editingStudent}
          onSave={handleSaveStudent}
          onCancel={() => {
            setShowForm(false)
            setEditingStudent(null)
          }}
        />
      </div>
    )
  }

  if (viewingStudent) {
    return (
      <div className="p-6 animate-fade-in">
        <StudentDetails
          student={viewingStudent}
          onClose={() => setViewingStudent(null)}
          onEdit={handleEditStudent}
        />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage student records, enrollment, and academic information
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-button">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="rounded-button">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button onClick={handleAddStudent} className="rounded-button">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold text-orange-600">{stats.inactive}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Fees</p>
                <p className="text-2xl font-bold text-red-600">{stats.outstanding}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-modern">
          <TabsTrigger value="students" className="rounded-button">
            <Users className="w-4 h-4 mr-2" />
            Students
          </TabsTrigger>
          <TabsTrigger value="classes" className="rounded-button">
            <School className="w-4 h-4 mr-2" />
            Classes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-6 mt-6">
          {/* Filters */}
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-input"
                    />
                  </div>
                </div>
                
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
                >
                  <option value="all">All Classes</option>
                  {classes.map(cls => (
                    <option key={cls.id} value={cls.name}>
                      {cls.name}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="graduated">Graduated</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Students Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                onEdit={handleEditStudent}
                onDelete={handleDeleteStudent}
                onView={handleViewStudent}
              />
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <Card className="rounded-card shadow-card">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No students found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          )}
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
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button variant="outline" className="w-full rounded-button">
                      <Eye className="w-4 h-4 mr-2" />
                      View Class
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

export default StudentManagement

