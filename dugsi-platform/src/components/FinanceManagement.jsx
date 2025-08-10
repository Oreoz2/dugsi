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
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Users,
  User,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Edit,
  Eye,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Receipt,
  FileText,
  PieChart,
  BarChart3,
  Activity,
  Target,
  Wallet,
  Banknote,
  Calculator,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Send,
  Printer,
  Mail,
  Phone,
  MapPin,
  Building,
  School,
  GraduationCap,
  BookOpen,
  Star,
  Award,
  Flag,
  AlertTriangle,
  CheckSquare,
  Square,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  History,
  Repeat,
  Zap,
  Shield,
  Lock,
  Unlock,
  Key,
  Settings,
  HelpCircle,
  ExternalLink,
  Copy,
  Share,
  Save,
  Archive,
  Bookmark,
  Tag,
  Hash,
  Globe,
  Smartphone,
  AtSign
} from 'lucide-react'

// Mock student fee data
const mockStudentFees = [
  {
    id: 1,
    student: {
      name: 'Fatima Al-Zahra',
      class: 'Year 7',
      avatar: 'FA',
      parentName: 'Ahmad Al-Zahra',
      parentPhone: '+1-555-0123',
      parentEmail: 'ahmad.alzahra@email.com'
    },
    fees: {
      tuition: { amount: 200, paid: 200, due: 0, status: 'paid' },
      books: { amount: 50, paid: 50, due: 0, status: 'paid' },
      activities: { amount: 30, paid: 20, due: 10, status: 'partial' },
      transport: { amount: 80, paid: 0, due: 80, status: 'pending' }
    },
    totalAmount: 360,
    totalPaid: 270,
    totalDue: 90,
    lastPayment: {
      amount: 50,
      date: '2024-08-05',
      method: 'Bank Transfer',
      reference: 'TXN001234'
    },
    paymentHistory: [
      { date: '2024-08-05', amount: 50, method: 'Bank Transfer', type: 'Books', reference: 'TXN001234' },
      { date: '2024-08-01', amount: 200, method: 'Cash', type: 'Tuition', reference: 'CASH001' },
      { date: '2024-07-28', amount: 20, method: 'Card', type: 'Activities', reference: 'CARD567' }
    ],
    dueDate: '2024-08-15',
    status: 'partial'
  },
  {
    id: 2,
    student: {
      name: 'Omar Ibn Khattab',
      class: 'Year 9',
      avatar: 'OIK',
      parentName: 'Hassan Ibn Khattab',
      parentPhone: '+1-555-0456',
      parentEmail: 'hassan.ibnkhattab@email.com'
    },
    fees: {
      tuition: { amount: 250, paid: 250, due: 0, status: 'paid' },
      books: { amount: 60, paid: 60, due: 0, status: 'paid' },
      activities: { amount: 40, paid: 40, due: 0, status: 'paid' },
      transport: { amount: 80, paid: 80, due: 0, status: 'paid' }
    },
    totalAmount: 430,
    totalPaid: 430,
    totalDue: 0,
    lastPayment: {
      amount: 430,
      date: '2024-08-01',
      method: 'Bank Transfer',
      reference: 'TXN001567'
    },
    paymentHistory: [
      { date: '2024-08-01', amount: 430, method: 'Bank Transfer', type: 'Full Payment', reference: 'TXN001567' }
    ],
    dueDate: '2024-08-15',
    status: 'paid'
  },
  {
    id: 3,
    student: {
      name: 'Aisha Siddique',
      class: 'Year 5',
      avatar: 'AS',
      parentName: 'Fatima Siddique',
      parentPhone: '+1-555-0789',
      parentEmail: 'fatima.siddique@email.com'
    },
    fees: {
      tuition: { amount: 180, paid: 0, due: 180, status: 'pending' },
      books: { amount: 40, paid: 0, due: 40, status: 'pending' },
      activities: { amount: 25, paid: 0, due: 25, status: 'pending' },
      transport: { amount: 70, paid: 0, due: 70, status: 'pending' }
    },
    totalAmount: 315,
    totalPaid: 0,
    totalDue: 315,
    lastPayment: null,
    paymentHistory: [],
    dueDate: '2024-08-15',
    status: 'overdue'
  }
]

// Mock payment transactions
const mockTransactions = [
  {
    id: 1,
    date: '2024-08-10',
    student: 'Omar Ibn Khattab',
    amount: 430,
    method: 'Bank Transfer',
    type: 'Fee Payment',
    status: 'completed',
    reference: 'TXN001567',
    description: 'Full monthly fee payment'
  },
  {
    id: 2,
    date: '2024-08-09',
    student: 'Fatima Al-Zahra',
    amount: 50,
    method: 'Cash',
    type: 'Books Fee',
    status: 'completed',
    reference: 'CASH002',
    description: 'Books and materials fee'
  },
  {
    id: 3,
    date: '2024-08-08',
    student: 'Ahmad Hassan',
    amount: 200,
    method: 'Card',
    type: 'Tuition',
    status: 'completed',
    reference: 'CARD789',
    description: 'Monthly tuition payment'
  },
  {
    id: 4,
    date: '2024-08-07',
    student: 'Maryam Ahmed',
    amount: 75,
    method: 'Bank Transfer',
    type: 'Transport',
    status: 'pending',
    reference: 'TXN001890',
    description: 'Transportation fee'
  }
]

