import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  FileText,
  Download,
  Calendar,
  Clock,
  Users,
  GraduationCap,
  DollarSign,
  BarChart3,
  PieChart,
  TrendingUp,
  Filter,
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  Share,
  Send,
  Mail,
  Printer,
  Save,
  RefreshCw,
  Settings,
  Star,
  Award,
  Target,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  BookOpen,
  School,
  Building,
  Home,
  Phone,
  AtSign,
  Globe,
  Smartphone,
  MessageSquare,
  Bell,
  Flag,
  Bookmark,
  Archive,
  Copy,
  ExternalLink,
  Upload,
  Zap,
  Heart,
  ThumbsUp,
  Smile,
  Frown,
  Meh,
  MapPin,
  Car,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Calculator,
  Percent,
  Hash,
  Tag,
  Link,
  Image,
  Video,
  Music,
  Mic,
  Camera,
  Headphones,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Radio,
  Tv,
  Monitor,
  Laptop,
  Tablet,
  Watch,
  Gamepad2,
  Joystick,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Spade,
  Club,
  Diamond,
  Heart as HeartSuit
} from 'lucide-react'

// Mock reports data
const mockReports = [
  {
    id: 1,
    title: 'Monthly Attendance Report',
    description: 'Comprehensive attendance analysis for all classes and students',
    type: 'attendance',
    category: 'Academic',
    status: 'completed',
    generatedDate: '2024-08-10T09:00:00Z',
    generatedBy: 'System',
    fileSize: '2.4 MB',
    format: 'PDF',
    recipients: ['admin@madrasah.edu', 'principal@madrasah.edu'],
    downloadCount: 15,
    parameters: {
      dateRange: 'July 2024',
      classes: 'All Classes',
      includeGraphs: true,
      includeIndividualReports: true
    }
  },
  {
    id: 2,
    title: 'Student Progress Summary',
    description: 'Individual student progress across all subjects with recommendations',
    type: 'progress',
    category: 'Academic',
    status: 'completed',
    generatedDate: '2024-08-09T14:30:00Z',
    generatedBy: 'Ustadha Fatima',
    fileSize: '5.8 MB',
    format: 'PDF',
    recipients: ['parents@madrasah.edu'],
    downloadCount: 42,
    parameters: {
      dateRange: 'Q2 2024',
      subjects: 'All Subjects',
      includeRecommendations: true,
      includeParentNotes: true
    }
  },
  {
    id: 3,
    title: 'Financial Performance Report',
    description: 'Revenue, expenses, and collection analysis with forecasting',
    type: 'finance',
    category: 'Financial',
    status: 'generating',
    generatedDate: null,
    generatedBy: 'System',
    fileSize: null,
    format: 'Excel',
    recipients: ['finance@madrasah.edu', 'admin@madrasah.edu'],
    downloadCount: 0,
    parameters: {
      dateRange: 'YTD 2024',
      includeForecasting: true,
      includeComparisons: true,
      breakdownByClass: true
    }
  },
  {
    id: 4,
    title: 'Teacher Performance Evaluation',
    description: 'Comprehensive evaluation of teaching effectiveness and student outcomes',
    type: 'evaluation',
    category: 'HR',
    status: 'scheduled',
    generatedDate: '2024-08-15T10:00:00Z',
    generatedBy: 'Principal',
    fileSize: null,
    format: 'PDF',
    recipients: ['hr@madrasah.edu', 'principal@madrasah.edu'],
    downloadCount: 0,
    parameters: {
      evaluationPeriod: 'Semester 1 2024',
      includeStudentFeedback: true,
      includeParentFeedback: true,
      includePeerReviews: false
    }
  },
  {
    id: 5,
    title: 'Quran Memorization Progress',
    description: 'Detailed tracking of Quran memorization progress by student and class',
    type: 'quran',
    category: 'Academic',
    status: 'completed',
    generatedDate: '2024-08-08T16:45:00Z',
    generatedBy: 'Ustadh Muhammad',
    fileSize: '3.2 MB',
    format: 'PDF',
    recipients: ['teachers@madrasah.edu', 'parents@madrasah.edu'],
    downloadCount: 28,
    parameters: {
      dateRange: 'July 2024',
      includeAudioAssessments: true,
      includeTajweedScores: true,
      includeMemorizationChart: true
    }
  }
]

