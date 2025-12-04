import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  BookOpen,
  Star,
  Award,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  User,
  Users,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Edit,
  Eye,
  MoreHorizontal,
  BookMarked,
  GraduationCap,
  Medal,
  Trophy,
  Zap,
  Heart,
  Brain,
  Lightbulb,
  Bookmark,
  FileText,
  PenTool,
  Volume2,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  FastForward,
  Rewind,
  Mic,
  MicOff,
  Save,
  Share,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Flag
} from 'lucide-react'

// Mock Quran data - 30 Juz with Surahs
const quranData = [
  { juz: 1, surahs: ['Al-Fatiha', 'Al-Baqarah (1-141)'], verses: 148, difficulty: 'Medium' },
  { juz: 2, surahs: ['Al-Baqarah (142-252)'], verses: 111, difficulty: 'Medium' },
  { juz: 3, surahs: ['Al-Baqarah (253-286)', 'Al-Imran (1-92)'], verses: 126, difficulty: 'Medium' },
  { juz: 4, surahs: ['Al-Imran (93-200)', 'An-Nisa (1-23)'], verses: 131, difficulty: 'Medium' },
  { juz: 5, surahs: ['An-Nisa (24-147)'], verses: 124, difficulty: 'Medium' },
  { juz: 6, surahs: ['An-Nisa (148-176)', 'Al-Maidah (1-81)'], verses: 110, difficulty: 'Medium' },
  { juz: 7, surahs: ['Al-Maidah (82-120)', 'Al-Anam (1-110)'], verses: 149, difficulty: 'Medium' },
  { juz: 8, surahs: ['Al-Anam (111-165)', 'Al-Araf (1-87)'], verses: 142, difficulty: 'Medium' },
  { juz: 9, surahs: ['Al-Araf (88-206)', 'Al-Anfal (1-40)'], verses: 159, difficulty: 'Medium' },
  { juz: 10, surahs: ['Al-Anfal (41-75)', 'At-Tawbah (1-92)'], verses: 127, difficulty: 'Medium' },
  { juz: 11, surahs: ['At-Tawbah (93-129)', 'Yunus', 'Hud (1-5)'], verses: 151, difficulty: 'Hard' },
  { juz: 12, surahs: ['Hud (6-123)', 'Yusuf (1-52)'], verses: 170, difficulty: 'Hard' },
  { juz: 13, surahs: ['Yusuf (53-111)', 'Ar-Rad', 'Ibrahim (1-52)'], verses: 154, difficulty: 'Hard' },
  { juz: 14, surahs: ['Ibrahim (53-52)', 'Al-Hijr', 'An-Nahl (1-128)'], verses: 227, difficulty: 'Hard' },
  { juz: 15, surahs: ['Al-Isra', 'Al-Kahf (1-74)'], verses: 185, difficulty: 'Hard' },
  { juz: 16, surahs: ['Al-Kahf (75-110)', 'Maryam', 'Ta-Ha (1-135)'], verses: 269, difficulty: 'Easy' },
  { juz: 17, surahs: ['Al-Anbiya', 'Al-Hajj (1-78)'], verses: 190, difficulty: 'Easy' },
  { juz: 18, surahs: ['Al-Hajj (79-78)', 'Al-Muminun', 'An-Nur (1-64)'], verses: 202, difficulty: 'Easy' },
  { juz: 19, surahs: ['An-Nur (65-64)', 'Al-Furqan', 'Ash-Shuara (1-227)'], verses: 339, difficulty: 'Easy' },
  { juz: 20, surahs: ['Ash-Shuara (228-227)', 'An-Naml', 'Al-Qasas (1-88)'], verses: 314, difficulty: 'Easy' },
  { juz: 21, surahs: ['Al-Qasas (89-88)', 'Al-Ankabut', 'Ar-Rum', 'Luqman', 'As-Sajdah (1-30)'], verses: 249, difficulty: 'Easy' },
  { juz: 22, surahs: ['Al-Ahzab', 'Saba', 'Fatir', 'Ya-Sin (1-83)'], verses: 171, difficulty: 'Easy' },
  { juz: 23, surahs: ['As-Saffat', 'Sad', 'Az-Zumar (1-75)'], verses: 257, difficulty: 'Easy' },
  { juz: 24, surahs: ['Az-Zumar (76-75)', 'Ghafir', 'Fussilat (1-54)'], verses: 139, difficulty: 'Easy' },
  { juz: 25, surahs: ['Fussilat (55-54)', 'Ash-Shura', 'Az-Zukhruf', 'Ad-Dukhan', 'Al-Jathiyah', 'Al-Ahqaf (1-35)'], verses: 188, difficulty: 'Easy' },
  { juz: 26, surahs: ['Al-Ahqaf (36-35)', 'Muhammad', 'Al-Fath', 'Al-Hujurat', 'Qaf', 'Adh-Dhariyat (1-60)'], verses: 159, difficulty: 'Easy' },
  { juz: 27, surahs: ['Adh-Dhariyat (61-60)', 'At-Tur', 'An-Najm', 'Al-Qamar', 'Ar-Rahman', 'Al-Waqiah', 'Al-Hadid (1-29)'], verses: 206, difficulty: 'Easy' },
  { juz: 28, surahs: ['Al-Mujadila', 'Al-Hashr', 'Al-Mumtahanah', 'As-Saff', 'Al-Jumah', 'Al-Munafiqun', 'At-Taghabun', 'At-Talaq', 'At-Tahrim (1-12)'], verses: 173, difficulty: 'Easy' },
  { juz: 29, surahs: ['Al-Mulk', 'Al-Qalam', 'Al-Haqqah', 'Al-Maarij', 'Nuh', 'Al-Jinn', 'Al-Muzzammil', 'Al-Muddaththir', 'Al-Qiyamah', 'Al-Insan', 'Al-Mursalat (1-50)'], verses: 431, difficulty: 'Easy' },
  { juz: 30, surahs: ['An-Naba', 'An-Naziat', 'Abasa', 'At-Takwir', 'Al-Infitar', 'Al-Mutaffifin', 'Al-Inshiqaq', 'Al-Buruj', 'At-Tariq', 'Al-Ala', 'Al-Ghashiyah', 'Al-Fajr', 'Al-Balad', 'Ash-Shams', 'Al-Lail', 'Ad-Duha', 'Ash-Sharh', 'At-Tin', 'Al-Alaq', 'Al-Qadr', 'Al-Bayyinah', 'Az-Zalzalah', 'Al-Adiyat', 'Al-Qariah', 'At-Takathur', 'Al-Asr', 'Al-Humazah', 'Al-Fil', 'Quraish', 'Al-Maun', 'Al-Kawthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas'], verses: 564, difficulty: 'Easy' }
]

