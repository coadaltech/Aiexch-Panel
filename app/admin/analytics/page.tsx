"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts"
import {
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    Gamepad2,
    Trophy,
    Download,
    CalendarIcon,
    Eye,
    Clock,
    Target,
    Zap,
} from "lucide-react"

// Mock analytics data
const revenueData = [
    { month: "Jan", revenue: 45000, users: 1200, games: 8500 },
    { month: "Feb", revenue: 52000, users: 1350, games: 9200 },
    { month: "Mar", revenue: 48000, users: 1280, games: 8800 },
    { month: "Apr", revenue: 61000, users: 1520, games: 10500 },
    { month: "May", revenue: 55000, users: 1420, games: 9800 },
    { month: "Jun", revenue: 67000, users: 1680, games: 11200 },
    { month: "Jul", revenue: 72000, users: 1850, games: 12100 },
    { month: "Aug", revenue: 78000, users: 1950, games: 12800 },
]

const gamePerformanceData = [
    { name: "Cyber Strike", players: 2847, revenue: 45000, matches: 1523, rating: 4.8 },
    { name: "Speed Racing", players: 1923, revenue: 32500, matches: 892, rating: 4.6 },
    { name: "Cricket Master", players: 3421, revenue: 67800, matches: 2156, rating: 4.9 },
    { name: "Basketball Arena", players: 567, revenue: 8900, matches: 234, rating: 4.2 },
    { name: "Space Conquest", players: 1456, revenue: 28700, matches: 678, rating: 4.7 },
]

const userEngagementData = [
    { day: "Mon", activeUsers: 1200, newUsers: 45, sessions: 2800 },
    { day: "Tue", activeUsers: 1350, newUsers: 52, sessions: 3100 },
    { day: "Wed", activeUsers: 1180, newUsers: 38, sessions: 2650 },
    { day: "Thu", activeUsers: 1420, newUsers: 61, sessions: 3200 },
    { day: "Fri", activeUsers: 1680, newUsers: 78, sessions: 3800 },
    { day: "Sat", activeUsers: 1950, newUsers: 89, sessions: 4200 },
    { day: "Sun", activeUsers: 1750, newUsers: 67, sessions: 3900 },
]

const deviceData = [
    { name: "Desktop", value: 45, color: "#4b0082", label: "Desktop" },
    { name: "Mobile", value: 35, color: "#1e90ff", label: "Mobile" },
    { name: "Tablet", value: 20, color: "#ff4500", label: "Tablet" },
]

const tournamentData = [
    { name: "Cyber Strike World Championship", participants: 128, prizePool: 100000, status: "live" },
    { name: "Speed Racing Grand Prix", participants: 64, prizePool: 50000, status: "upcoming" },
    { name: "Cricket Masters Cup", participants: 32, prizePool: 25000, status: "completed" },
    { name: "Space Conquest Battle", participants: 16, prizePool: 30000, status: "cancelled" },
]

export default function AnalyticsReports() {
    const [dateRange, setDateRange] = useState("30d")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [activeTab, setActiveTab] = useState("overview")

    const handleExport = (type: string) => {
        console.log(`Exporting ${type} report...`)
    }

    return (
        <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
            {/* Header */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold">Analytics & Reports</h2>
                    <p className="text-sm text-muted-foreground">Comprehensive platform performance insights</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-full sm:w-[140px]">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="90d">Last 90 days</SelectItem>
                            <SelectItem value="1y">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
                <div className="w-full">
                    <div className="overflow-x-auto">
                        <TabsList className="grid w-full grid-cols-5 min-w-[500px] sm:min-w-0 h-auto">
                            <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="revenue" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
                                Revenue
                            </TabsTrigger>
                            <TabsTrigger value="users" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
                                Users
                            </TabsTrigger>
                            <TabsTrigger value="games" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
                                Games
                            </TabsTrigger>
                            <TabsTrigger value="tournaments" className="text-xs sm:text-sm px-2 sm:px-4 py-2">
                                Tournaments
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                    {/* KPI Cards */}
                    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="bg-card border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-accent" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl sm:text-2xl font-bold">₹78,000</div>
                                <p className="text-xs text-muted-foreground">
                                    <TrendingUp className="inline w-3 h-3 mr-1 text-accent" />
                                    <span className="text-accent">+12%</span> from last month
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                                <Users className="h-4 w-4 text-secondary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl sm:text-2xl font-bold">1,950</div>
                                <p className="text-xs text-muted-foreground">
                                    <TrendingUp className="inline w-3 h-3 mr-1 text-secondary" />
                                    <span className="text-secondary">+8%</span> from last week
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Games Played</CardTitle>
                                <Gamepad2 className="h-4 w-4 text-accent" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl sm:text-2xl font-bold">12,800</div>
                                <p className="text-xs text-muted-foreground">
                                    <TrendingUp className="inline w-3 h-3 mr-1 text-accent" />
                                    <span className="text-accent">+15%</span> from last month
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-primary/20">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Tournaments</CardTitle>
                                <Trophy className="h-4 w-4 text-secondary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl sm:text-2xl font-bold">24</div>
                                <p className="text-xs text-muted-foreground">
                                    <TrendingDown className="inline w-3 h-3 mr-1 text-red-400" />
                                    <span className="text-red-400">-2</span> from last month
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts */}
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base sm:text-lg">Revenue Trend</CardTitle>
                                <CardDescription className="text-sm">Monthly revenue over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        revenue: {
                                            label: "Revenue",
                                            color: "hsl(var(--chart-1))",
                                        },
                                    }}
                                    className="h-[250px] sm:h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" fontSize={12} />
                                            <YAxis fontSize={12} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Area
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="hsl(var(--chart-1))"
                                                fill="hsl(var(--chart-1))"
                                                fillOpacity={0.2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base sm:text-lg">User Engagement</CardTitle>
                                <CardDescription className="text-sm">Daily active users and sessions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        activeUsers: {
                                            label: "Active Users",
                                            color: "hsl(var(--chart-2))",
                                        },
                                        sessions: {
                                            label: "Sessions",
                                            color: "hsl(var(--chart-3))",
                                        },
                                    }}
                                    className="h-[250px] sm:h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={userEngagementData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" fontSize={12} />
                                            <YAxis fontSize={12} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Line type="monotone" dataKey="activeUsers" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                            <Line type="monotone" dataKey="sessions" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Device Usage */}
                    {/* <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg">Device Usage</CardTitle>
                <CardDescription className="text-sm">Platform access by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    desktop: {
                      label: "Desktop",
                      color: "hsl(var(--chart-1))",
                    },
                    mobile: {
                      label: "Mobile",
                      color: "hsl(var(--chart-2))",
                    },
                    tablet: {
                      label: "Tablet",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[180px] sm:h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} labelKey="name" />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="flex flex-wrap justify-center mt-4 gap-2 sm:gap-4">
                  {deviceData.map((device) => (
                    <div key={device.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                      <span className="text-xs sm:text-sm">
                        {device.name}: {device.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg">Quick Stats</CardTitle>
                <CardDescription className="text-sm">Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Page Views</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm sm:text-base">45,678</div>
                    <div className="text-xs text-muted-foreground">+12% vs last month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Avg Session Duration</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm sm:text-base">24m 32s</div>
                    <div className="text-xs text-muted-foreground">+8% vs last month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Conversion Rate</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm sm:text-base">3.2%</div>
                    <div className="text-xs text-muted-foreground">+0.5% vs last month</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Bounce Rate</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm sm:text-base">28.5%</div>
                    <div className="text-xs text-muted-foreground">-2.1% vs last month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}
                </TabsContent>

                {/* Revenue Tab */}
                <TabsContent value="revenue" className="space-y-4 sm:space-y-6">
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base sm:text-lg">Revenue by Month</CardTitle>
                                <CardDescription className="text-sm">Monthly revenue breakdown</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        revenue: {
                                            label: "Revenue",
                                            color: "hsl(var(--chart-1))",
                                        },
                                    }}
                                    className="h-[250px] sm:h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" fontSize={12} />
                                            <YAxis fontSize={12} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Bar dataKey="revenue" fill="hsl(var(--chart-1))" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base sm:text-lg">Revenue by Game</CardTitle>
                                <CardDescription className="text-sm">Top performing games by revenue</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 sm:space-y-4">
                                    {gamePerformanceData
                                        .sort((a, b) => b.revenue - a.revenue)
                                        .slice(0, 5)
                                        .map((game, index) => (
                                            <div key={game.name} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                                                        <span className="text-xs font-medium">{index + 1}</span>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="font-medium text-sm sm:text-base truncate">{game.name}</div>
                                                        <div className="text-xs sm:text-sm text-muted-foreground">{game.players} players</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-medium text-accent text-sm sm:text-base">
                                                        ₹{game.revenue.toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">{game.matches} matches</div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Users Tab */}
                <TabsContent value="users" className="space-y-4 sm:space-y-6">
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base sm:text-lg">User Growth</CardTitle>
                                <CardDescription className="text-sm">New users and total active users</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        users: {
                                            label: "Total Users",
                                            color: "hsl(var(--chart-2))",
                                        },
                                        newUsers: {
                                            label: "New Users",
                                            color: "hsl(var(--chart-3))",
                                        },
                                    }}
                                    className="h-[250px] sm:h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={revenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" fontSize={12} />
                                            <YAxis fontSize={12} />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Line type="monotone" dataKey="users" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base sm:text-lg">User Retention</CardTitle>
                                <CardDescription className="text-sm">User retention rates over time</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 sm:space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Day 1 Retention</span>
                                        <span className="font-medium">85%</span>
                                    </div>
                                    <Progress value={85} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Day 7 Retention</span>
                                        <span className="font-medium">62%</span>
                                    </div>
                                    <Progress value={62} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Day 30 Retention</span>
                                        <span className="font-medium">34%</span>
                                    </div>
                                    <Progress value={34} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Day 90 Retention</span>
                                        <span className="font-medium">18%</span>
                                    </div>
                                    <Progress value={18} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Games Tab */}
                <TabsContent value="games" className="space-y-4 sm:space-y-6">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base sm:text-lg">Game Performance</CardTitle>
                            <CardDescription className="text-sm">Detailed game analytics and metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 sm:space-y-4">
                                {gamePerformanceData.map((game) => (
                                    <div key={game.name} className="p-3 sm:p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-medium text-sm sm:text-base">{game.name}</h4>
                                            <div className="flex items-center space-x-1">
                                                <span>⭐</span>
                                                <span className="text-sm">{game.rating}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-sm">
                                            <div>
                                                <div className="text-muted-foreground text-xs sm:text-sm">Players</div>
                                                <div className="font-medium text-sm sm:text-base">{game.players.toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <div className="text-muted-foreground text-xs sm:text-sm">Matches</div>
                                                <div className="font-medium text-sm sm:text-base">{game.matches.toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <div className="text-muted-foreground text-xs sm:text-sm">Revenue</div>
                                                <div className="font-medium text-accent text-sm sm:text-base">
                                                    ₹{game.revenue.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tournaments Tab */}
                <TabsContent value="tournaments" className="space-y-4 sm:space-y-6">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base sm:text-lg">Tournament Analytics</CardTitle>
                            <CardDescription className="text-sm">Tournament performance and participation metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 sm:space-y-4">
                                {tournamentData.map((tournament) => (
                                    <div key={tournament.name} className="p-3 sm:p-4 border rounded-lg">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                                            <h4 className="font-medium text-sm sm:text-base">{tournament.name}</h4>
                                            <Badge
                                                className={
                                                    tournament.status === "live"
                                                        ? "bg-red-500/20 text-red-400 border-red-500/30"
                                                        : tournament.status === "upcoming"
                                                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                                            : tournament.status === "completed"
                                                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                                                : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                                }
                                            >
                                                {tournament.status}
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 sm:gap-4 text-sm">
                                            <div>
                                                <div className="text-muted-foreground text-xs sm:text-sm">Participants</div>
                                                <div className="font-medium text-sm sm:text-base">{tournament.participants}</div>
                                            </div>
                                            <div>
                                                <div className="text-muted-foreground text-xs sm:text-sm">Prize Pool</div>
                                                <div className="font-medium text-accent text-sm sm:text-base">
                                                    ₹{tournament.prizePool.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