// Mock financial summary data
const financialSummary = {
  totalRevenue: 12450,
  totalCollected: 9850,
  totalOutstanding: 2600,
  collectionRate: 79,
  monthlyTarget: 15000,
  studentsWithOutstanding: 8,
  totalStudents: 25,
  averageFeePerStudent: 350,
  recentPayments: 5,
  overduePayments: 3
}

function StudentFeeCard({ studentFee, onViewDetails, onRecordPayment, onSendReminder }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100'
      case 'partial': return 'text-orange-600 bg-orange-100'
      case 'pending': return 'text-blue-600 bg-blue-100'
      case 'overdue': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const paymentPercentage = Math.round((studentFee.totalPaid / studentFee.totalAmount) * 100)

  return (
    <Card className="rounded-card shadow-card hover-lift transition-modern">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {studentFee.student.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{studentFee.student.name}</h3>
              <p className="text-sm text-muted-foreground">{studentFee.student.class}</p>
              <p className="text-xs text-muted-foreground">{studentFee.student.parentName}</p>
            </div>
          </div>
          
          <Badge className={`rounded-button ${getStatusColor(studentFee.status)}`}>
            {studentFee.status}
          </Badge>
        </div>

        {/* Fee Breakdown */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Amount:</span>
            <span className="font-bold">${studentFee.totalAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Paid:</span>
            <span className="font-medium text-green-600">${studentFee.totalPaid}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Outstanding:</span>
            <span className="font-medium text-red-600">${studentFee.totalDue}</span>
          </div>
        </div>

        {/* Payment Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Payment Progress</span>
            <span>{paymentPercentage}%</span>
          </div>
          <Progress value={paymentPercentage} className="h-3 rounded-full" />
        </div>

        {/* Fee Categories */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.entries(studentFee.fees).map(([category, fee]) => (
            <div key={category} className="text-xs">
              <div className="flex justify-between">
                <span className="capitalize">{category}:</span>
                <span className={`font-medium ${
                  fee.status === 'paid' ? 'text-green-600' : 
                  fee.status === 'partial' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  ${fee.paid}/${fee.amount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Last Payment */}
        {studentFee.lastPayment && (
          <div className="mb-4 p-3 bg-muted/50 rounded-card">
            <p className="text-xs text-muted-foreground mb-1">Last Payment:</p>
            <div className="flex justify-between text-sm">
              <span>${studentFee.lastPayment.amount} via {studentFee.lastPayment.method}</span>
              <span>{new Date(studentFee.lastPayment.date).toLocaleDateString('en-GB')}</span>
            </div>
          </div>
        )}

        {/* Due Date */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <span className="text-muted-foreground">Due Date:</span>
          <span className={`font-medium ${
            new Date(studentFee.dueDate) < new Date() && studentFee.totalDue > 0 
              ? 'text-red-600' : 'text-foreground'
          }`}>
            {new Date(studentFee.dueDate).toLocaleDateString('en-GB')}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(studentFee)}
            className="flex-1 rounded-button"
          >
            <Eye className="w-4 h-4 mr-2" />
            Details
          </Button>
          
          {studentFee.totalDue > 0 && (
            <>
              <Button
                size="sm"
                onClick={() => onRecordPayment(studentFee)}
                className="flex-1 rounded-button"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Payment
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSendReminder(studentFee)}
                className="rounded-button"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function TransactionRow({ transaction, onViewDetails }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-orange-600 bg-orange-100'
      case 'failed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getMethodIcon = (method) => {
    switch (method) {
      case 'Cash': return <Banknote className="w-4 h-4" />
      case 'Card': return <CreditCard className="w-4 h-4" />
      case 'Bank Transfer': return <Building className="w-4 h-4" />
      default: return <DollarSign className="w-4 h-4" />
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-border hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-muted rounded-full">
          {getMethodIcon(transaction.method)}
        </div>
        
        <div>
          <h4 className="font-medium">{transaction.student}</h4>
          <p className="text-sm text-muted-foreground">{transaction.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs rounded-button">
              {transaction.type}
            </Badge>
            <span className="text-xs text-muted-foreground">{transaction.reference}</span>
          </div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-bold text-lg">${transaction.amount}</div>
        <div className="text-sm text-muted-foreground">{transaction.method}</div>
        <Badge className={`text-xs rounded-button ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </Badge>
      </div>
      
      <div className="text-right">
        <div className="text-sm">{new Date(transaction.date).toLocaleDateString('en-GB')}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(transaction)}
          className="mt-2 rounded-button"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

function FinancialSummaryCards({ summary }) {
  const collectionPercentage = Math.round((summary.totalCollected / summary.totalRevenue) * 100)
  const targetPercentage = Math.round((summary.totalCollected / summary.monthlyTarget) * 100)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="rounded-card shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">${summary.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% from last month
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="rounded-card shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Collected</p>
              <p className="text-2xl font-bold text-blue-600">${summary.totalCollected.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {collectionPercentage}% of total revenue
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="rounded-card shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Outstanding</p>
              <p className="text-2xl font-bold text-red-600">${summary.totalOutstanding.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {summary.studentsWithOutstanding} students
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="rounded-card shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Collection Rate</p>
              <p className="text-2xl font-bold text-purple-600">{summary.collectionRate}%</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${summary.collectionRate}%` }}
                ></div>
              </div>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function FinanceManagement() {
  const [activeTab, setActiveTab] = useState('overview')
  const [studentFees] = useState(mockStudentFees)
  const [transactions] = useState(mockTransactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredStudentFees = studentFees.filter(studentFee => {
    const matchesSearch = studentFee.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         studentFee.student.parentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || studentFee.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewDetails = (item) => {
    console.log('View details:', item)
  }

  const handleRecordPayment = (studentFee) => {
    console.log('Record payment for:', studentFee.student.name)
  }

  const handleSendReminder = (studentFee) => {
    console.log('Send reminder to:', studentFee.student.parentName)
  }

  const statusOptions = ['all', 'paid', 'partial', 'pending', 'overdue']

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finance Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage student fees, payments, and financial reporting
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-button">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" className="rounded-button">
            <Receipt className="w-4 h-4 mr-2" />
            Generate Invoice
          </Button>
          <Button className="rounded-button">
            <Plus className="w-4 h-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <FinancialSummaryCards summary={financialSummary} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-modern">
          <TabsTrigger value="overview" className="rounded-button">
            <PieChart className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="student-fees" className="rounded-button">
            <Users className="w-4 h-4 mr-2" />
            Student Fees
          </TabsTrigger>
          <TabsTrigger value="transactions" className="rounded-button">
            <Receipt className="w-4 h-4 mr-2" />
            Transactions
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-button">
            <BarChart3 className="w-4 h-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Target Progress */}
            <Card className="rounded-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Monthly Target Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Target:</span>
                    <span className="font-bold">${financialSummary.monthlyTarget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Collected:</span>
                    <span className="font-bold text-blue-600">${financialSummary.totalCollected.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Remaining:</span>
                    <span className="font-bold text-orange-600">
                      ${(financialSummary.monthlyTarget - financialSummary.totalCollected).toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={(financialSummary.totalCollected / financialSummary.monthlyTarget) * 100} 
                    className="h-4 rounded-full" 
                  />
                  <p className="text-sm text-center text-muted-foreground">
                    {Math.round((financialSummary.totalCollected / financialSummary.monthlyTarget) * 100)}% of monthly target achieved
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods Breakdown */}
            <Card className="rounded-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Bank Transfer</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$5,200</div>
                      <div className="text-xs text-muted-foreground">53%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Cash</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$3,150</div>
                      <div className="text-xs text-muted-foreground">32%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Card</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$1,500</div>
                      <div className="text-xs text-muted-foreground">15%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Financial Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.slice(0, 5).map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-card border border-border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-full">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.student}</p>
                        <p className="text-sm text-muted-foreground">{transaction.type}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold">${transaction.amount}</p>
                      <p className="text-sm text-muted-foreground">{transaction.method}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="student-fees" className="space-y-6 mt-6">
          {/* Search and Filter */}
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students or parents..."
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
              </div>
            </CardContent>
          </Card>

          {/* Student Fee Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudentFees.map(studentFee => (
              <StudentFeeCard
                key={studentFee.id}
                studentFee={studentFee}
                onViewDetails={handleViewDetails}
                onRecordPayment={handleRecordPayment}
                onSendReminder={handleSendReminder}
              />
            ))}
          </div>

          {filteredStudentFees.length === 0 && (
            <Card className="rounded-card shadow-card">
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No students found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or status filter
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>
                View and manage all payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {transactions.map(transaction => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardContent className="p-8 text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Financial Reports</h3>
              <p className="text-muted-foreground mb-4">
                Generate comprehensive financial reports and analytics
              </p>
              <div className="flex gap-3 justify-center">
                <Button className="rounded-button">
                  <Download className="w-4 h-4 mr-2" />
                  Monthly Report
                </Button>
                <Button variant="outline" className="rounded-button">
                  <FileText className="w-4 h-4 mr-2" />
                  Custom Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default FinanceManagement

