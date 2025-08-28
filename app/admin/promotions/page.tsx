"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import {
  Upload,
  ImageIcon,
  Gift,
  Megaphone,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  Calendar,
  Target,
} from "lucide-react"

interface PromotionalContent {
  id: string
  title: string
  description: string
  type: "banner" | "bonus" | "announcement"
  status: "active" | "inactive" | "scheduled"
  imageUrl?: string
  startDate?: string
  endDate?: string
  targetAudience: string
  priority: "high" | "medium" | "low"
}

const mockPromotions: PromotionalContent[] = [
  {
    id: "1",
    title: "Welcome Bonus - ₹1,000 Free",
    description: "Get ₹1,000 free credits plus 100% match bonus on your first deposit",
    type: "bonus",
    status: "active",
    imageUrl: "/welcome-bonus-banner.png",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    targetAudience: "new-users",
    priority: "high",
  },
  {
    id: "2",
    title: "Cricket Championship Tournament",
    description: "Join the biggest cricket tournament with ₹10,00,000 prize pool",
    type: "banner",
    status: "active",
    imageUrl: "/cricket-tournament-banner.png",
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    targetAudience: "all-users",
    priority: "high",
  },
  {
    id: "3",
    title: "System Maintenance Notice",
    description: "Scheduled maintenance on Sunday 2 AM - 4 AM IST",
    type: "announcement",
    status: "scheduled",
    startDate: "2024-02-15",
    targetAudience: "all-users",
    priority: "medium",
  },
]