// Mock student progress data
const mockStudentProgress = [
  {
    id: 1,
    name: 'Fatima Al-Zahra',
    avatar: 'FA',
    class: 'Fasal 7',
    quranProgress: {
      completedJuz: 15,
      currentJuz: 16,
      totalJuz: 30,
      currentSurah: 'Al-Kahf',
      currentVerse: 75,
      accuracy: 94,
      fluency: 88,
      tajweed: 91,
      lastRecitation: '2024-08-09',
      weeklyGoal: 2,
      monthlyGoal: 8,
      achievements: ['Perfect Recitation', 'Consistent Practice', 'Tajweed Master']
    },
    islamicStudies: {
      aqeedah: 85,
      fiqh: 78,
      seerah: 92,
      hadith: 88,
      arabic: 76,
      overallGrade: 'B+',
      assignments: 12,
      completedAssignments: 10,
      upcomingTests: 2
    },
    recentActivity: [
      { date: '2024-08-09', activity: 'Completed Juz 15 recitation', type: 'quran', score: 94 },
      { date: '2024-08-08', activity: 'Submitted Seerah assignment', type: 'assignment', score: 92 },
      { date: '2024-08-07', activity: 'Practiced Tajweed rules', type: 'practice', score: 88 },
      { date: '2024-08-06', activity: 'Completed Fiqh quiz', type: 'quiz', score: 82 }
    ]
  },
  {
    id: 2,
    name: 'Omar Ibn Khattab',
    avatar: 'OIK',
    class: 'Fasal 9',
    quranProgress: {
      completedJuz: 25,
      currentJuz: 26,
      totalJuz: 30,
      currentSurah: 'Al-Ahqaf',
      currentVerse: 36,
      accuracy: 96,
      fluency: 94,
      tajweed: 97,
      lastRecitation: '2024-08-10',
      weeklyGoal: 1,
      monthlyGoal: 4,
      achievements: ['Hafiz in Progress', 'Tajweed Excellence', 'Leadership Award']
    },
    islamicStudies: {
      aqeedah: 94,
      fiqh: 91,
      seerah: 96,
      hadith: 93,
      arabic: 89,
      overallGrade: 'A',
      assignments: 15,
      completedAssignments: 15,
      upcomingTests: 1
    },
    recentActivity: [
      { date: '2024-08-10', activity: 'Started Juz 26 memorization', type: 'quran', score: 96 },
      { date: '2024-08-09', activity: 'Led class discussion on Hadith', type: 'leadership', score: 95 },
      { date: '2024-08-08', activity: 'Completed Arabic grammar test', type: 'test', score: 89 },
      { date: '2024-08-07', activity: 'Reviewed Juz 25 with teacher', type: 'review', score: 97 }
    ]
  },
  {
    id: 3,
    name: 'Aisha Siddique',
    avatar: 'AS',
    class: 'Fasal 5',
    quranProgress: {
      completedJuz: 3,
      currentJuz: 4,
      totalJuz: 30,
      currentSurah: 'Al-Imran',
      currentVerse: 93,
      accuracy: 82,
      fluency: 75,
      tajweed: 79,
      lastRecitation: '2024-08-09',
      weeklyGoal: 3,
      monthlyGoal: 12,
      achievements: ['First Juz Complete', 'Regular Attendance', 'Improvement Award']
    },
    islamicStudies: {
      aqeedah: 78,
      fiqh: 72,
      seerah: 85,
      hadith: 74,
      arabic: 68,
      overallGrade: 'B-',
      assignments: 8,
      completedAssignments: 7,
      upcomingTests: 3
    },
    recentActivity: [
      { date: '2024-08-09', activity: 'Practiced Al-Imran verses', type: 'practice', score: 82 },
      { date: '2024-08-08', activity: 'Completed Aqeedah worksheet', type: 'assignment', score: 78 },
      { date: '2024-08-07', activity: 'Recited Juz 3 for review', type: 'review', score: 85 },
      { date: '2024-08-06', activity: 'Learned new Tajweed rule', type: 'learning', score: 79 }
    ]
  }
]

