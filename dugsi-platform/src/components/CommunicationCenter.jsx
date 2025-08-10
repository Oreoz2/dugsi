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
  MessageSquare,
  Send,
  Phone,
  Mail,
  Bell,
  Users,
  User,
  Calendar,
  Clock,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Paperclip,
  Image,
  FileText,
  Download,
  Upload,
  Star,
  Archive,
  Reply,
  Forward,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Megaphone,
  Volume2,
  VolumeX,
  Settings,
  UserPlus,
  UserMinus,
  Share,
  Copy,
  ExternalLink,
  Bookmark,
  Flag,
  Heart,
  ThumbsUp,
  MessageCircle,
  Zap,
  Target,
  Globe,
  Smartphone,
  AtSign,
  Hash,
  Mic,
  Video,
  Camera,
  MapPin,
  Link,
  Smile,
  Frown,
  Meh
} from 'lucide-react'

// Mock data for messages and conversations
const mockConversations = [
  {
    id: 1,
    type: 'individual',
    participant: {
      name: 'Ustadha Khadija',
      role: 'Teacher',
      avatar: 'UK',
      status: 'online'
    },
    lastMessage: {
      text: 'The students are making excellent progress in Quran memorization this week.',
      timestamp: '2024-08-10T10:30:00Z',
      sender: 'them',
      read: false
    },
    unreadCount: 2,
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Assalamu alaikum! I wanted to update you on the class progress.',
        timestamp: '2024-08-10T10:25:00Z',
        read: true
      },
      {
        id: 2,
        sender: 'them',
        text: 'The students are making excellent progress in Quran memorization this week.',
        timestamp: '2024-08-10T10:30:00Z',
        read: false
      },
      {
        id: 3,
        sender: 'me',
        text: 'Wa alaikum assalam! That\'s wonderful to hear. Any specific achievements?',
        timestamp: '2024-08-10T10:35:00Z',
        read: true
      }
    ]
  },
  {
    id: 2,
    type: 'group',
    participant: {
      name: 'Year 7 Parents',
      role: 'Parent Group',
      avatar: 'Y7',
      memberCount: 24,
      status: 'active'
    },
    lastMessage: {
      text: 'Parent-teacher meeting scheduled for next Friday at 2 PM.',
      timestamp: '2024-08-10T09:15:00Z',
      sender: 'me',
      read: true
    },
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: 'me',
        text: 'Assalamu alaikum parents! Hope everyone is doing well.',
        timestamp: '2024-08-10T09:00:00Z',
        read: true
      },
      {
        id: 2,
        sender: 'me',
        text: 'Parent-teacher meeting scheduled for next Friday at 2 PM.',
        timestamp: '2024-08-10T09:15:00Z',
        read: true
      }
    ]
  },
  {
    id: 3,
    type: 'individual',
    participant: {
      name: 'Ahmad Hassan (Parent)',
      role: 'Parent',
      avatar: 'AH',
      status: 'offline'
    },
    lastMessage: {
      text: 'Thank you for the progress report. Very helpful!',
      timestamp: '2024-08-09T16:45:00Z',
      sender: 'them',
      read: true
    },
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: 'me',
        text: 'Here is your child\'s progress report for this month.',
        timestamp: '2024-08-09T16:30:00Z',
        read: true
      },
      {
        id: 2,
        sender: 'them',
        text: 'Thank you for the progress report. Very helpful!',
        timestamp: '2024-08-09T16:45:00Z',
        read: true
      }
    ]
  }
]

// Mock announcements data
const mockAnnouncements = [
  {
    id: 1,
    title: 'Ramadan Schedule Changes',
    content: 'During the holy month of Ramadan, our class timings will be adjusted. Morning classes will start at 9 AM instead of 8 AM. Please ensure students arrive on time.',
    author: 'Admin Team',
    timestamp: '2024-08-10T08:00:00Z',
    priority: 'high',
    category: 'Schedule',
    recipients: 'All Students & Parents',
    readCount: 156,
    totalRecipients: 200,
    status: 'published',
    attachments: []
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting - Year 7',
    content: 'We are pleased to invite all Year 7 parents for our monthly parent-teacher meeting. This is an excellent opportunity to discuss your child\'s progress and address any concerns.',
    author: 'Ustadha Fatima',
    timestamp: '2024-08-09T14:30:00Z',
    priority: 'medium',
    category: 'Meeting',
    recipients: 'Year 7 Parents',
    readCount: 18,
    totalRecipients: 24,
    status: 'published',
    attachments: [
      { name: 'Meeting_Agenda.pdf', size: '245 KB', type: 'pdf' }
    ]
  },
  {
    id: 3,
    title: 'New Islamic Library Books Available',
    content: 'We have added 50 new books to our Islamic library, including children\'s stories, Hadith collections, and Islamic history books. Students can borrow these books starting Monday.',
    author: 'Librarian',
    timestamp: '2024-08-08T11:20:00Z',
    priority: 'low',
    category: 'Library',
    recipients: 'All Students',
    readCount: 89,
    totalRecipients: 150,
    status: 'published',
    attachments: [
      { name: 'New_Books_List.pdf', size: '180 KB', type: 'pdf' },
      { name: 'Library_Rules.pdf', size: '95 KB', type: 'pdf' }
    ]
  }
]

