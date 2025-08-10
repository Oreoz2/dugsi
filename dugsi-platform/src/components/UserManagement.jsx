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
  Shield, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Lock,
  Unlock,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Key,
  UserCheck,
  UserX
} from 'lucide-react'

// Mock user data
const mockUsers = [
  {
    id: 1,
    username: 'admin',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@alnoor.edu',
    phone: '+44 20 1234 5678',
    role: 'Super Admin',
    status: 'active',
    lastLogin: '2024-08-10T10:30:00Z',
    createdAt: '2024-01-15T09:00:00Z',
    avatar: '',
    permissions: ['all']
  },
  {
    id: 2,
    username: 'teacher1',
    name: 'Fatima Al-Zahra',
    email: 'fatima.alzahra@alnoor.edu',
    phone: '+44 20 1234 5679',
    role: 'Teacher',
    status: 'active',
    lastLogin: '2024-08-10T08:15:00Z',
    createdAt: '2024-02-01T10:00:00Z',
    avatar: '',
    permissions: ['students.read', 'attendance.write', 'progress.write']
  },
  {
    id: 3,
    username: 'finance1',
    name: 'Omar Ibn Khattab',
    email: 'omar.khattab@alnoor.edu',
    phone: '+44 20 1234 5680',
    role: 'Finance Officer',
    status: 'active',
    lastLogin: '2024-08-09T16:45:00Z',
    createdAt: '2024-02-15T11:00:00Z',
    avatar: '',
    permissions: ['finance.read', 'finance.write', 'reports.read']
  },
  {
    id: 4,
    username: 'reception1',
    name: 'Aisha Siddique',
    email: 'aisha.siddique@alnoor.edu',
    phone: '+44 20 1234 5681',
    role: 'Receptionist',
    status: 'inactive',
    lastLogin: '2024-08-05T14:20:00Z',
    createdAt: '2024-03-01T09:30:00Z',
    avatar: '',
    permissions: ['students.read', 'communication.write']
  }
]

const roles = [
  {
    name: 'Super Admin',
    description: 'Full system access and management',
    color: 'bg-red-500',
    permissions: ['all']
  },
  {
    name: 'School Admin',
    description: 'School-wide management and configuration',
    color: 'bg-purple-500',
    permissions: ['users.manage', 'settings.write', 'reports.all']
  },
  {
    name: 'Teacher',
    description: 'Student management and progress tracking',
    color: 'bg-blue-500',
    permissions: ['students.read', 'attendance.write', 'progress.write', 'communication.write']
  },
  {
    name: 'Finance Officer',
    description: 'Financial management and billing',
    color: 'bg-green-500',
    permissions: ['finance.read', 'finance.write', 'reports.finance']
  },
  {
    name: 'Receptionist',
    description: 'Front desk and basic student operations',
    color: 'bg-orange-500',
    permissions: ['students.read', 'communication.write', 'attendance.read']
  }
]

const permissions = [
  { id: 'students.read', name: 'View Students', category: 'Students' },
  { id: 'students.write', name: 'Manage Students', category: 'Students' },
  { id: 'attendance.read', name: 'View Attendance', category: 'Attendance' },
  { id: 'attendance.write', name: 'Mark Attendance', category: 'Attendance' },
  { id: 'progress.read', name: 'View Progress', category: 'Progress' },
  { id: 'progress.write', name: 'Update Progress', category: 'Progress' },
  { id: 'communication.read', name: 'View Messages', category: 'Communication' },
  { id: 'communication.write', name: 'Send Messages', category: 'Communication' },
  { id: 'finance.read', name: 'View Finance', category: 'Finance' },
  { id: 'finance.write', name: 'Manage Finance', category: 'Finance' },
  { id: 'reports.read', name: 'View Reports', category: 'Reports' },
  { id: 'reports.write', name: 'Generate Reports', category: 'Reports' },
  { id: 'settings.read', name: 'View Settings', category: 'Settings' },
  { id: 'settings.write', name: 'Manage Settings', category: 'Settings' },
  { id: 'users.read', name: 'View Users', category: 'Users' },
  { id: 'users.write', name: 'Manage Users', category: 'Users' }
]