// Islamic Studies subjects
const islamicSubjects = [
  { id: 'aqeedah', name: 'Aqeedah', icon: Heart, color: 'text-red-600', description: 'Islamic Creed and Beliefs' },
  { id: 'fiqh', name: 'Fiqh', icon: BookOpen, color: 'text-blue-600', description: 'Islamic Jurisprudence' },
  { id: 'seerah', name: 'Seerah', icon: User, color: 'text-green-600', description: 'Life of Prophet Muhammad (PBUH)' },
  { id: 'hadith', name: 'Hadith', icon: MessageSquare, color: 'text-purple-600', description: 'Prophetic Traditions' },
  { id: 'arabic', name: 'Arabic', icon: PenTool, color: 'text-orange-600', description: 'Arabic Language' }
]

function QuranProgressCard({ student, onViewDetails }) {
  const progressPercentage = Math.round((student.quranProgress.completedJuz / student.quranProgress.totalJuz) * 100)
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-orange-600 bg-orange-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const currentJuzData = quranData.find(j => j.juz === student.quranProgress.currentJuz)

  return (
    <Card className="rounded-card shadow-card hover-lift transition-modern">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {student.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{student.name}</h3>
              <p className="text-sm text-muted-foreground">{student.class}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{progressPercentage}%</div>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Juz Progress</span>
            <span>{student.quranProgress.completedJuz}/{student.quranProgress.totalJuz}</span>
          </div>
          <Progress value={progressPercentage} className="h-3 rounded-full" />
        </div>

        {/* Current Progress */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Juz:</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">Juz {student.quranProgress.currentJuz}</span>
              {currentJuzData && (
                <Badge className={`rounded-button text-xs ${getDifficultyColor(currentJuzData.difficulty)}`}>
                  {currentJuzData.difficulty}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Surah:</span>
            <span className="font-medium">{student.quranProgress.currentSurah}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Recitation:</span>
            <span className="font-medium">{new Date(student.quranProgress.lastRecitation).toLocaleDateString('en-GB')}</span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{student.quranProgress.accuracy}%</div>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{student.quranProgress.fluency}%</div>
            <p className="text-xs text-muted-foreground">Fluency</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{student.quranProgress.tajweed}%</div>
            <p className="text-xs text-muted-foreground">Tajweed</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Recent Achievements:</p>
          <div className="flex flex-wrap gap-1">
            {student.quranProgress.achievements.slice(0, 2).map((achievement, index) => (
              <Badge key={index} variant="secondary" className="rounded-button text-xs">
                <Award className="w-3 h-3 mr-1" />
                {achievement}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          onClick={() => onViewDetails(student)}
          className="w-full rounded-button"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}

function IslamicStudiesCard({ student, onViewDetails }) {
  const subjects = [
    { name: 'Aqeedah', score: student.islamicStudies.aqeedah, color: 'text-red-600' },
    { name: 'Fiqh', score: student.islamicStudies.fiqh, color: 'text-blue-600' },
    { name: 'Seerah', score: student.islamicStudies.seerah, color: 'text-green-600' },
    { name: 'Hadith', score: student.islamicStudies.hadith, color: 'text-purple-600' },
    { name: 'Arabic', score: student.islamicStudies.arabic, color: 'text-orange-600' }
  ]

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100'
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100'
    if (grade.startsWith('C')) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const completionRate = Math.round((student.islamicStudies.completedAssignments / student.islamicStudies.assignments) * 100)

  return (
    <Card className="rounded-card shadow-card hover-lift transition-modern">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {student.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{student.name}</h3>
              <p className="text-sm text-muted-foreground">{student.class}</p>
            </div>
          </div>
          
          <Badge className={`rounded-button ${getGradeColor(student.islamicStudies.overallGrade)}`}>
            {student.islamicStudies.overallGrade}
          </Badge>
        </div>

        {/* Subject Scores */}
        <div className="space-y-3 mb-4">
          {subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium">{subject.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${subject.color.replace('text-', 'bg-')}`}
                    style={{ width: `${subject.score}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-bold ${subject.color}`}>{subject.score}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Assignment Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Assignments</span>
            <span>{student.islamicStudies.completedAssignments}/{student.islamicStudies.assignments}</span>
          </div>
          <Progress value={completionRate} className="h-2 rounded-full" />
        </div>

        {/* Upcoming Tests */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Upcoming Tests:</span>
          <Badge variant="outline" className="rounded-button">
            <AlertCircle className="w-3 h-3 mr-1" />
            {student.islamicStudies.upcomingTests}
          </Badge>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          onClick={() => onViewDetails(student)}
          className="w-full rounded-button"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}

function StudentProgressDetails({ student, onClose, activeTab, setActiveTab }) {
  if (!student) return null

  const currentJuzData = quranData.find(j => j.juz === student.quranProgress.currentJuz)

  return (
    <Card className="rounded-card shadow-modal">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {student.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{student.name}</CardTitle>
              <CardDescription className="text-lg">{student.class} • Progress Report</CardDescription>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-button">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={onClose} className="rounded-button">
              Close
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-modern">
            <TabsTrigger value="quran" className="rounded-button">
              <BookMarked className="w-4 h-4 mr-2" />
              Quran Progress
            </TabsTrigger>
            <TabsTrigger value="studies" className="rounded-button">
              <GraduationCap className="w-4 h-4 mr-2" />
              Islamic Studies
            </TabsTrigger>
            <TabsTrigger value="activity" className="rounded-button">
              <TrendingUp className="w-4 h-4 mr-2" />
              Recent Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quran" className="space-y-6 mt-6">
            {/* Overall Progress */}
            <Card className="rounded-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookMarked className="w-5 h-5" />
                  Quran Memorization Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {Math.round((student.quranProgress.completedJuz / student.quranProgress.totalJuz) * 100)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{student.quranProgress.completedJuz}</div>
                    <p className="text-sm text-muted-foreground">Completed Juz</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{student.quranProgress.currentJuz}</div>
                    <p className="text-sm text-muted-foreground">Current Juz</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{student.quranProgress.totalJuz - student.quranProgress.completedJuz}</div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                  </div>
                </div>

                <Progress 
                  value={(student.quranProgress.completedJuz / student.quranProgress.totalJuz) * 100} 
                  className="h-4 rounded-full" 
                />
              </CardContent>
            </Card>

            {/* Current Juz Details */}
            {currentJuzData && (
              <Card className="rounded-card">
                <CardHeader>
                  <CardTitle>Current Juz {student.quranProgress.currentJuz} Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Surahs in this Juz:</Label>
                      <div className="mt-2 space-y-1">
                        {currentJuzData.surahs.map((surah, index) => (
                          <Badge key={index} variant="outline" className="rounded-button mr-2 mb-1">
                            {surah}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Progress Details:</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Total Verses:</span>
                          <span className="font-medium">{currentJuzData.verses}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Difficulty:</span>
                          <Badge className={`rounded-button ${
                            currentJuzData.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                            currentJuzData.difficulty === 'Medium' ? 'bg-orange-100 text-orange-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {currentJuzData.difficulty}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Current Verse:</span>
                          <span className="font-medium">{student.quranProgress.currentVerse}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Performance Metrics */}
            <Card className="rounded-card">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-gray-200"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - student.quranProgress.accuracy / 100)}`}
                          className="text-green-600"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-green-600">{student.quranProgress.accuracy}%</span>
                      </div>
                    </div>
                    <h3 className="font-semibold">Accuracy</h3>
                    <p className="text-sm text-muted-foreground">Correct recitation</p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-gray-200"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - student.quranProgress.fluency / 100)}`}
                          className="text-blue-600"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-600">{student.quranProgress.fluency}%</span>
                      </div>
                    </div>
                    <h3 className="font-semibold">Fluency</h3>
                    <p className="text-sm text-muted-foreground">Reading flow</p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-gray-200"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - student.quranProgress.tajweed / 100)}`}
                          className="text-purple-600"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-purple-600">{student.quranProgress.tajweed}%</span>
                      </div>
                    </div>
                    <h3 className="font-semibold">Tajweed</h3>
                    <p className="text-sm text-muted-foreground">Pronunciation rules</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Goals and Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weekly Goal:</span>
                    <Badge variant="outline" className="rounded-button">
                      {student.quranProgress.weeklyGoal} Juz/week
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Goal:</span>
                    <Badge variant="outline" className="rounded-button">
                      {student.quranProgress.monthlyGoal} Juz/month
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {student.quranProgress.achievements.map((achievement, index) => (
                      <Badge key={index} variant="secondary" className="rounded-button mr-2 mb-2">
                        <Medal className="w-3 h-3 mr-1" />
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="studies" className="space-y-6 mt-6">
            {/* Overall Grade */}
            <Card className="rounded-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Islamic Studies Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-primary mb-2">
                    {student.islamicStudies.overallGrade}
                  </div>
                  <p className="text-lg text-muted-foreground">Overall Grade</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {student.islamicStudies.completedAssignments}/{student.islamicStudies.assignments}
                    </div>
                    <p className="text-sm text-muted-foreground">Assignments Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {student.islamicStudies.upcomingTests}
                    </div>
                    <p className="text-sm text-muted-foreground">Upcoming Tests</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {islamicSubjects.map((subject) => {
                const score = student.islamicStudies[subject.id]
                const Icon = subject.icon
                
                return (
                  <Card key={subject.id} className="rounded-card">
                    <CardContent className="p-6 text-center">
                      <Icon className={`w-12 h-12 mx-auto mb-3 ${subject.color}`} />
                      <h3 className="font-semibold text-lg mb-1">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{subject.description}</p>
                      <div className="text-3xl font-bold mb-2" style={{ color: subject.color.replace('text-', '') }}>
                        {score}%
                      </div>
                      <Progress value={score} className="h-2 rounded-full" />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6 mt-6">
            <Card className="rounded-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student.recentActivity.map((activity, index) => {
                    const getActivityIcon = (type) => {
                      switch (type) {
                        case 'quran': return <BookMarked className="w-4 h-4" />
                        case 'assignment': return <FileText className="w-4 h-4" />
                        case 'practice': return <Target className="w-4 h-4" />
                        case 'quiz': return <Brain className="w-4 h-4" />
                        case 'test': return <GraduationCap className="w-4 h-4" />
                        case 'review': return <Eye className="w-4 h-4" />
                        case 'learning': return <Lightbulb className="w-4 h-4" />
                        case 'leadership': return <Users className="w-4 h-4" />
                        default: return <BookOpen className="w-4 h-4" />
                      }
                    }

                    const getActivityColor = (type) => {
                      switch (type) {
                        case 'quran': return 'text-green-600 bg-green-100'
                        case 'assignment': return 'text-blue-600 bg-blue-100'
                        case 'practice': return 'text-purple-600 bg-purple-100'
                        case 'quiz': return 'text-orange-600 bg-orange-100'
                        case 'test': return 'text-red-600 bg-red-100'
                        case 'review': return 'text-indigo-600 bg-indigo-100'
                        case 'learning': return 'text-yellow-600 bg-yellow-100'
                        case 'leadership': return 'text-pink-600 bg-pink-100'
                        default: return 'text-gray-600 bg-gray-100'
                      }
                    }

                    const getScoreColor = (score) => {
                      if (score >= 90) return 'text-green-600'
                      if (score >= 80) return 'text-blue-600'
                      if (score >= 70) return 'text-orange-600'
                      return 'text-red-600'
                    }

                    return (
                      <div key={index} className="flex items-center justify-between p-4 rounded-card border border-border">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div>
                            <p className="font-medium">{activity.activity}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString('en-GB', {
                                weekday: 'short',
                                day: '2-digit',
                                month: 'short'
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(activity.score)}`}>
                            {activity.score}%
                          </div>
                          <Badge variant="outline" className="rounded-button text-xs capitalize">
                            {activity.type}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export function ProgressTracking() {
  const [students] = useState(mockStudentProgress)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('All Classes')
  const [activeTab, setActiveTab] = useState('quran')
  const [viewingStudent, setViewingStudent] = useState(null)
  const [detailsTab, setDetailsTab] = useState('quran')

  const classes = ['All Classes', 'Fasal 5', 'Fasal 6', 'Fasal 7', 'Fasal 8', 'Fasal 9']

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass
    return matchesSearch && matchesClass
  })

  const handleViewDetails = (student) => {
    setViewingStudent(student)
    setDetailsTab('quran')
  }

  // Calculate overall statistics
  const totalStudents = students.length
  const averageQuranProgress = Math.round(
    students.reduce((sum, student) => sum + (student.quranProgress.completedJuz / student.quranProgress.totalJuz * 100), 0) / students.length
  )
  const averageIslamicStudiesGrade = students.reduce((sum, student) => {
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D': 1.0, 'F': 0.0
    }
    return sum + (gradePoints[student.islamicStudies.overallGrade] || 0)
  }, 0) / students.length

  const studentsOnTrack = students.filter(student => 
    student.quranProgress.completedJuz >= student.quranProgress.monthlyGoal * 0.8
  ).length

  if (viewingStudent) {
    return (
      <div className="p-6 animate-fade-in">
        <StudentProgressDetails
          student={viewingStudent}
          onClose={() => setViewingStudent(null)}
          activeTab={detailsTab}
          setActiveTab={setDetailsTab}
        />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
          <p className="text-muted-foreground mt-1">
            Monitor student progress in Quran memorization and Islamic studies
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-button">
            <Download className="w-4 h-4 mr-2" />
            Export Reports
          </Button>
          <Button variant="outline" className="rounded-button">
            <Upload className="w-4 h-4 mr-2" />
            Import Progress
          </Button>
          <Button className="rounded-button">
            <Plus className="w-4 h-4 mr-2" />
            Add Assessment
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
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Quran Progress</p>
                <p className="text-2xl font-bold text-green-600">{averageQuranProgress}%</p>
              </div>
              <BookMarked className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Studies Grade</p>
                <p className="text-2xl font-bold text-blue-600">{averageIslamicStudiesGrade.toFixed(1)}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Track</p>
                <p className="text-2xl font-bold text-purple-600">{studentsOnTrack}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-modern">
          <TabsTrigger value="quran" className="rounded-button">
            <BookMarked className="w-4 h-4 mr-2" />
            Quran Progress
          </TabsTrigger>
          <TabsTrigger value="studies" className="rounded-button">
            <GraduationCap className="w-4 h-4 mr-2" />
            Islamic Studies
          </TabsTrigger>
        </TabsList>

        {/* Search and Filter */}
        <Card className="rounded-card shadow-card mt-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
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
              
              <div>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="quran" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map(student => (
              <QuranProgressCard
                key={student.id}
                student={student}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="studies" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map(student => (
              <IslamicStudiesCard
                key={student.id}
                student={student}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredStudents.length === 0 && (
        <Card className="rounded-card shadow-card">
          <CardContent className="p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No students found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or class filter
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ProgressTracking