// Mock notification data
const mockNotifications = [
  {
    id: 1,
    type: 'message',
    title: 'New message from Ustadha Khadija',
    content: 'The students are making excellent progress...',
    timestamp: '2024-08-10T10:30:00Z',
    read: false,
    priority: 'normal',
    actionUrl: '/communication?tab=messages&conversation=1'
  },
  {
    id: 2,
    type: 'announcement',
    title: 'New announcement: Ramadan Schedule Changes',
    content: 'During the holy month of Ramadan, our class timings...',
    timestamp: '2024-08-10T08:00:00Z',
    read: false,
    priority: 'high',
    actionUrl: '/communication?tab=announcements&id=1'
  },
  {
    id: 3,
    type: 'attendance',
    title: 'Attendance reminder',
    content: 'Please mark attendance for today\'s classes',
    timestamp: '2024-08-10T07:00:00Z',
    read: true,
    priority: 'normal',
    actionUrl: '/attendance'
  },
  {
    id: 4,
    type: 'payment',
    title: 'Fee payment received',
    content: 'Payment of $150 received from Ahmad Hassan',
    timestamp: '2024-08-09T15:30:00Z',
    read: true,
    priority: 'normal',
    actionUrl: '/finance?tab=payments'
  }
]

function ConversationList({ conversations, selectedConversation, onSelectConversation }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="w-80 border-r border-border bg-background">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <Button size="sm" className="rounded-button">
            <Plus className="w-4 h-4 mr-2" />
            New
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-input"
          />
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-200px)]">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
              selectedConversation?.id === conversation.id ? 'bg-muted' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {conversation.participant.avatar}
                  </AvatarFallback>
                </Avatar>
                {conversation.participant.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium truncate">{conversation.participant.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate flex-1">
                    {conversation.lastMessage.text}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <Badge className="ml-2 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs rounded-button">
                    {conversation.participant.role}
                  </Badge>
                  {conversation.type === 'group' && (
                    <Badge variant="outline" className="text-xs rounded-button">
                      <Users className="w-3 h-3 mr-1" />
                      {conversation.participant.memberCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MessageArea({ conversation, onSendMessage }) {
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage)
      setNewMessage('')
    }
  }

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
          <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {conversation.participant.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{conversation.participant.name}</h3>
              <p className="text-sm text-muted-foreground">
                {conversation.participant.status === 'online' ? 'Online' : 'Offline'} • {conversation.participant.role}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-button">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-button">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-button">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-card ${
                message.sender === 'me'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                {formatMessageTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-end gap-3">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-button">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-button">
              <Image className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="min-h-[40px] max-h-32 rounded-input resize-none"
              rows={1}
            />
          </div>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="rounded-button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function AnnouncementCard({ announcement, onView, onEdit, onDelete }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-orange-600 bg-orange-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-blue-600 bg-blue-100'
    }
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const readPercentage = Math.round((announcement.readCount / announcement.totalRecipients) * 100)

  return (
    <Card className="rounded-card shadow-card hover-lift transition-modern">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{announcement.title}</h3>
              <Badge className={`rounded-button text-xs ${getPriorityColor(announcement.priority)}`}>
                {announcement.priority}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
              {announcement.content}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By {announcement.author}</span>
              <span>{formatDate(announcement.timestamp)}</span>
              <Badge variant="outline" className="rounded-button text-xs">
                {announcement.category}
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2 ml-4">
            <Button variant="outline" size="sm" onClick={() => onView(announcement)} className="rounded-button">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onEdit(announcement)} className="rounded-button">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(announcement)} className="rounded-button">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Recipients:</span>
            <span className="font-medium">{announcement.recipients}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Read Status:</span>
              <span className="font-medium">{announcement.readCount}/{announcement.totalRecipients} ({readPercentage}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${readPercentage}%` }}
              ></div>
            </div>
          </div>

          {announcement.attachments.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Attachments:</p>
              <div className="flex flex-wrap gap-2">
                {announcement.attachments.map((attachment, index) => (
                  <Badge key={index} variant="outline" className="rounded-button text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    {attachment.name} ({attachment.size})
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function NotificationItem({ notification, onMarkAsRead, onAction }) {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message': return <MessageSquare className="w-5 h-5" />
      case 'announcement': return <Megaphone className="w-5 h-5" />
      case 'attendance': return <Users className="w-5 h-5" />
      case 'payment': return <CheckCircle className="w-5 h-5" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-red-600 bg-red-100'
    
    switch (type) {
      case 'message': return 'text-blue-600 bg-blue-100'
      case 'announcement': return 'text-purple-600 bg-purple-100'
      case 'attendance': return 'text-orange-600 bg-orange-100'
      case 'payment': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = (now - date) / (1000 * 60)
    
    if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    }
  }

  return (
    <div className={`p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer ${
      !notification.read ? 'bg-muted/30' : ''
    }`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${getNotificationColor(notification.type, notification.priority)}`}>
          {getNotificationIcon(notification.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-sm">{notification.title}</h4>
            <span className="text-xs text-muted-foreground">{formatTime(notification.timestamp)}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {notification.content}
          </p>
          
          <div className="flex items-center gap-2">
            {!notification.read && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onMarkAsRead(notification.id)}
                className="rounded-button text-xs"
              >
                Mark as read
              </Button>
            )}
            
            {notification.actionUrl && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onAction(notification.actionUrl)}
                className="rounded-button text-xs"
              >
                View
              </Button>
            )}
          </div>
        </div>
        
        {!notification.read && (
          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
        )}
      </div>
    </div>
  )
}