export default function PromotionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [promotions, setPromotions] = useState<PromotionalContent[]>(mockPromotions)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Form state for creating new promotion
  const [newPromotion, setNewPromotion] = useState({
    title: "",
    description: "",
    type: "banner" as const,
    status: "inactive" as const,
    targetAudience: "all-users",
    priority: "medium" as const,
    startDate: "",
    endDate: "",
  })

  const handleSave = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCreatePromotion = () => {
    const promotion: PromotionalContent = {
      id: Date.now().toString(),
      ...newPromotion,
    }
    setPromotions([promotion, ...promotions])
    setNewPromotion({
      title: "",
      description: "",
      type: "banner",
      status: "inactive",
      targetAudience: "all-users",
      priority: "medium",
      startDate: "",
      endDate: "",
    })
    setShowCreateForm(false)
  }

  const handleDeletePromotion = (id: string) => {
    setPromotions(promotions.filter((p) => p.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "banner":
        return <ImageIcon className="w-4 h-4" />
      case "bonus":
        return <Gift className="w-4 h-4" />
      case "announcement":
        return <Megaphone className="w-4 h-4" />
      default:
        return <ImageIcon className="w-4 h-4" />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeSection="promotions"
        setActiveSection={() => {}}
      />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <AdminHeader setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} activeSection="promotions" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Promotional Content</h1>
                <p className="text-muted-foreground mt-2">Manage banners, bonus offers, and announcements</p>
              </div>
              <div className="flex items-center gap-3">
                {saved && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Changes Saved
                  </Badge>
                )}
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Promotion
                </Button>
              </div>
            </div>

            <Tabs defaultValue="manage" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
                <TabsTrigger value="manage" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Manage</span>
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="manage" className="space-y-6">
                {showCreateForm && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Promotion</CardTitle>
                      <CardDescription>Add a new banner, bonus offer, or announcement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newPromotion.title}
                            onChange={(e) => setNewPromotion((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter promotion title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="type">Type</Label>
                          <Select
                            value={newPromotion.type}
                            onValueChange={(value: any) => setNewPromotion((prev) => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="banner">Banner</SelectItem>
                              <SelectItem value="bonus">Bonus Offer</SelectItem>
                              <SelectItem value="announcement">Announcement</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newPromotion.description}
                          onChange={(e) => setNewPromotion((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Enter promotion description"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select
                            value={newPromotion.priority}
                            onValueChange={(value: any) => setNewPromotion((prev) => ({ ...prev, priority: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="audience">Target Audience</Label>
                          <Select
                            value={newPromotion.targetAudience}
                            onValueChange={(value) => setNewPromotion((prev) => ({ ...prev, targetAudience: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all-users">All Users</SelectItem>
                              <SelectItem value="new-users">New Users</SelectItem>
                              <SelectItem value="vip-users">VIP Users</SelectItem>
                              <SelectItem value="inactive-users">Inactive Users</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select
                            value={newPromotion.status}
                            onValueChange={(value: any) => setNewPromotion((prev) => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={newPromotion.startDate}
                            onChange={(e) => setNewPromotion((prev) => ({ ...prev, startDate: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={newPromotion.endDate}
                            onChange={(e) => setNewPromotion((prev) => ({ ...prev, endDate: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreatePromotion}>
                          <Plus className="w-4 h-4 mr-2" />
                          Create Promotion
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid gap-6">
                  {promotions.map((promotion) => (
                    <Card key={promotion.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                              {getTypeIcon(promotion.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">{promotion.title}</h3>
                                <Badge variant="secondary" className={getStatusColor(promotion.status)}>
                                  {promotion.status}
                                </Badge>
                                <Badge variant="outline" className={getPriorityColor(promotion.priority)}>
                                  {promotion.priority}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground mb-3">{promotion.description}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Target className="w-4 h-4" />
                                  {promotion.targetAudience.replace("-", " ")}
                                </div>
                                {promotion.startDate && (
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {promotion.startDate} - {promotion.endDate || "Ongoing"}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeletePromotion(promotion.id)}>
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Add Banner Image
                    </CardTitle>
                    <CardDescription>Upload and configure banner images for your gaming platform</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bannerTitle">Banner Title</Label>
                          <Input id="bannerTitle" placeholder="Enter banner title" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bannerDescription">Banner Description</Label>
                          <Textarea id="bannerDescription" placeholder="Enter banner description" rows={3} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="bannerType">Banner Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hero">Hero Banner</SelectItem>
                                <SelectItem value="promotional">Promotional Banner</SelectItem>
                                <SelectItem value="tournament">Tournament Banner</SelectItem>
                                <SelectItem value="bonus">Bonus Offer Banner</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bannerPosition">Position</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="top">Top of Page</SelectItem>
                                <SelectItem value="middle">Middle Section</SelectItem>
                                <SelectItem value="sidebar">Sidebar</SelectItem>
                                <SelectItem value="footer">Footer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bannerLink">Action Link (Optional)</Label>
                          <Input id="bannerLink" placeholder="https://example.com/action" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Upload Banner Image</h3>
                          <p className="text-muted-foreground mb-4">Recommended: 1920x1080px, PNG/JPG format</p>
                          <Button>
                            <Upload className="w-4 h-4 mr-2" />
                            Choose Banner Image
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label>Preview</Label>
                          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">Banner preview will appear here</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline">Save as Draft</Button>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Banner
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Upload Media Assets
                    </CardTitle>
                    <CardDescription>Upload images and media files for your promotional content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
                      <p className="text-muted-foreground mb-4">Support for PNG, JPG, GIF up to 10MB</p>
                      <Button>
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <h4 className="font-medium">Banner Template 1</h4>
                          <p className="text-sm text-muted-foreground">1920x1080 • 2.3 MB</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <h4 className="font-medium">Bonus Offer Image</h4>
                          <p className="text-sm text-muted-foreground">800x600 • 1.8 MB</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <h4 className="font-medium">Tournament Banner</h4>
                          <p className="text-sm text-muted-foreground">1200x800 • 3.1 MB</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Active Promotions</p>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Impressions</p>
                          <p className="text-2xl font-bold">2.4M</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Click Rate</p>
                          <p className="text-2xl font-bold">8.2%</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                          <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Promotion Performance</CardTitle>
                    <CardDescription>Track the performance of your promotional campaigns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {promotions.slice(0, 3).map((promotion) => (
                        <div key={promotion.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {getTypeIcon(promotion.type)}
                            <div>
                              <h4 className="font-medium">{promotion.title}</h4>
                              <p className="text-sm text-muted-foreground">{promotion.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">12.4K views</p>
                            <p className="text-sm text-muted-foreground">+2.3% CTR</p>
                          </div>
                        </div>
                      ))}
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
