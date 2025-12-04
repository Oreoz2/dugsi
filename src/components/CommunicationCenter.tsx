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
  MessageSquare,
  Send,
  Plus,
  Edit,
  Trash2,
  Loader2,
  RefreshCw,
  AlertCircle,
  Bell,
  X,
  Save
} from 'lucide-react'

type Announcement = {
  id: string
  title: string
  content: string
  priority: string
  author?: string
  createdAt: string
  updatedAt: string
}

export function CommunicationCenter() {
  const { tenant, isLoading: tenantLoading } = useTenant()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'normal',
  })

  useEffect(() => {
    if (!tenant) return

    async function fetchAnnouncements() {
      try {
        setLoading(true)
        const response = await fetch('/api/announcements')

        if (!response.ok) throw new Error('Failed to fetch announcements')

        const data = await response.json()
        setAnnouncements(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [tenant])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingAnnouncement ? `/api/announcements/${editingAnnouncement.id}` : '/api/announcements'
      const method = editingAnnouncement ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tenantId: tenant?.id,
        }),
      })

      if (!response.ok) throw new Error('Failed to save announcement')

      const savedAnnouncement = await response.json()

      if (editingAnnouncement) {
        setAnnouncements(announcements.map(a => a.id === savedAnnouncement.id ? savedAnnouncement : a))
      } else {
        setAnnouncements([savedAnnouncement, ...announcements])
      }

      setShowForm(false)
      setEditingAnnouncement(null)
      setFormData({
        title: '',
        content: '',
        priority: 'normal',
      })
    } catch (err) {
      alert('Failed to save announcement')
    }
  }

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement(announcement)
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return

    try {
      const response = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete announcement')

      setAnnouncements(announcements.filter(a => a.id !== id))
    } catch (err) {
      alert('Failed to delete announcement')
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
          <CardTitle>{editingAnnouncement ? 'Edit Announcement' : 'New Announcement'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                required
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => {
                setShowForm(false)
                setEditingAnnouncement(null)
              }} className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {editingAnnouncement ? 'Update' : 'Publish'} Announcement
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  const urgentCount = announcements.filter(a => a.priority === 'urgent').length
  const highCount = announcements.filter(a => a.priority === 'high').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <MessageSquare className="w-8 h-8" />
            Communication Center
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage announcements and communications
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Announcements</p>
                <p className="text-2xl font-bold">{announcements.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
              </div>
              <Bell className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-orange-600">{highCount}</p>
              </div>
              <Bell className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">
                  {announcements.filter(a => {
                    const weekAgo = new Date()
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    return new Date(a.createdAt) > weekAgo
                  }).length}
                </p>
              </div>
              <Send className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {announcements.map(announcement => (
          <Card key={announcement.id} className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{announcement.title}</h3>
                    <Badge className={
                      announcement.priority === 'urgent' ? 'bg-red-500' :
                        announcement.priority === 'high' ? 'bg-orange-500' :
                          announcement.priority === 'low' ? 'bg-gray-500' :
                            'bg-blue-500'
                    }>
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground whitespace-pre-wrap">{announcement.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    {announcement.author && <span>By: {announcement.author}</span>}
                    <span>Posted: {new Date(announcement.createdAt).toLocaleDateString()}</span>
                    {announcement.updatedAt !== announcement.createdAt && (
                      <span>Updated: {new Date(announcement.updatedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(announcement)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(announcement.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {announcements.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Announcements Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start communicating with your community
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Announcement
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