export function CommunicationCenter() {
  const [activeTab, setActiveTab] = useState('messages')
  const [conversations] = useState(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [announcements] = useState(mockAnnouncements)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSendMessage = (message) => {
    // In a real app, this would send the message to the backend
    console.log('Sending message:', message)
  }

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const handleNotificationAction = (actionUrl) => {
    // In a real app, this would navigate to the specified URL
    console.log('Navigate to:', actionUrl)
  }

  const handleViewAnnouncement = (announcement) => {
    console.log('View announcement:', announcement)
  }

  const handleEditAnnouncement = (announcement) => {
    console.log('Edit announcement:', announcement)
  }

  const handleDeleteAnnouncement = (announcement) => {
    console.log('Delete announcement:', announcement)
  }

  const unreadNotifications = notifications.filter(n => !n.read).length
  const totalMessages = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)

  return (
    <div className="h-screen flex flex-col animate-fade-in">
      <div className="p-6 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Communication Center</h1>
            <p className="text-muted-foreground mt-1">
              Manage messages, announcements, and notifications
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-button">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button className="rounded-button">
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread Messages</p>
                  <p className="text-2xl font-bold text-blue-600">{totalMessages}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Announcements</p>
                  <p className="text-2xl font-bold text-purple-600">{announcements.length}</p>
                </div>
                <Megaphone className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Notifications</p>
                  <p className="text-2xl font-bold text-orange-600">{unreadNotifications}</p>
                </div>
                <Bell className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Online Users</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-6 mt-4 rounded-modern w-fit">
          <TabsTrigger value="messages" className="rounded-button">
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
            {totalMessages > 0 && (
              <Badge className="ml-2 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {totalMessages}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="announcements" className="rounded-button">
            <Megaphone className="w-4 h-4 mr-2" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-button">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
            {unreadNotifications > 0 && (
              <Badge className="ml-2 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {unreadNotifications}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="flex-1 flex mt-4">
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
          />
          <MessageArea
            conversation={selectedConversation}
            onSendMessage={handleSendMessage}
          />
        </TabsContent>

        <TabsContent value="announcements" className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {announcements.map(announcement => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onView={handleViewAnnouncement}
                onEdit={handleEditAnnouncement}
                onDelete={handleDeleteAnnouncement}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            {notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onAction={handleNotificationAction}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CommunicationCenter

