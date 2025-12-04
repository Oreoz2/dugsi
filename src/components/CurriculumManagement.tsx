'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { useTenant } from '@/lib/contexts/TenantContext'
import {
  School,
  Users,
  Plus,
  Edit,
  Trash2,
  Loader2,
  RefreshCw,
  AlertCircle,
  Save,
  X
} from 'lucide-react'

type Class = {
  id: string
  name: string
  level: string
  teacher: string
  schedule?: string
  capacity: number
  enrolled: number
  description?: string
}

export function CurriculumManagement() {
  const { tenant, isLoading: tenantLoading } = useTenant()
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingClass, setEditingClass] = useState<Class | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    level: '',
    teacher: '',
    schedule: '',
    capacity: 20,
    enrolled: 0,
    description: '',
  })

  useEffect(() => {
    if (!tenant) return

    async function fetchClasses() {
      try {
        setLoading(true)
        const response = await fetch('/api/classes')

        if (!response.ok) throw new Error('Failed to fetch classes')

        const data = await response.json()
        setClasses(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [tenant])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingClass ? `/api/classes/${editingClass.id}` : '/api/classes'
      const method = editingClass ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tenantId: tenant?.id,
        }),
      })

      if (!response.ok) throw new Error('Failed to save class')

      const savedClass = await response.json()

      if (editingClass) {
        setClasses(classes.map(c => c.id === savedClass.id ? savedClass : c))
      } else {
        setClasses([...classes, savedClass])
      }

      setShowForm(false)
      setEditingClass(null)
      setFormData({
        name: '',
        level: '',
        teacher: '',
        schedule: '',
        capacity: 20,
        enrolled: 0,
        description: '',
      })
    } catch (err) {
      alert('Failed to save class')
    }
  }

  const handleEdit = (classItem: Class) => {
    setEditingClass(classItem)
    setFormData({
      name: classItem.name,
      level: classItem.level,
      teacher: classItem.teacher,
      schedule: classItem.schedule || '',
      capacity: classItem.capacity,
      enrolled: classItem.enrolled,
      description: classItem.description || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this class?')) return

    try {
      const response = await fetch(`/api/classes/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete class')

      setClasses(classes.filter(c => c.id !== id))
    } catch (err) {
      alert('Failed to delete class')
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

  if (showForm) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{editingClass ? 'Edit Class' : 'Add New Class'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Class Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="teacher">Teacher</Label>
                <Input
                  id="teacher"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  placeholder="e.g., Mon/Wed 9:00-10:30"
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="enrolled">Enrolled</Label>
                <Input
                  id="enrolled"
                  type="number"
                  value={formData.enrolled}
                  onChange={(e) => setFormData({ ...formData, enrolled: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => {
                setShowForm(false)
                setEditingClass(null)
              }} className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {editingClass ? 'Update' : 'Create'} Class
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <School className="w-8 h-8" />
            Curriculum Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage classes and curriculum
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <p className="text-2xl font-bold">{classes.length}</p>
              </div>
              <School className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <p className="text-2xl font-bold">{classes.reduce((sum, c) => sum + c.capacity, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Enrolled</p>
                <p className="text-2xl font-bold">{classes.reduce((sum, c) => sum + c.enrolled, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Fill Rate</p>
                <p className="text-2xl font-bold">
                  {classes.length > 0 ? Math.round((classes.reduce((sum, c) => sum + c.enrolled, 0) / classes.reduce((sum, c) => sum + c.capacity, 0)) * 100) : 0}%
                </p>
              </div>
              <School className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(classItem => (
          <Card key={classItem.id} className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{classItem.name}</h3>
                  <Badge variant="secondary">{classItem.level}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(classItem)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(classItem.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Teacher:</span>
                  <span className="font-medium">{classItem.teacher}</span>
                </div>
                {classItem.schedule && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Schedule:</span>
                    <span>{classItem.schedule}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span>{classItem.enrolled}/{classItem.capacity}</span>
                </div>
                {classItem.description && (
                  <p className="text-muted-foreground italic mt-2">{classItem.description}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {classes.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <School className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Classes Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by creating your first class
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Class
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
