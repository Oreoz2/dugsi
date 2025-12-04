'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTenant } from '@/lib/contexts/TenantContext'
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Users,
  Search,
  Download,
  Loader2,
  RefreshCw,
  Plus,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

type FeeRecord = {
  id: string
  studentId: string
  feeType: string
  amount: number
  dueDate: string
  paidAmount: number
  paymentDate?: string
  paymentMethod?: string
  status: string
  notes?: string
  student: {
    englishName: string
    arabicName?: string
    studentId: string
    classLevel?: string
    guardianName?: string
    guardianPhone?: string
  }
}

export function FinanceManagement() {
  const { tenant, isLoading: tenantLoading } = useTenant()
  const [records, setRecords] = useState<FeeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (!tenant) return

    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch('/api/finance')

        if (!response.ok) throw new Error('Failed to fetch data')

        const data = await response.json()
        setRecords(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tenant])

  const handleRecordPayment = async (id: string, amount: number) => {
    try {
      const response = await fetch(`/api/finance/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paidAmount: amount,
          paymentDate: new Date().toISOString(),
          status: 'Paid',
        }),
      })

      if (!response.ok) throw new Error('Failed to record payment')

      const updated = await response.json()
      setRecords(records.map(r => r.id === id ? updated : r))
    } catch (err) {
      alert('Failed to record payment')
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
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = records.reduce((sum, r) => sum + r.amount, 0)
  const totalCollected = records.reduce((sum, r) => sum + r.paidAmount, 0)
  const totalOutstanding = totalRevenue - totalCollected
  const collectionRate = totalRevenue > 0 ? Math.round((totalCollected / totalRevenue) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <DollarSign className="w-8 h-8" />
            Finance Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage fees and payments
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Fee
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">£{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collected</p>
                <p className="text-2xl font-bold text-blue-600">£{totalCollected.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold text-red-600">£{totalOutstanding.toLocaleString()}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Collection Rate</p>
                <p className="text-2xl font-bold">{collectionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Fee Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map(record => {
          const paymentProgress = (record.paidAmount / record.amount) * 100
          const isOverdue = new Date(record.dueDate) < new Date() && record.status !== 'Paid'

          return (
            <Card key={record.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{record.student.englishName}</h3>
                    <p className="text-sm text-muted-foreground">{record.student.studentId}</p>
                    {record.student.guardianName && (
                      <p className="text-xs text-muted-foreground">Guardian: {record.student.guardianName}</p>
                    )}
                  </div>
                  <Badge className={
                    record.status === 'Paid' ? 'bg-green-500' :
                      isOverdue ? 'bg-red-500' :
                        'bg-orange-500'
                  }>
                    {isOverdue && record.status !== 'Paid' ? 'Overdue' : record.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee Type:</span>
                    <span className="font-medium">{record.feeType}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-bold">£{record.amount}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Paid:</span>
                    <span className="font-bold text-green-600">£{record.paidAmount}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Outstanding:</span>
                    <span className="font-bold text-red-600">£{record.amount - record.paidAmount}</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Payment Progress</span>
                      <span>{Math.round(paymentProgress)}%</span>
                    </div>
                    <Progress value={paymentProgress} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                      {new Date(record.dueDate).toLocaleDateString()}
                    </span>
                  </div>

                  {record.paymentDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Paid On:</span>
                      <span>{new Date(record.paymentDate).toLocaleDateString()}</span>
                    </div>
                  )}

                  {record.status !== 'Paid' && (
                    <Button
                      className="w-full mt-2"
                      size="sm"
                      onClick={() => handleRecordPayment(record.id, record.amount)}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Record Payment
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Fee Records</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Start tracking student fees'}
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Fee Record
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
