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
  Calendar,
  Clock,
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
  FileText,
  PenTool,
  Lightbulb,
  Award,
  Star,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Heart,
  Brain,
  MessageSquare,
  Video,
  Headphones,
  Image,
  Link,
  Save,
  Trash2,
  Copy,
  Share,
  Settings,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  Folder,
  File,
  PlayCircle,
  PauseCircle,
  Volume2,
  Bookmark,
  Flag,
  Timer,
  MapPin,
  Globe
} from 'lucide-react'

// Mock curriculum data
const curriculumData = {
  quran: {
    name: 'Quran Studies',
    description: 'Comprehensive Quran memorization and recitation program',
    levels: [
      {
        id: 'beginner',
        name: 'Beginner Level',
        description: 'Foundation level for new students',
        duration: '12 months',
        targetJuz: 5,
        modules: [
          {
            id: 'basics',
            name: 'Arabic Alphabet & Basic Reading',
            duration: '2 months',
            lessons: 24,
            objectives: ['Learn Arabic letters', 'Basic pronunciation', 'Simple word reading'],
            resources: ['Alphabet charts', 'Audio recordings', 'Practice worksheets'],
            assessments: ['Letter recognition test', 'Reading fluency assessment']
          },
          {
            id: 'short-surahs',
            name: 'Short Surahs (Juz 30)',
            duration: '4 months',
            lessons: 48,
            objectives: ['Memorize short surahs', 'Understand meanings', 'Perfect pronunciation'],
            resources: ['Audio recitations', 'Translation guides', 'Memorization aids'],
            assessments: ['Recitation tests', 'Meaning comprehension', 'Tajweed evaluation']
          },
          {
            id: 'juz-1-4',
            name: 'Juz 1-4 Memorization',
            duration: '6 months',
            lessons: 72,
            objectives: ['Memorize first 4 Juz', 'Apply Tajweed rules', 'Build confidence'],
            resources: ['Structured memorization plan', 'Tajweed guides', 'Progress tracking'],
            assessments: ['Monthly recitation tests', 'Tajweed assessments', 'Progress evaluations']
          }
        ]
      },
      {
        id: 'intermediate',
        name: 'Intermediate Level',
        description: 'Building upon foundation with advanced techniques',
        duration: '18 months',
        targetJuz: 15,
        modules: [
          {
            id: 'juz-5-10',
            name: 'Juz 5-10 Memorization',
            duration: '8 months',
            lessons: 96,
            objectives: ['Memorize Juz 5-10', 'Advanced Tajweed', 'Fluent recitation'],
            resources: ['Advanced audio materials', 'Tajweed textbooks', 'Peer study groups'],
            assessments: ['Bi-weekly recitations', 'Tajweed mastery tests', 'Fluency evaluations']
          },
          {
            id: 'juz-11-15',
            name: 'Juz 11-15 Memorization',
            duration: '10 months',
            lessons: 120,
            objectives: ['Complete first half of Quran', 'Master difficult passages', 'Develop teaching skills'],
            resources: ['Specialized coaching', 'Difficult verse guides', 'Teaching methodology'],
            assessments: ['Comprehensive recitation tests', 'Teaching demonstrations', 'Leadership assessments']
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced Level',
        description: 'Complete Quran memorization and mastery',
        duration: '24 months',
        targetJuz: 30,
        modules: [
          {
            id: 'juz-16-25',
            name: 'Juz 16-25 Memorization',
            duration: '12 months',
            lessons: 144,
            objectives: ['Memorize Juz 16-25', 'Perfect recitation', 'Understand context'],
            resources: ['Expert mentorship', 'Historical context materials', 'Advanced Tajweed'],
            assessments: ['Monthly comprehensive tests', 'Contextual understanding', 'Recitation mastery']
          },
          {
            id: 'juz-26-30',
            name: 'Final Juz & Completion',
            duration: '12 months',
            lessons: 144,
            objectives: ['Complete Quran memorization', 'Achieve Hafiz status', 'Prepare for teaching'],
            resources: ['One-on-one mentoring', 'Teaching preparation', 'Certification materials'],
            assessments: ['Final Hafiz examination', 'Teaching qualification', 'Ijazah preparation']
          }
        ]
      }
    ]
  },
  islamicStudies: {
    name: 'Islamic Studies',
    description: 'Comprehensive Islamic education covering all essential subjects',
    subjects: [
      {
        id: 'aqeedah',
        name: 'Aqeedah (Islamic Creed)',
        icon: Heart,
        color: 'text-red-600',
        description: 'Study of Islamic beliefs and theology',
        levels: [
          {
            name: 'Foundation Aqeedah',
            duration: '6 months',
            topics: ['Six Pillars of Faith', 'Tawheed', 'Prophethood', 'Day of Judgment'],
            resources: ['Basic Aqeedah textbook', 'Audio lectures', 'Discussion materials'],
            assessments: ['Written tests', 'Oral presentations', 'Project work']
          },
          {
            name: 'Advanced Aqeedah',
            duration: '12 months',
            topics: ['Detailed theology', 'Comparative religion', 'Contemporary issues', 'Scholarly debates'],
            resources: ['Advanced texts', 'Research materials', 'Scholarly articles'],
            assessments: ['Research papers', 'Debates', 'Comprehensive exams']
          }
        ]
      },
      {
        id: 'fiqh',
        name: 'Fiqh (Islamic Jurisprudence)',
        icon: BookOpen,
        color: 'text-blue-600',
        description: 'Study of Islamic law and practical rulings',
        levels: [
          {
            name: 'Basic Fiqh',
            duration: '8 months',
            topics: ['Purification', 'Prayer', 'Fasting', 'Zakat', 'Hajj'],
            resources: ['Fiqh handbook', 'Practical guides', 'Video demonstrations'],
            assessments: ['Practical tests', 'Case studies', 'Application exercises']
          },
          {
            name: 'Advanced Fiqh',
            duration: '16 months',
            topics: ['Marriage & family', 'Business transactions', 'Criminal law', 'Contemporary issues'],
            resources: ['Classical texts', 'Modern applications', 'Legal case studies'],
            assessments: ['Legal analysis', 'Fatwa writing', 'Moot court exercises']
          }
        ]
      },
      {
        id: 'seerah',
        name: 'Seerah (Prophetic Biography)',
        icon: Users,
        color: 'text-green-600',
        description: 'Study of the life and teachings of Prophet Muhammad (PBUH)',
        levels: [
          {
            name: 'Basic Seerah',
            duration: '6 months',
            topics: ['Early life', 'Prophethood', 'Meccan period', 'Migration', 'Medinan period'],
            resources: ['Seerah books', 'Documentary films', 'Timeline materials'],
            assessments: ['Timeline projects', 'Character analysis', 'Lesson extraction']
          },
          {
            name: 'Advanced Seerah',
            duration: '10 months',
            topics: ['Leadership lessons', 'Social reforms', 'Military campaigns', 'Legacy analysis'],
            resources: ['Scholarly biographies', 'Historical analysis', 'Leadership studies'],
            assessments: ['Leadership essays', 'Historical research', 'Comparative studies']
          }
        ]
      },
      {
        id: 'hadith',
        name: 'Hadith Studies',
        icon: MessageSquare,
        color: 'text-purple-600',
        description: 'Study of Prophetic traditions and their applications',
        levels: [
          {
            name: 'Introduction to Hadith',
            duration: '4 months',
            topics: ['Hadith terminology', 'Major collections', 'Authentication', 'Basic narrations'],
            resources: ['Hadith collections', 'Terminology guides', 'Audio narrations'],
            assessments: ['Memorization tests', 'Classification exercises', 'Application studies']
          },
          {
            name: 'Advanced Hadith Studies',
            duration: '12 months',
            topics: ['Hadith criticism', 'Chain analysis', 'Contextual understanding', 'Contemporary relevance'],
            resources: ['Critical texts', 'Research methodologies', 'Scholarly commentaries'],
            assessments: ['Critical analysis', 'Research projects', 'Scholarly presentations']
          }
        ]
      },
      {
        id: 'arabic',
        name: 'Arabic Language',
        icon: PenTool,
        color: 'text-orange-600',
        description: 'Comprehensive Arabic language learning program',
        levels: [
          {
            name: 'Basic Arabic',
            duration: '12 months',
            topics: ['Grammar basics', 'Vocabulary building', 'Reading skills', 'Writing practice'],
            resources: ['Grammar textbooks', 'Vocabulary cards', 'Reading materials', 'Writing exercises'],
            assessments: ['Grammar tests', 'Vocabulary quizzes', 'Reading comprehension', 'Writing assignments']
          },
          {
            name: 'Advanced Arabic',
            duration: '18 months',
            topics: ['Advanced grammar', 'Literature', 'Poetry', 'Classical texts'],
            resources: ['Classical literature', 'Poetry collections', 'Advanced grammar guides'],
            assessments: ['Literary analysis', 'Poetry recitation', 'Translation exercises', 'Composition writing']
          }
        ]
      }
    ]
  }
}

// Mock lesson plans
const mockLessonPlans = [
  {
    id: 1,
    title: 'Introduction to Arabic Alphabet',
    subject: 'Arabic Language',
    level: 'Beginner',
    duration: '45 minutes',
    objectives: ['Learn first 10 Arabic letters', 'Practice pronunciation', 'Recognize letter shapes'],
    materials: ['Alphabet chart', 'Audio recordings', 'Practice worksheets', 'Whiteboard'],
    activities: [
      { time: '0-10 min', activity: 'Review previous letters', type: 'review' },
      { time: '10-25 min', activity: 'Introduce new letters with pronunciation', type: 'instruction' },
      { time: '25-35 min', activity: 'Practice writing letters', type: 'practice' },
      { time: '35-45 min', activity: 'Recognition games and assessment', type: 'assessment' }
    ],
    homework: 'Practice writing new letters 10 times each',
    assessment: 'Letter recognition quiz next class',
    notes: 'Focus on proper pronunciation and letter formation',
    createdBy: 'Ustadha Khadija',
    createdDate: '2024-08-01',
    status: 'active'
  },
  {
    id: 2,
    title: 'Surah Al-Fatiha Memorization',
    subject: 'Quran Studies',
    level: 'Beginner',
    duration: '60 minutes',
    objectives: ['Memorize Surah Al-Fatiha', 'Understand basic meaning', 'Perfect pronunciation'],
    materials: ['Quran copies', 'Audio recitation', 'Translation sheets', 'Tajweed guide'],
    activities: [
      { time: '0-15 min', activity: 'Recitation practice of previous surahs', type: 'review' },
      { time: '15-30 min', activity: 'Listen to Al-Fatiha recitation', type: 'listening' },
      { time: '30-45 min', activity: 'Verse-by-verse memorization', type: 'memorization' },
      { time: '45-60 min', activity: 'Group recitation and correction', type: 'practice' }
    ],
    homework: 'Recite Al-Fatiha 20 times daily',
    assessment: 'Individual recitation test',
    notes: 'Emphasize Tajweed rules and proper pronunciation',
    createdBy: 'Ustadh Muhammad',
    createdDate: '2024-08-02',
    status: 'active'
  },
  {
    id: 3,
    title: 'The Five Pillars of Islam',
    subject: 'Aqeedah',
    level: 'Intermediate',
    duration: '50 minutes',
    objectives: ['Understand the Five Pillars', 'Explain their significance', 'Apply in daily life'],
    materials: ['Textbook', 'Presentation slides', 'Discussion worksheets', 'Video clips'],
    activities: [
      { time: '0-10 min', activity: 'Review previous lesson on Tawheed', type: 'review' },
      { time: '10-25 min', activity: 'Presentation on Five Pillars', type: 'instruction' },
      { time: '25-40 min', activity: 'Group discussion on practical application', type: 'discussion' },
      { time: '40-50 min', activity: 'Q&A and reflection', type: 'reflection' }
    ],
    homework: 'Write essay on personal commitment to Five Pillars',
    assessment: 'Group presentation next week',
    notes: 'Encourage personal reflection and practical examples',
    createdBy: 'Ustadha Fatima',
    createdDate: '2024-08-03',
    status: 'active'
  }
]

function CurriculumOverview({ curriculum, onSelectModule }) {
  return (
    <div className="space-y-6">
      {curriculum.levels ? (
        // Quran curriculum
        <div className="space-y-6">
          {curriculum.levels.map((level, levelIndex) => (
            <Card key={level.id} className="rounded-card shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{level.name}</CardTitle>
                    <CardDescription className="text-base">{level.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="rounded-button mb-2">
                      {level.duration}
                    </Badge>
                    <p className="text-sm text-muted-foreground">Target: {level.targetJuz} Juz</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {level.modules.map((module, moduleIndex) => (
                    <Card key={module.id} className="rounded-card border-2 border-border hover:border-primary transition-colors cursor-pointer" onClick={() => onSelectModule(module)}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{module.name}</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{module.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            <span>{module.lessons} lessons</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            <span>{module.objectives.length} objectives</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <Button variant="outline" size="sm" className="w-full rounded-button">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Islamic Studies curriculum
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculum.subjects.map((subject) => {
            const Icon = subject.icon
            return (
              <Card key={subject.id} className="rounded-card shadow-card hover-lift transition-modern cursor-pointer" onClick={() => onSelectModule(subject)}>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <Icon className={`w-12 h-12 mx-auto mb-3 ${subject.color}`} />
                    <h3 className="font-semibold text-lg">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {subject.levels.map((level, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{level.name}</span>
                        <Badge variant="outline" className="rounded-button text-xs">
                          {level.duration}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4 rounded-button">
                    <Eye className="w-4 h-4 mr-2" />
                    View Curriculum
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ModuleDetails({ module, onClose }) {
  if (!module) return null

  return (
    <Card className="rounded-card shadow-modal">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{module.name}</CardTitle>
            <CardDescription className="text-lg">{module.description || 'Module Details'}</CardDescription>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-button">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" onClick={onClose} className="rounded-button">
              Close
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Module Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="rounded-card">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{module.duration}</div>
              <p className="text-sm text-muted-foreground">Duration</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-card">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{module.lessons || module.levels?.length || 0}</div>
              <p className="text-sm text-muted-foreground">{module.lessons ? 'Lessons' : 'Levels'}</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-card">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">{module.objectives?.length || module.topics?.length || 0}</div>
              <p className="text-sm text-muted-foreground">{module.objectives ? 'Objectives' : 'Topics'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Objectives or Topics */}
        <Card className="rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              {module.objectives ? 'Learning Objectives' : 'Topics Covered'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(module.objectives || module.topics || []).map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        {module.resources && (
          <Card className="rounded-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="w-5 h-5" />
                Learning Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {module.resources.map((resource, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">{resource}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Assessments */}
        {module.assessments && (
          <Card className="rounded-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Assessment Methods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {module.assessments.map((assessment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="text-sm">{assessment}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Levels (for Islamic Studies subjects) */}
        {module.levels && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Course Levels</h3>
            {module.levels.map((level, index) => (
              <Card key={index} className="rounded-card">
                <CardHeader>
                  <CardTitle className="text-lg">{level.name}</CardTitle>
                  <CardDescription>Duration: {level.duration}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {level.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="secondary" className="rounded-button">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Resources:</h4>
                    <div className="space-y-1">
                      {level.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="flex items-center gap-2 text-sm">
                          <FileText className="w-3 h-3 text-blue-600" />
                          <span>{resource}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Assessments:</h4>
                    <div className="space-y-1">
                      {level.assessments.map((assessment, assessmentIndex) => (
                        <div key={assessmentIndex} className="flex items-center gap-2 text-sm">
                          <Award className="w-3 h-3 text-purple-600" />
                          <span>{assessment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function LessonPlanCard({ lesson, onView, onEdit }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'draft': return 'text-orange-600 bg-orange-100'
      case 'archived': return 'text-gray-600 bg-gray-100'
      default: return 'text-blue-600 bg-blue-100'
    }
  }

  return (
    <Card className="rounded-card shadow-card hover-lift transition-modern">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">{lesson.title}</h3>
            <p className="text-sm text-muted-foreground">{lesson.subject} • {lesson.level}</p>
          </div>
          
          <Badge className={`rounded-button ${getStatusColor(lesson.status)}`}>
            {lesson.status}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-medium">{lesson.duration}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Objectives:</span>
            <span className="font-medium">{lesson.objectives.length}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Activities:</span>
            <span className="font-medium">{lesson.activities.length}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Created by:</span>
            <span className="font-medium">{lesson.createdBy}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(lesson)}
            className="flex-1 rounded-button"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(lesson)}
            className="flex-1 rounded-button"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function LessonPlanDetails({ lesson, onClose }) {
  if (!lesson) return null

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'review': return 'text-blue-600 bg-blue-100'
      case 'instruction': return 'text-green-600 bg-green-100'
      case 'practice': return 'text-purple-600 bg-purple-100'
      case 'assessment': return 'text-red-600 bg-red-100'
      case 'discussion': return 'text-orange-600 bg-orange-100'
      case 'listening': return 'text-indigo-600 bg-indigo-100'
      case 'memorization': return 'text-pink-600 bg-pink-100'
      case 'reflection': return 'text-teal-600 bg-teal-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <Card className="rounded-card shadow-modal">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{lesson.title}</CardTitle>
            <CardDescription className="text-lg">
              {lesson.subject} • {lesson.level} • {lesson.duration}
            </CardDescription>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-button">
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </Button>
            <Button variant="outline" className="rounded-button">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={onClose} className="rounded-button">
              Close
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Learning Objectives */}
        <Card className="rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Learning Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lesson.objectives.map((objective, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>{objective}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Materials Needed */}
        <Card className="rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookMarked className="w-5 h-5" />
              Materials Needed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.materials.map((material, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{material}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lesson Activities */}
        <Card className="rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Lesson Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lesson.activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-card border border-border">
                  <div className="text-center min-w-20">
                    <Badge variant="outline" className="rounded-button text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">{activity.activity}</h4>
                    <Badge className={`rounded-button text-xs ${getActivityTypeColor(activity.type)}`}>
                      {activity.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Homework & Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="w-5 h-5" />
                Homework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{lesson.homework}</p>
            </CardContent>
          </Card>

          <Card className="rounded-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{lesson.assessment}</p>
            </CardContent>
          </Card>
        </div>

        {/* Teacher Notes */}
        <Card className="rounded-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Teacher Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{lesson.notes}</p>
          </CardContent>
        </Card>

        {/* Lesson Info */}
        <Card className="rounded-card">
          <CardHeader>
            <CardTitle>Lesson Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium">Created By:</Label>
                <p className="mt-1">{lesson.createdBy}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Created Date:</Label>
                <p className="mt-1">{new Date(lesson.createdDate).toLocaleDateString('en-GB')}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status:</Label>
                <Badge className={`mt-1 rounded-button ${getStatusColor(lesson.status)}`}>
                  {lesson.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export function CurriculumManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedCurriculum, setSelectedCurriculum] = useState('quran')
  const [selectedModule, setSelectedModule] = useState(null)
  const [lessonPlans] = useState(mockLessonPlans)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('All Subjects')
  const [selectedLevel, setSelectedLevel] = useState('All Levels')
  const [viewingLesson, setViewingLesson] = useState(null)

  const subjects = ['All Subjects', 'Quran Studies', 'Arabic Language', 'Aqeedah', 'Fiqh', 'Seerah', 'Hadith']
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

  const filteredLessonPlans = lessonPlans.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'All Subjects' || lesson.subject === selectedSubject
    const matchesLevel = selectedLevel === 'All Levels' || lesson.level === selectedLevel
    return matchesSearch && matchesSubject && matchesLevel
  })

  const handleSelectModule = (module) => {
    setSelectedModule(module)
  }

  const handleViewLesson = (lesson) => {
    setViewingLesson(lesson)
  }

  const handleEditLesson = (lesson) => {
    // In a real app, this would open an edit form
    console.log('Edit lesson:', lesson)
  }

  if (selectedModule) {
    return (
      <div className="p-6 animate-fade-in">
        <ModuleDetails
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      </div>
    )
  }

  if (viewingLesson) {
    return (
      <div className="p-6 animate-fade-in">
        <LessonPlanDetails
          lesson={viewingLesson}
          onClose={() => setViewingLesson(null)}
        />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Curriculum Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage curriculum structure, lesson plans, and educational resources
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-button">
            <Download className="w-4 h-4 mr-2" />
            Export Curriculum
          </Button>
          <Button variant="outline" className="rounded-button">
            <Upload className="w-4 h-4 mr-2" />
            Import Resources
          </Button>
          <Button className="rounded-button">
            <Plus className="w-4 h-4 mr-2" />
            Create Lesson Plan
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-modern">
          <TabsTrigger value="overview" className="rounded-button">
            <BookOpen className="w-4 h-4 mr-2" />
            Curriculum Overview
          </TabsTrigger>
          <TabsTrigger value="lessons" className="rounded-button">
            <FileText className="w-4 h-4 mr-2" />
            Lesson Plans
          </TabsTrigger>
          <TabsTrigger value="resources" className="rounded-button">
            <BookMarked className="w-4 h-4 mr-2" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Curriculum Selection */}
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="curriculum">Select Curriculum:</Label>
                <select
                  id="curriculum"
                  value={selectedCurriculum}
                  onChange={(e) => setSelectedCurriculum(e.target.value)}
                  className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
                >
                  <option value="quran">Quran Studies</option>
                  <option value="islamicStudies">Islamic Studies</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Curriculum Overview */}
          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">{curriculumData[selectedCurriculum].name}</CardTitle>
              <CardDescription className="text-lg">
                {curriculumData[selectedCurriculum].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CurriculumOverview
                curriculum={curriculumData[selectedCurriculum]}
                onSelectModule={handleSelectModule}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lessons" className="space-y-6 mt-6">
          {/* Search and Filter */}
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search lesson plans..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-input"
                    />
                  </div>
                </div>
                
                <div>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessonPlans.map(lesson => (
              <LessonPlanCard
                key={lesson.id}
                lesson={lesson}
                onView={handleViewLesson}
                onEdit={handleEditLesson}
              />
            ))}
          </div>

          {filteredLessonPlans.length === 0 && (
            <Card className="rounded-card shadow-card">
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No lesson plans found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or create a new lesson plan
                </p>
                <Button className="rounded-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Lesson Plan
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardContent className="p-8 text-center">
              <BookMarked className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Resource Library</h3>
              <p className="text-muted-foreground mb-4">
                Manage educational resources, materials, and digital content
              </p>
              <Button className="rounded-button">
                <Plus className="w-4 h-4 mr-2" />
                Add Resources
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CurriculumManagement

