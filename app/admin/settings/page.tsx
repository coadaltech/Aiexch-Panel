"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Settings, Shield, Bell, Database, Server, Save, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"

export default function AdminSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    platformName: "AIEXCH Gaming Exchange",
    platformDescription: "Premier gaming and betting platform",
    supportEmail: "support@aiexch.com",
    maintenanceMode: false,
    registrationEnabled: true,
    maxUsersPerDay: "1000",
  })

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: "8",
    requireSpecialChars: true,
    sessionTimeout: "30",
    twoFactorRequired: false,
    maxLoginAttempts: "5",
    ipWhitelisting: false,
  })

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    systemAlerts: true,
    userRegistrationAlerts: true,
    transactionAlerts: true,
  })

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    timezone: "Asia/Kolkata",
    currency: "INR",
    language: "en",
    backupFrequency: "daily",
    logRetention: "30",
    cacheEnabled: true,
  })

  const handleSave = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeSection="settings" />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <AdminHeader setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} activeSection="settings" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
                <p className="text-muted-foreground mt-2">Configure your gaming platform settings and preferences</p>
              </div>
              <div className="flex items-center gap-3">
                {saved && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Settings Saved
                  </Badge>
                )}
                <Button onClick={handleSave} disabled={loading} className="min-w-[120px]">
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">General</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  <span className="hidden sm:inline">System</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Configuration</CardTitle>
                    <CardDescription>Basic platform settings and information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="platformName">Platform Name</Label>
                        <Input
                          id="platformName"
                          value={generalSettings.platformName}
                          onChange={(e) => setGeneralSettings((prev) => ({ ...prev, platformName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supportEmail">Support Email</Label>
                        <Input
                          id="supportEmail"
                          type="email"
                          value={generalSettings.supportEmail}
                          onChange={(e) => setGeneralSettings((prev) => ({ ...prev, supportEmail: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="platformDescription">Platform Description</Label>
                      <Textarea
                        id="platformDescription"
                        value={generalSettings.platformDescription}
                        onChange={(e) =>
                          setGeneralSettings((prev) => ({ ...prev, platformDescription: e.target.value }))
                        }
                        rows={3}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Platform Controls</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Maintenance Mode</Label>
                            <p className="text-sm text-muted-foreground">Temporarily disable platform access</p>
                          </div>
                          <Switch
                            checked={generalSettings.maintenanceMode}
                            onCheckedChange={(checked) =>
                              setGeneralSettings((prev) => ({ ...prev, maintenanceMode: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>User Registration</Label>
                            <p className="text-sm text-muted-foreground">Allow new user registrations</p>
                          </div>
                          <Switch
                            checked={generalSettings.registrationEnabled}
                            onCheckedChange={(checked) =>
                              setGeneralSettings((prev) => ({ ...prev, registrationEnabled: checked }))
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="maxUsers">Max New Users Per Day</Label>
                          <Input
                            id="maxUsers"
                            type="number"
                            value={generalSettings.maxUsersPerDay}
                            onChange={(e) =>
                              setGeneralSettings((prev) => ({ ...prev, maxUsersPerDay: e.target.value }))
                            }
                            className="max-w-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security Configuration
                    </CardTitle>
                    <CardDescription>Manage security policies and authentication settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="passwordLength">Minimum Password Length</Label>
                        <Select
                          value={securitySettings.passwordMinLength}
                          onValueChange={(value) =>
                            setSecuritySettings((prev) => ({ ...prev, passwordMinLength: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6">6 characters</SelectItem>
                            <SelectItem value="8">8 characters</SelectItem>
                            <SelectItem value="10">10 characters</SelectItem>
                            <SelectItem value="12">12 characters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Select
                          value={securitySettings.sessionTimeout}
                          onValueChange={(value) => setSecuritySettings((prev) => ({ ...prev, sessionTimeout: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maxAttempts">Max Login Attempts</Label>
                        <Select
                          value={securitySettings.maxLoginAttempts}
                          onValueChange={(value) =>
                            setSecuritySettings((prev) => ({ ...prev, maxLoginAttempts: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 attempts</SelectItem>
                            <SelectItem value="5">5 attempts</SelectItem>
                            <SelectItem value="10">10 attempts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Security Features</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Require Special Characters</Label>
                            <p className="text-sm text-muted-foreground">Passwords must contain special characters</p>
                          </div>
                          <Switch
                            checked={securitySettings.requireSpecialChars}
                            onCheckedChange={(checked) =>
                              setSecuritySettings((prev) => ({ ...prev, requireSpecialChars: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                          </div>
                          <Switch
                            checked={securitySettings.twoFactorRequired}
                            onCheckedChange={(checked) =>
                              setSecuritySettings((prev) => ({ ...prev, twoFactorRequired: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>IP Whitelisting</Label>
                            <p className="text-sm text-muted-foreground">
                              Restrict admin access to specific IP addresses
                            </p>
                          </div>
                          <Switch
                            checked={securitySettings.ipWhitelisting}
                            onCheckedChange={(checked) =>
                              setSecuritySettings((prev) => ({ ...prev, ipWhitelisting: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>Configure how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Notification Channels</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={notificationSettings.emailNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings((prev) => ({ ...prev, emailNotifications: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>SMS Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                          </div>
                          <Switch
                            checked={notificationSettings.smsNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings((prev) => ({ ...prev, smsNotifications: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Browser push notifications</p>
                          </div>
                          <Switch
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings((prev) => ({ ...prev, pushNotifications: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Alert Types</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>System Alerts</Label>
                            <p className="text-sm text-muted-foreground">Server issues, maintenance, errors</p>
                          </div>
                          <Switch
                            checked={notificationSettings.systemAlerts}
                            onCheckedChange={(checked) =>
                              setNotificationSettings((prev) => ({ ...prev, systemAlerts: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>User Registration Alerts</Label>
                            <p className="text-sm text-muted-foreground">New user sign-ups and verifications</p>
                          </div>
                          <Switch
                            checked={notificationSettings.userRegistrationAlerts}
                            onCheckedChange={(checked) =>
                              setNotificationSettings((prev) => ({ ...prev, userRegistrationAlerts: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Transaction Alerts</Label>
                            <p className="text-sm text-muted-foreground">Large transactions and withdrawals</p>
                          </div>
                          <Switch
                            checked={notificationSettings.transactionAlerts}
                            onCheckedChange={(checked) =>
                              setNotificationSettings((prev) => ({ ...prev, transactionAlerts: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      System Configuration
                    </CardTitle>
                    <CardDescription>System-wide settings and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={systemSettings.timezone}
                          onValueChange={(value) => setSystemSettings((prev) => ({ ...prev, timezone: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                            <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currency">Default Currency</Label>
                        <Select
                          value={systemSettings.currency}
                          onValueChange={(value) => setSystemSettings((prev) => ({ ...prev, currency: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                            <SelectItem value="USD">US Dollar ($)</SelectItem>
                            <SelectItem value="EUR">Euro (€)</SelectItem>
                            <SelectItem value="GBP">British Pound (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="language">Default Language</Label>
                        <Select
                          value={systemSettings.language}
                          onValueChange={(value) => setSystemSettings((prev) => ({ ...prev, language: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="backupFreq">Backup Frequency</Label>
                        <Select
                          value={systemSettings.backupFrequency}
                          onValueChange={(value) => setSystemSettings((prev) => ({ ...prev, backupFrequency: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="logRetention">Log Retention (days)</Label>
                        <Select
                          value={systemSettings.logRetention}
                          onValueChange={(value) => setSystemSettings((prev) => ({ ...prev, logRetention: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="365">1 year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Performance Settings</h4>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable Caching</Label>
                          <p className="text-sm text-muted-foreground">Improve performance with Redis caching</p>
                        </div>
                        <Switch
                          checked={systemSettings.cacheEnabled}
                          onCheckedChange={(checked) =>
                            setSystemSettings((prev) => ({ ...prev, cacheEnabled: checked }))
                          }
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        Danger Zone
                      </h4>
                      <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-destructive">Reset All Settings</h5>
                            <p className="text-sm text-muted-foreground">
                              This will reset all settings to default values. This action cannot be undone.
                            </p>
                          </div>
                          <Button variant="destructive" size="sm">
                            Reset Settings
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
