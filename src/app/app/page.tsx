'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useTenant } from '@/lib/contexts/TenantContext'
import {
    BookOpen,
    Users,
    Calendar,
    TrendingUp,
    CreditCard,
    UserCheck,
    Clock,
    Star,
    MessageSquare,
    FileText,
    Loader2,
    AlertCircle
} from 'lucide-react'

export default function Dashboard() {
    const router = useRouter()
    const { tenant, isLoading: tenantLoading } = useTenant()
    const [students, setStudents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!tenant) return

        async function fetchData() {
            try {
                setLoading(true)
                const response = await fetch('/api/students')

                if (!response.ok) throw new Error('Failed to fetch data')

                const data = await response.json()
                const tenantStudents = data.filter((s: any) => s.tenantId === tenant.id)
                setStudents(tenantStudents)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [tenant])

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
                    <p className="text-muted-foreground">{error}</p>
                </CardContent>
            </Card>
        )
    }

    const totalStudents = students.length
    const activeStudents = students.filter(s => s.status === 'Active').length
    const avgAttendance = students.length > 0
        ? Math.round(students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length)
        : 0
    const outstandingFees = students.reduce((acc, s) => acc + s.outstandingFees, 0)
    const avgProgress = students.length > 0
        ? Math.round(students.reduce((acc, s) => acc + s.quranProgress, 0) / students.length)
        : 0

    const dashboardStats = [
        {
            title: "Total Students",
            value: totalStudents.toString(),
            change: `${activeStudents} active`,
            trend: "up",
            icon: Users,
            color: "text-blue-600"
        },
        {
            title: "Today's Attendance",
            value: `${avgAttendance}%`,
            change: "+2.1%",
            trend: "up",
            icon: UserCheck,
            color: "text-green-600"
        },
        {
            title: "Avg Quran Progress",
            value: `${avgProgress}/30`,
            change: `${Math.round((avgProgress / 30) * 100)}%`,
            trend: "up",
            icon: TrendingUp,
            color: "text-purple-600"
        },
        {
            title: "Outstanding Fees",
            value: `£${outstandingFees.toLocaleString()}`,
            change: outstandingFees > 0 ? "Pending" : "Clear",
            trend: outstandingFees > 0 ? "down" : "up",
            icon: CreditCard,
            color: "text-orange-600"
        }
    ]

    const recentActivities = [
        {
            id: 1,
            type: "progress",
            student: students[0]?.englishName || "Student",
            action: "Updated Quran progress",
            time: "2 hours ago",
            icon: BookOpen
        },
        {
            id: 2,
            type: "attendance",
            student: students[1]?.englishName || "Student",
            action: "Marked present for class",
            time: "3 hours ago",
            icon: UserCheck
        },
        {
            id: 3,
            type: "communication",
            student: students[2]?.englishName || "Student",
            action: "Parent message sent",
            time: "5 hours ago",
            icon: MessageSquare
        },
    ].filter(a => a.student !== "Student")

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, index) => (
                    <StatCard key={index} stat={stat} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-primary" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Common tasks and shortcuts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button
                            onClick={() => router.push('/app/attendance')}
                            className="w-full justify-start rounded-md hover:scale-[1.02] transition-all"
                        >
                            <UserCheck className="w-4 h-4 mr-2" />
                            Mark Attendance
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/app/progress')}
                            className="w-full justify-start rounded-md hover:scale-[1.02] transition-all"
                        >
                            <BookOpen className="w-4 h-4 mr-2" />
                            Update Progress
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/app/communication')}
                            className="w-full justify-start rounded-md hover:scale-[1.02] transition-all"
                        >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send Message
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/app/reports')}
                            className="w-full justify-start rounded-md hover:scale-[1.02] transition-all"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Report
                        </Button>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="lg:col-span-2 rounded-xl shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Recent Activity
                        </CardTitle>
                        <CardDescription>Latest updates and actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                        {recentActivities.length > 0 ? (
                            recentActivities.map((activity) => (
                                <ActivityItem key={activity.id} activity={activity} />
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground py-8">
                                No recent activity
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Additional Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Today's Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                                <div>
                                    <p className="font-medium">Quran Recitation</p>
                                    <p className="text-sm text-muted-foreground">Grade 3A</p>
                                </div>
                                <Badge variant="secondary">9:00 AM</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                                <div>
                                    <p className="font-medium">Tajweed Class</p>
                                    <p className="text-sm text-muted-foreground">Grade 4B</p>
                                </div>
                                <Badge variant="secondary">11:00 AM</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                                <div>
                                    <p className="font-medium">Islamic Studies</p>
                                    <p className="text-sm text-muted-foreground">Grade 5A</p>
                                </div>
                                <Badge variant="secondary">2:00 PM</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-xl shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Performance Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Class Average Progress</span>
                                    <span>{avgProgress > 0 ? Math.round((avgProgress / 30) * 100) : 0}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: `${avgProgress > 0 ? Math.round((avgProgress / 30) * 100) : 0}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Attendance Rate</span>
                                    <span>{avgAttendance}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${avgAttendance}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Active Students</span>
                                    <span>{totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function StatCard({ stat }: { stat: any }) {
    const Icon = stat.icon
    return (
        <Card className="rounded-xl shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className={`text-sm flex items-center gap-1 mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-orange-600'
                            }`}>
                            <TrendingUp className="w-3 h-3" />
                            {stat.change}
                        </p>
                    </div>
                    <div className={`p-3 rounded-md bg-secondary ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function ActivityItem({ activity }: { activity: any }) {
    const Icon = activity.icon
    return (
        <div className="flex items-start gap-4 p-4 rounded-md hover:bg-muted/50 transition-all">
            <div className="p-2 rounded-md bg-primary/10">
                <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{activity.student}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                </p>
            </div>
        </div>
    )
}