// Mock report templates
const reportTemplates = [
  {
    id: 1,
    name: 'Student Progress Report',
    description: 'Individual student academic progress across all subjects',
    category: 'Academic',
    frequency: 'Monthly',
    parameters: ['dateRange', 'studentId', 'subjects', 'includeRecommendations'],
    estimatedTime: '5-10 minutes',
    icon: GraduationCap
  },
  {
    id: 2,
    name: 'Attendance Analysis',
    description: 'Comprehensive attendance tracking and analysis',
    category: 'Academic',
    frequency: 'Weekly/Monthly',
    parameters: ['dateRange', 'classes', 'includeGraphs', 'includeIndividual'],
    estimatedTime: '3-5 minutes',
    icon: Users
  },
  {
    id: 3,
    name: 'Financial Summary',
    description: 'Revenue, expenses, and collection performance',
    category: 'Financial',
    frequency: 'Monthly/Quarterly',
    parameters: ['dateRange', 'includeForecasting', 'breakdownByClass'],
    estimatedTime: '10-15 minutes',
    icon: DollarSign
  },
  {
    id: 4,
    name: 'Quran Progress Tracker',
    description: 'Memorization progress and Tajweed assessment',
    category: 'Islamic Studies',
    frequency: 'Monthly',
    parameters: ['dateRange', 'includeAudio', 'includeTajweed'],
    estimatedTime: '8-12 minutes',
    icon: BookOpen
  },
  {
    id: 5,
    name: 'Parent Communication Log',
    description: 'Summary of parent interactions and feedback',
    category: 'Communication',
    frequency: 'Monthly',
    parameters: ['dateRange', 'communicationType', 'includeResponses'],
    estimatedTime: '5-8 minutes',
    icon: MessageSquare
  },
  {
    id: 6,
    name: 'Class Performance Overview',
    description: 'Overall class performance and comparative analysis',
    category: 'Academic',
    frequency: 'Quarterly',
    parameters: ['dateRange', 'classes', 'subjects', 'includeComparisons'],
    estimatedTime: '12-18 minutes',
    icon: BarChart3
  }
]

function ReportCard({ report, onView, onDownload, onShare, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'generating': return 'text-orange-600 bg-orange-100'
      case 'scheduled': return 'text-blue-600 bg-blue-100'
      case 'failed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Academic': return 'text-blue-600 bg-blue-100'
      case 'Financial': return 'text-green-600 bg-green-100'
      case 'HR': return 'text-purple-600 bg-purple-100'
      case 'Communication': return 'text-pink-600 bg-pink-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not generated'
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="rounded-card shadow-card hover-lift transition-modern">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{report.title}</h3>
              <Badge className={`rounded-button text-xs ${getStatusColor(report.status)}`}>
                {report.status}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {report.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge className={`rounded-button text-xs ${getCategoryColor(report.category)}`}>
                {report.category}
              </Badge>
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                {report.format}
              </span>
              {report.fileSize && (
                <span>{report.fileSize}</span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 ml-4">
            <Button variant="outline" size="sm" onClick={() => onView(report)} className="rounded-button">
              <Eye className="w-4 h-4" />
            </Button>
            {report.status === 'completed' && (
              <>
                <Button variant="outline" size="sm" onClick={() => onDownload(report)} className="rounded-button">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onShare(report)} className="rounded-button">
                  <Share className="w-4 h-4" />
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" onClick={() => onDelete(report)} className="rounded-button">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Generated:</span>
            <span className="font-medium">{formatDate(report.generatedDate)}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Generated by:</span>
            <span className="font-medium">{report.generatedBy}</span>
          </div>
          
          {report.downloadCount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Downloads:</span>
              <span className="font-medium">{report.downloadCount}</span>
            </div>
          )}

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Recipients:</p>
            <div className="flex flex-wrap gap-1">
              {report.recipients.map((recipient, index) => (
                <Badge key={index} variant="outline" className="text-xs rounded-button">
                  {recipient}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReportTemplateCard({ template, onGenerate }) {
  const Icon = template.icon

  return (
    <Card className="rounded-card shadow-card hover-lift transition-modern">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Category:</span>
                <Badge variant="outline" className="rounded-button text-xs">
                  {template.category}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Frequency:</span>
                <span className="font-medium">{template.frequency}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Est. Time:</span>
                <span className="font-medium">{template.estimatedTime}</span>
              </div>
            </div>
            
            <Button 
              onClick={() => onGenerate(template)}
              className="w-full rounded-button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReportGenerationModal({ template, isOpen, onClose, onGenerate }) {
  const [parameters, setParameters] = useState({})
  const [recipients, setRecipients] = useState('')
  const [format, setFormat] = useState('PDF')

  if (!isOpen || !template) return null

  const handleGenerate = () => {
    onGenerate({
      templateId: template.id,
      parameters,
      recipients: recipients.split(',').map(r => r.trim()).filter(r => r),
      format
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 rounded-card">
        <CardHeader>
          <CardTitle>Generate {template.name}</CardTitle>
          <CardDescription>{template.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateRange">Date Range</Label>
              <select
                id="dateRange"
                className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-input focus-modern"
                onChange={(e) => setParameters({...parameters, dateRange: e.target.value})}
              >
                <option value="">Select date range</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-quarter">Last Quarter</option>
                <option value="ytd">Year to Date</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="format">Output Format</Label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-input focus-modern"
              >
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="Word">Word</option>
                <option value="CSV">CSV</option>
              </select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="recipients">Recipients (comma-separated emails)</Label>
            <Textarea
              id="recipients"
              placeholder="admin@madrasah.edu, principal@madrasah.edu"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              className="mt-1 rounded-input"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeGraphs"
                onChange={(e) => setParameters({...parameters, includeGraphs: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="includeGraphs">Include Graphs & Charts</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeRecommendations"
                onChange={(e) => setParameters({...parameters, includeRecommendations: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="includeRecommendations">Include Recommendations</Label>
            </div>
          </div>
        </CardContent>
        
        <div className="flex justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="rounded-button">
            Cancel
          </Button>
          <Button onClick={handleGenerate} className="rounded-button">
            <Zap className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </Card>
    </div>
  )
}

export function ReportsCenter() {
  const [activeTab, setActiveTab] = useState('reports')
  const [reports] = useState(mockReports)
  const [templates] = useState(reportTemplates)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showGenerationModal, setShowGenerationModal] = useState(false)

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleViewReport = (report) => {
    console.log('View report:', report)
  }

  const handleDownloadReport = (report) => {
    console.log('Download report:', report)
  }

  const handleShareReport = (report) => {
    console.log('Share report:', report)
  }

  const handleDeleteReport = (report) => {
    console.log('Delete report:', report)
  }

  const handleGenerateFromTemplate = (template) => {
    setSelectedTemplate(template)
    setShowGenerationModal(true)
  }

  const handleGenerateReport = (config) => {
    console.log('Generate report with config:', config)
    // In a real app, this would trigger report generation
  }

  const handleRefreshReports = () => {
    alert('Refreshing reports data...')
    // In a real app, this would refresh the reports list from API
  }

  const handleReportSettings = () => {
    alert('Opening report settings...')
    // In a real app, this would open report configuration modal
  }

  const handleNewReport = () => {
    setShowGenerationModal(true)
    setSelectedTemplate(null)
  }

  const statusOptions = ['all', 'completed', 'generating', 'scheduled', 'failed']
  const categoryOptions = ['all', 'Academic', 'Financial', 'HR', 'Communication']

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports Center</h1>
          <p className="text-muted-foreground mt-1">
            Generate, manage, and distribute comprehensive reports
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleRefreshReports} className="rounded-button">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleReportSettings} className="rounded-button">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button onClick={handleNewReport} className="rounded-button">
            <Plus className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-blue-600">{reports.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {reports.filter(r => r.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">
                  {reports.filter(r => r.status === 'generating').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Templates</p>
                <p className="text-2xl font-bold text-purple-600">{templates.length}</p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-modern">
          <TabsTrigger value="reports" className="rounded-button">
            <FileText className="w-4 h-4 mr-2" />
            Generated Reports
          </TabsTrigger>
          <TabsTrigger value="templates" className="rounded-button">
            <Star className="w-4 h-4 mr-2" />
            Report Templates
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="rounded-button">
            <Calendar className="w-4 h-4 mr-2" />
            Scheduled Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6 mt-6">
          {/* Search and Filter */}
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-input"
                    />
                  </div>
                </div>
                
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
                  >
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map(report => (
              <ReportCard
                key={report.id}
                report={report}
                onView={handleViewReport}
                onDownload={handleDownloadReport}
                onShare={handleShareReport}
                onDelete={handleDeleteReport}
              />
            ))}
          </div>

          {filteredReports.length === 0 && (
            <Card className="rounded-card shadow-card">
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reports found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or generate a new report
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(template => (
              <ReportTemplateCard
                key={template.id}
                template={template}
                onGenerate={handleGenerateFromTemplate}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Scheduled Reports</h3>
              <p className="text-muted-foreground mb-4">
                Set up automated report generation and distribution
              </p>
              <Button className="rounded-button">
                <Plus className="w-4 h-4 mr-2" />
                Schedule New Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Generation Modal */}
      <ReportGenerationModal
        template={selectedTemplate}
        isOpen={showGenerationModal}
        onClose={() => {
          setShowGenerationModal(false)
          setSelectedTemplate(null)
        }}
        onGenerate={handleGenerateReport}
      />
    </div>
  )
}

export default ReportsCenter