function UserCard({ user, onEdit, onDelete, onToggleStatus }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-gray-500'
      case 'locked': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRoleColor = (role) => {
    const roleConfig = roles.find(r => r.name === role)
    return roleConfig?.color || 'bg-gray-500'
  }

  const formatDate = (dateString) => {
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
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{user.name}</h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(user.status)}`} />
            <Badge variant="secondary" className={`${getRoleColor(user.role)} text-white rounded-button`}>
              {user.role}
            </Badge>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last login: {formatDate(user.lastLogin)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {user.status === 'active' ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : user.status === 'locked' ? (
              <XCircle className="w-4 h-4 text-red-500" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-orange-500" />
            )}
            <span className="text-sm capitalize">{user.status}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(user)}
              className="rounded-button"
            >
              <Edit className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleStatus(user)}
              className="rounded-button"
            >
              {user.status === 'active' ? (
                <Lock className="w-4 h-4" />
              ) : (
                <Unlock className="w-4 h-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(user)}
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

function UserForm({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || 'Teacher',
    status: user?.status || 'active',
    permissions: user?.permissions || []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId]
      })
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => p !== permissionId)
      })
    }
  }

  const selectedRole = roles.find(r => r.name === formData.role)
  const rolePermissions = selectedRole?.permissions || []

  return (
    <Card className="rounded-card shadow-modal">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          {user ? 'Edit User' : 'Add New User'}
        </CardTitle>
        <CardDescription>
          {user ? 'Update user information and permissions' : 'Create a new user account'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="rounded-input mt-2"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="rounded-input mt-2"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="rounded-input mt-2"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="rounded-input mt-2"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-input focus-modern"
                required
              >
                {roles.map(role => (
                  <option key={role.name} value={role.name}>
                    {role.name}
                  </option>
                ))}
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
                <option value="locked">Locked</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Permissions</Label>
            <div className="mt-3 space-y-4">
              {Object.entries(
                permissions.reduce((acc, perm) => {
                  if (!acc[perm.category]) acc[perm.category] = []
                  acc[perm.category].push(perm)
                  return acc
                }, {})
              ).map(([category, perms]) => (
                <div key={category}>
                  <h4 className="font-medium text-sm mb-2">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {perms.map(perm => (
                      <div key={perm.id} className="flex items-center space-x-2">
                        <Switch
                          id={perm.id}
                          checked={
                            rolePermissions.includes('all') || 
                            formData.permissions.includes(perm.id)
                          }
                          onCheckedChange={(checked) => handlePermissionChange(perm.id, checked)}
                          disabled={rolePermissions.includes('all')}
                        />
                        <Label htmlFor={perm.id} className="text-sm">
                          {perm.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
              {user ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [activeTab, setActiveTab] = useState('users')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddUser = () => {
    setEditingUser(null)
    setShowForm(true)
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleSaveUser = (userData) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? {...u, ...userData} : u))
    } else {
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userData,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        avatar: ''
      }
      setUsers([...users, newUser])
    }
    setShowForm(false)
    setEditingUser(null)
  }

  const handleDeleteUser = (user) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(users.filter(u => u.id !== user.id))
    }
  }

  const handleToggleStatus = (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    setUsers(users.map(u => u.id === user.id ? {...u, status: newStatus} : u))
  }

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    locked: users.filter(u => u.status === 'locked').length
  }

  if (showForm) {
    return (
      <div className="p-6 animate-fade-in">
        <UserForm
          user={editingUser}
          onSave={handleSaveUser}
          onCancel={() => {
            setShowForm(false)
            setEditingUser(null)
          }}
        />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        
        <Button onClick={handleAddUser} className="rounded-button">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
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
              <UserCheck className="w-8 h-8 text-green-600" />
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
              <UserX className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-card shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Locked</p>
                <p className="text-2xl font-bold text-red-600">{stats.locked}</p>
              </div>
              <Lock className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-modern">
          <TabsTrigger value="users" className="rounded-button">
            <Users className="w-4 h-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="rounded-button">
            <Shield className="w-4 h-4 mr-2" />
            Roles & Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6 mt-6">
          {/* Filters */}
          <Card className="rounded-card shadow-card">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-input"
                    />
                  </div>
                </div>
                
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
                >
                  <option value="all">All Roles</option>
                  {roles.map(role => (
                    <option key={role.name} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-background border border-input rounded-input focus-modern"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="locked">Locked</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Users Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <Card className="rounded-card shadow-card">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="roles" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map(role => (
              <Card key={role.name} className="rounded-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-4 h-4 rounded-full ${role.color}`} />
                    <h3 className="font-semibold">{role.name}</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {role.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Permissions:</h4>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.includes('all') ? (
                        <Badge variant="secondary" className="rounded-button text-xs">
                          All Permissions
                        </Badge>
                      ) : (
                        role.permissions.map(perm => (
                          <Badge key={perm} variant="outline" className="rounded-button text-xs">
                            {permissions.find(p => p.id === perm)?.name || perm}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Users:</span>
                      <span className="font-medium">
                        {users.filter(u => u.role === role.name).length}
                      </span>
                    </div>
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

export default UserManagement

