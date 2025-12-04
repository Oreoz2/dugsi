import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import ThemeCustomizer from './ThemeCustomizer'
import { 
  Settings, 
  Palette, 
  School, 
  Users, 
  Bell, 
  Shield,
  Globe,
  Calendar,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Save,
  Check,
  AlertCircle,
  Info
} from 'lucide-react'

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    // General Settings
    schoolName: "Al-Noor Islamic Academy",
    schoolAddress: "123 Education Street, London, UK",
    schoolPhone: "+44 20 1234 5678",
    schoolEmail: "info@alnoor-academy.co.uk",
    schoolWebsite: "https://alnoor-academy.co.uk",
    timezone: "Europe/London",
    language: "en",
    
    // Academic Settings
    academicYear: "2024-2025",
    termDates: {
      term1Start: "2024-09-01",
      term1End: "2024-12-20",
      term2Start: "2025-01-06",
      term2End: "2025-04-04",
      term3Start: "2025-04-21",
      term3End: "2025-07-18"
    },
    gradingSystem: "percentage",
    attendanceThreshold: 80,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    parentNotifications: true,
    teacherNotifications: true,
    attendanceAlerts: true,
    progressReminders: true,
    feeReminders: true,
    
    // Privacy Settings
    dataRetention: 7, // years
    parentDataAccess: true,
    teacherDataAccess: "limited",
    auditLogging: true,
    
    // Feature Flags
    enableOnlinePayments: true,
    enableParentPortal: true,
    enableMobileApp: false,
    enableAdvancedReporting: true,
    enableBulkOperations: true
  })

  const [saveStatus, setSaveStatus] = useState(null)

  const handleSettingChange = (category, key, value) => {
    if (category) {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [key]: value
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }))
    }
  }

  const handleSave = async () => {
    setSaveStatus('saving')
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('success')
      setTimeout(() => setSaveStatus(null), 3000)
    }, 1000)
  }

  const handleThemeSave = (theme) => {
    console.log('Saving theme:', theme)
    setSaveStatus('success')
    setTimeout(() => setSaveStatus(null), 3000)
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your madrasah's preferences and customization
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {saveStatus === 'saving' && (
            <Badge variant="secondary" className="rounded-button">
              <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </Badge>
          )}
          {saveStatus === 'success' && (
            <Badge variant="default" className="rounded-button bg-green-500">
              <Check className="w-3 h-3 mr-1" />
              Saved
            </Badge>
          )}
          
          <Button onClick={handleSave} className="rounded-button">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 rounded-modern">
          <TabsTrigger value="general" className="rounded-button">
            <School className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="academic" className="rounded-button">
            <Calendar className="w-4 h-4 mr-2" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-button">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="rounded-button">
            <Shield className="w-4 h-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="features" className="rounded-button">
            <Settings className="w-4 h-4 mr-2" />
            Features
          </TabsTrigger>
          <TabsTrigger value="theme" className="rounded-button">
            <Palette className="w-4 h-4 mr-2" />
            Theme
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="w-5 h-5 text-primary" />
                School Information
              </CardTitle>
              <CardDescription>
                Basic information about your madrasah
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="school-name">School Name</Label>
                  <Input
                    id="school-name"
                    value={settings.schoolName}
                    onChange={(e) => handleSettingChange(null, 'schoolName', e.target.value)}
                    className="rounded-input mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="school-email">Email Address</Label>
                  <Input
                    id="school-email"
                    type="email"
                    value={settings.schoolEmail}
                    onChange={(e) => handleSettingChange(null, 'schoolEmail', e.target.value)}
                    className="rounded-input mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="school-phone">Phone Number</Label>
                  <Input
                    id="school-phone"
                    value={settings.schoolPhone}
                    onChange={(e) => handleSettingChange(null, 'schoolPhone', e.target.value)}
                    className="rounded-input mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="school-website">Website</Label>
                  <Input
                    id="school-website"
                    value={settings.schoolWebsite}
                    onChange={(e) => handleSettingChange(null, 'schoolWebsite', e.target.value)}
                    className="rounded-input mt-2"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="school-address">Address</Label>
                <Textarea
                  id="school-address"
                  value={settings.schoolAddress}
                  onChange={(e) => handleSettingChange(null, 'schoolAddress', e.target.value)}
                  className="rounded-input mt-2"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange(null, 'timezone', e.target.value)}
                    className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-input focus-modern"
                  >
                    <option value="Europe/London">London (GMT)</option>
                    <option value="America/New_York">New York (EST)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                    <option value="Asia/Karachi">Karachi (PKT)</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={settings.language}
                    onChange={(e) => handleSettingChange(null, 'language', e.target.value)}
                    className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-input focus-modern"
                  >
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                    <option value="ur">Urdu</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Academic Configuration
              </CardTitle>
              <CardDescription>
                Configure academic year and grading settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="academic-year">Academic Year</Label>
                  <Input
                    id="academic-year"
                    value={settings.academicYear}
                    onChange={(e) => handleSettingChange(null, 'academicYear', e.target.value)}
                    className="rounded-input mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="grading-system">Grading System</Label>
                  <select
                    id="grading-system"
                    value={settings.gradingSystem}
                    onChange={(e) => handleSettingChange(null, 'gradingSystem', e.target.value)}
                    className="w-full mt-2 px-3 py-2 bg-background border border-input rounded-input focus-modern"
                  >
                    <option value="percentage">Percentage (0-100%)</option>
                    <option value="letter">Letter Grades (A-F)</option>
                    <option value="points">Points (1-10)</option>
                    <option value="custom">Custom Scale</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="attendance-threshold">Minimum Attendance Threshold (%)</Label>
                <Input
                  id="attendance-threshold"
                  type="number"
                  min="0"
                  max="100"
                  value={settings.attendanceThreshold}
                  onChange={(e) => handleSettingChange(null, 'attendanceThreshold', parseInt(e.target.value))}
                  className="rounded-input mt-2"
                />
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Term Dates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="term1-start">Term 1 Start</Label>
                    <Input
                      id="term1-start"
                      type="date"
                      value={settings.termDates.term1Start}
                      onChange={(e) => handleSettingChange('termDates', 'term1Start', e.target.value)}
                      className="rounded-input mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="term1-end">Term 1 End</Label>
                    <Input
                      id="term1-end"
                      type="date"
                      value={settings.termDates.term1End}
                      onChange={(e) => handleSettingChange('termDates', 'term1End', e.target.value)}
                      className="rounded-input mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="term2-start">Term 2 Start</Label>
                    <Input
                      id="term2-start"
                      type="date"
                      value={settings.termDates.term2Start}
                      onChange={(e) => handleSettingChange('termDates', 'term2Start', e.target.value)}
                      className="rounded-input mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="term2-end">Term 2 End</Label>
                    <Input
                      id="term2-end"
                      type="date"
                      value={settings.termDates.term2End}
                      onChange={(e) => handleSettingChange('termDates', 'term2End', e.target.value)}
                      className="rounded-input mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange(null, 'emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange(null, 'smsNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="parent-notifications">Parent Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send updates to parents/guardians</p>
                  </div>
                  <Switch
                    id="parent-notifications"
                    checked={settings.parentNotifications}
                    onCheckedChange={(checked) => handleSettingChange(null, 'parentNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="attendance-alerts">Attendance Alerts</Label>
                    <p className="text-sm text-muted-foreground">Alert when attendance is low</p>
                  </div>
                  <Switch
                    id="attendance-alerts"
                    checked={settings.attendanceAlerts}
                    onCheckedChange={(checked) => handleSettingChange(null, 'attendanceAlerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="progress-reminders">Progress Reminders</Label>
                    <p className="text-sm text-muted-foreground">Remind teachers to update progress</p>
                  </div>
                  <Switch
                    id="progress-reminders"
                    checked={settings.progressReminders}
                    onCheckedChange={(checked) => handleSettingChange(null, 'progressReminders', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="fee-reminders">Fee Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send payment reminders</p>
                  </div>
                  <Switch
                    id="fee-reminders"
                    checked={settings.feeReminders}
                    onCheckedChange={(checked) => handleSettingChange(null, 'feeReminders', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Configure data protection and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="data-retention">Data Retention Period (years)</Label>
                  <Input
                    id="data-retention"
                    type="number"
                    min="1"
                    max="10"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange(null, 'dataRetention', parseInt(e.target.value))}
                    className="rounded-input mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    How long to keep student data after graduation
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-logging">Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all system activities</p>
                  </div>
                  <Switch
                    id="audit-logging"
                    checked={settings.auditLogging}
                    onCheckedChange={(checked) => handleSettingChange(null, 'auditLogging', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="parent-data-access">Parent Data Access</Label>
                    <p className="text-sm text-muted-foreground">Allow parents to view their data</p>
                  </div>
                  <Switch
                    id="parent-data-access"
                    checked={settings.parentDataAccess}
                    onCheckedChange={(checked) => handleSettingChange(null, 'parentDataAccess', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6 mt-6">
          <Card className="rounded-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Feature Configuration
              </CardTitle>
              <CardDescription>
                Enable or disable platform features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="online-payments">Online Payments</Label>
                    <p className="text-sm text-muted-foreground">Accept payments through the platform</p>
                  </div>
                  <Switch
                    id="online-payments"
                    checked={settings.enableOnlinePayments}
                    onCheckedChange={(checked) => handleSettingChange(null, 'enableOnlinePayments', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="parent-portal">Parent Portal</Label>
                    <p className="text-sm text-muted-foreground">Allow parents to access the system</p>
                  </div>
                  <Switch
                    id="parent-portal"
                    checked={settings.enableParentPortal}
                    onCheckedChange={(checked) => handleSettingChange(null, 'enableParentPortal', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mobile-app">Mobile App Access</Label>
                    <p className="text-sm text-muted-foreground">Enable mobile application features</p>
                  </div>
                  <Switch
                    id="mobile-app"
                    checked={settings.enableMobileApp}
                    onCheckedChange={(checked) => handleSettingChange(null, 'enableMobileApp', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="advanced-reporting">Advanced Reporting</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed analytics and reports</p>
                  </div>
                  <Switch
                    id="advanced-reporting"
                    checked={settings.enableAdvancedReporting}
                    onCheckedChange={(checked) => handleSettingChange(null, 'enableAdvancedReporting', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="bulk-operations">Bulk Operations</Label>
                    <p className="text-sm text-muted-foreground">Allow bulk import/export operations</p>
                  </div>
                  <Switch
                    id="bulk-operations"
                    checked={settings.enableBulkOperations}
                    onCheckedChange={(checked) => handleSettingChange(null, 'enableBulkOperations', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="mt-6">
          <ThemeCustomizer onSave={handleThemeSave} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage

