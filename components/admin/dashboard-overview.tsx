"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Gamepad2, Trophy, DollarSign, TrendingUp, Activity, Clock, AlertTriangle } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20 bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Games</CardTitle>
            <Gamepad2 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-secondary">+8</span> new this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tournaments</CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">3</span> ending today
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2.5Cr</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+18%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activities and events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { user: "ProGamer_X1", action: "Won Cyber Strike Championship", time: "2 min ago", type: "win" },
              { user: "SpeedRacer99", action: "Joined Speed Racing League", time: "5 min ago", type: "join" },
              { user: "Admin", action: "Updated tournament rules", time: "10 min ago", type: "admin" },
              { user: "CricketKing", action: "Placed bet on India vs Australia", time: "15 min ago", type: "bet" },
              { user: "BasketBaller", action: "Created new tournament", time: "20 min ago", type: "create" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "win"
                        ? "bg-accent"
                        : activity.type === "join"
                          ? "bg-secondary"
                          : activity.type === "admin"
                            ? "bg-primary"
                            : activity.type === "bet"
                              ? "bg-chart-4"
                              : "bg-chart-5"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              System Status
            </CardTitle>
            <CardDescription>Platform health and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Server Load</span>
                <span className="text-accent">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database</span>
                <span className="text-secondary">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Response</span>
                <span className="text-accent">45ms</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Sessions</span>
                <Badge variant="secondary">1,247</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Queue Length</span>
                <Badge variant="outline">23</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-accent" />
                  Alerts
                </span>
                <Badge variant="destructive">2</Badge>
              </div>
            </div>

            <Button className="w-full mt-4 bg-transparent" variant="outline">
              View Detailed Metrics
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <Users className="w-6 h-6" />
              <span>Add User</span>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <Trophy className="w-6 h-6" />
              <span>Create Tournament</span>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <Gamepad2 className="w-6 h-6" />
              <span>Add Game</span>
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <AlertTriangle className="w-6 h-6" />
              <span>System Alert</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
