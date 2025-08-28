"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Palette,
  Upload,
  Eye,
  Save,
  RotateCcw,
  Globe,
  Mail,
  Shield,
  Settings,
  Gamepad2,
  Monitor,
  Smartphone,
  Tablet,
  Check,
  Sparkles,
} from "lucide-react"

export function WhiteLabelSettings() {
  const [activeTab, setActiveTab] = useState("branding")
  const [previewMode, setPreviewMode] = useState("desktop")

  const predefinedThemes = [
    {
      id: "neon-purple",
      name: "Neon Purple",
      description: "Electric purple with cyan accents",
      primaryColor: "#8b5cf6",
      secondaryColor: "#06b6d4",
      accentColor: "#f59e0b",
      preview: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
    },
    {
      id: "cyber-blue",
      name: "Cyber Blue",
      description: "Futuristic blue with electric highlights",
      primaryColor: "#3b82f6",
      secondaryColor: "#10b981",
      accentColor: "#ef4444",
      preview: "linear-gradient(135deg, #3b82f6, #10b981)",
    },
    {
      id: "gaming-red",
      name: "Gaming Red",
      description: "Bold red with orange energy",
      primaryColor: "#dc2626",
      secondaryColor: "#f97316",
      accentColor: "#eab308",
      preview: "linear-gradient(135deg, #dc2626, #f97316)",
    },
    {
      id: "esports-green",
      name: "Esports Green",
      description: "Professional green with lime accents",
      primaryColor: "#16a34a",
      secondaryColor: "#84cc16",
      accentColor: "#06b6d4",
      preview: "linear-gradient(135deg, #16a34a, #84cc16)",
    },
    {
      id: "midnight-gold",
      name: "Midnight Gold",
      description: "Dark elegance with golden highlights",
      primaryColor: "#1f2937",
      secondaryColor: "#f59e0b",
      accentColor: "#8b5cf6",
      preview: "linear-gradient(135deg, #1f2937, #f59e0b)",
    },
    {
      id: "royal-violet",
      name: "Royal Violet",
      description: "Luxurious violet with pink touches",
      primaryColor: "#7c3aed",
      secondaryColor: "#ec4899",
      accentColor: "#06b6d4",
      preview: "linear-gradient(135deg, #7c3aed, #ec4899)",
    },
  ]

  // Mock current settings
  const [settings, setSettings] = useState({
    // Branding
    platformName: "AIEXCH Gaming",
    tagline: "Your Ultimate Gaming Exchange",
    logo: "/abstract-gaming-logo.png",
    favicon: "/gaming-favicon.png",
    primaryColor: "#4b0082",
    secondaryColor: "#1e90ff",
    accentColor: "#ff4500",
    selectedTheme: "neon-purple", // Added selected theme tracking

    // Domain & URLs
    domain: "gaming.example.com",
    supportUrl: "https://support.example.com",
    termsUrl: "https://example.com/terms",
    privacyUrl: "https://example.com/privacy",

    // Features
    enableTournaments: true,
    enableLeaderboards: true,
    enableChat: true,
    enableReferrals: true,
    enableWallet: true,

    // Contact
    supportEmail: "support@example.com",
    supportPhone: "+1-800-GAMING",
    address: "123 Gaming Street, Tech City, TC 12345",

    // Legal
    companyName: "Gaming Exchange Ltd.",
    licenseNumber: "GL-2024-001",
    regulatoryBody: "Gaming Commission",

    // Appearance
    theme: "dark",
    font: "Inter",
    borderRadius: "medium",
    animations: true,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleThemeSelect = (themeId: string) => {
    const selectedTheme = predefinedThemes.find((theme) => theme.id === themeId)
    if (selectedTheme) {
      setSettings((prev) => ({
        ...prev,
        selectedTheme: themeId,
        primaryColor: selectedTheme.primaryColor,
        secondaryColor: selectedTheme.secondaryColor,
        accentColor: selectedTheme.accentColor,
      }))
    }
  }

  const handleSave = () => {
    // Save settings logic here
    console.log("Saving settings:", settings)
  }

  const handleReset = () => {
    // Reset to defaults logic here
    console.log("Resetting to defaults")
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">White Label Settings</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Customize your platform's branding and appearance
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 sm:space-x-0">
          <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto h-10 sm:h-9 bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 w-full sm:w-auto h-10 sm:h-9">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 xl:grid-cols-3">
        {/* Settings Panel */}
        <div className="xl:col-span-2 order-2 xl:order-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
            <div className="w-full overflow-x-auto">
              <TabsList className="grid w-full grid-cols-6 min-w-[600px] sm:min-w-0">
                <TabsTrigger value="themes" className="text-xs sm:text-sm">
                  Themes
                </TabsTrigger>
                <TabsTrigger value="branding" className="text-xs sm:text-sm">
                  Branding
                </TabsTrigger>
                <TabsTrigger value="domain" className="text-xs sm:text-sm">
                  Domain
                </TabsTrigger>
                <TabsTrigger value="features" className="text-xs sm:text-sm">
                  Features
                </TabsTrigger>
                <TabsTrigger value="contact" className="text-xs sm:text-sm">
                  Contact
                </TabsTrigger>
                <TabsTrigger value="legal" className="text-xs sm:text-sm">
                  Legal
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="themes" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    Predefined Themes
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Choose from professionally designed gaming themes - see instant preview on the right
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {predefinedThemes.map((theme) => (
                      <div
                        key={theme.id}
                        className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                          settings.selectedTheme === theme.id
                            ? "border-primary ring-2 ring-primary/20 shadow-md"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleThemeSelect(theme.id)}
                      >
                        {settings.selectedTheme === theme.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-in zoom-in-50 duration-200">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}

                        <div
                          className="w-full h-16 rounded-md mb-3 transition-all duration-300 hover:h-20"
                          style={{ background: theme.preview }}
                        />

                        <h4 className="font-medium text-sm mb-1">{theme.name}</h4>
                        <p className="text-xs text-muted-foreground mb-3">{theme.description}</p>

                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full border border-border transition-transform hover:scale-125"
                            style={{ backgroundColor: theme.primaryColor }}
                            title="Primary Color"
                          />
                          <div
                            className="w-4 h-4 rounded-full border border-border transition-transform hover:scale-125"
                            style={{ backgroundColor: theme.secondaryColor }}
                            title="Secondary Color"
                          />
                          <div
                            className="w-4 h-4 rounded-full border border-border transition-transform hover:scale-125"
                            style={{ backgroundColor: theme.accentColor }}
                            title="Accent Color"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Want to customize further? Switch to the Branding tab to fine-tune colors and styling.
                    </p>
                    <Button variant="outline" onClick={() => setActiveTab("branding")} className="bg-transparent">
                      <Palette className="w-4 h-4 mr-2" />
                      Customize Colors
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Branding Tab */}
            <TabsContent value="branding" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                    Brand Identity
                  </CardTitle>
                  <CardDescription className="text-sm">Configure your platform's visual identity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                  {settings.selectedTheme && (
                    <div className="bg-muted/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">Current Theme</h4>
                          <p className="text-xs text-muted-foreground">
                            {predefinedThemes.find((t) => t.id === settings.selectedTheme)?.name || "Custom"}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveTab("themes")}
                          className="bg-transparent"
                        >
                          Change Theme
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="platformName" className="text-sm font-medium">
                        Platform Name
                      </Label>
                      <Input
                        id="platformName"
                        value={settings.platformName}
                        onChange={(e) => handleSettingChange("platformName", e.target.value)}
                        className="h-10 sm:h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tagline" className="text-sm font-medium">
                        Tagline
                      </Label>
                      <Input
                        id="tagline"
                        value={settings.tagline}
                        onChange={(e) => handleSettingChange("tagline", e.target.value)}
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Logo & Assets</h4>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Main Logo</Label>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                          <img
                            src={settings.logo || "/placeholder.svg"}
                            alt="Logo"
                            className="h-10 sm:h-12 w-auto bg-muted rounded mx-auto sm:mx-0"
                          />
                          <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground text-center sm:text-left">
                          Recommended: 200x60px, PNG format
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Favicon</Label>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                          <img
                            src={settings.favicon || "/placeholder.svg"}
                            alt="Favicon"
                            className="h-6 w-6 sm:h-8 sm:w-8 bg-muted rounded mx-auto sm:mx-0"
                          />
                          <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground text-center sm:text-left">
                          Recommended: 32x32px, ICO format
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Color Scheme</h4>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor" className="text-sm font-medium">
                          Primary Color
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="primaryColor"
                            type="color"
                            value={settings.primaryColor}
                            onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                            className="w-10 h-10 sm:w-12 sm:h-10 p-1 border rounded flex-shrink-0"
                          />
                          <Input
                            value={settings.primaryColor}
                            onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                            className="flex-1 h-10 sm:h-11"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondaryColor" className="text-sm font-medium">
                          Secondary Color
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="secondaryColor"
                            type="color"
                            value={settings.secondaryColor}
                            onChange={(e) => handleSettingChange("secondaryColor", e.target.value)}
                            className="w-10 h-10 sm:w-12 sm:h-10 p-1 border rounded flex-shrink-0"
                          />
                          <Input
                            value={settings.secondaryColor}
                            onChange={(e) => handleSettingChange("secondaryColor", e.target.value)}
                            className="flex-1 h-10 sm:h-11"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accentColor" className="text-sm font-medium">
                          Accent Color
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="accentColor"
                            type="color"
                            value={settings.accentColor}
                            onChange={(e) => handleSettingChange("accentColor", e.target.value)}
                            className="w-10 h-10 sm:w-12 sm:h-10 p-1 border rounded flex-shrink-0"
                          />
                          <Input
                            value={settings.accentColor}
                            onChange={(e) => handleSettingChange("accentColor", e.target.value)}
                            className="flex-1 h-10 sm:h-11"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-sm sm:text-base">Typography & Style</h4>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Font Family</Label>
                        <Select value={settings.font} onValueChange={(value) => handleSettingChange("font", value)}>
                          <SelectTrigger className="h-10 sm:h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                            <SelectItem value="Poppins">Poppins</SelectItem>
                            <SelectItem value="Montserrat">Montserrat</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Border Radius</Label>
                        <Select
                          value={settings.borderRadius}
                          onValueChange={(value) => handleSettingChange("borderRadius", value)}
                        >
                          <SelectTrigger className="h-10 sm:h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Theme</Label>
                        <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                          <SelectTrigger className="h-10 sm:h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="auto">Auto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">Enable Animations</Label>
                        <div className="text-xs sm:text-sm text-muted-foreground">Smooth transitions and effects</div>
                      </div>
                      <Switch
                        checked={settings.animations}
                        onCheckedChange={(checked) => handleSettingChange("animations", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Domain Tab */}
            <TabsContent value="domain" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                    Domain & URLs
                  </CardTitle>
                  <CardDescription className="text-sm">Configure your platform's web presence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="domain" className="text-sm font-medium">
                        Custom Domain
                      </Label>
                      <Input
                        id="domain"
                        value={settings.domain}
                        onChange={(e) => handleSettingChange("domain", e.target.value)}
                        placeholder="gaming.example.com"
                        className="h-10 sm:h-11"
                      />
                      <p className="text-xs text-muted-foreground">Your platform will be accessible at this domain</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium text-sm sm:text-base">Important Links</h4>
                      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="supportUrl" className="text-sm font-medium">
                            Support URL
                          </Label>
                          <Input
                            id="supportUrl"
                            value={settings.supportUrl}
                            onChange={(e) => handleSettingChange("supportUrl", e.target.value)}
                            className="h-10 sm:h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="termsUrl" className="text-sm font-medium">
                            Terms of Service URL
                          </Label>
                          <Input
                            id="termsUrl"
                            value={settings.termsUrl}
                            onChange={(e) => handleSettingChange("termsUrl", e.target.value)}
                            className="h-10 sm:h-11"
                          />
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                          <Label htmlFor="privacyUrl" className="text-sm font-medium">
                            Privacy Policy URL
                          </Label>
                          <Input
                            id="privacyUrl"
                            value={settings.privacyUrl}
                            onChange={(e) => handleSettingChange("privacyUrl", e.target.value)}
                            className="h-10 sm:h-11"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                    Platform Features
                  </CardTitle>
                  <CardDescription className="text-sm">Enable or disable platform features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                  <div className="space-y-4">
                    {[
                      {
                        key: "enableTournaments",
                        label: "Tournaments",
                        description: "Allow users to create and join tournaments",
                      },
                      {
                        key: "enableLeaderboards",
                        label: "Leaderboards",
                        description: "Display player rankings and statistics",
                      },
                      { key: "enableChat", label: "Live Chat", description: "In-game and platform chat functionality" },
                      {
                        key: "enableReferrals",
                        label: "Referral System",
                        description: "User referral rewards program",
                      },
                      {
                        key: "enableWallet",
                        label: "Digital Wallet",
                        description: "Built-in wallet for deposits and withdrawals",
                      },
                    ].map((feature) => (
                      <div
                        key={feature.key}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0"
                      >
                        <div className="space-y-0.5 flex-1">
                          <Label className="text-sm font-medium">{feature.label}</Label>
                          <div className="text-xs sm:text-sm text-muted-foreground">{feature.description}</div>
                        </div>
                        <Switch
                          checked={settings[feature.key as keyof typeof settings] as boolean}
                          onCheckedChange={(checked) => handleSettingChange(feature.key, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-sm">Configure support and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                  <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="supportEmail" className="text-sm font-medium">
                        Support Email
                      </Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => handleSettingChange("supportEmail", e.target.value)}
                        className="h-10 sm:h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supportPhone" className="text-sm font-medium">
                        Support Phone
                      </Label>
                      <Input
                        id="supportPhone"
                        value={settings.supportPhone}
                        onChange={(e) => handleSettingChange("supportPhone", e.target.value)}
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium">
                      Business Address
                    </Label>
                    <Textarea
                      id="address"
                      value={settings.address}
                      onChange={(e) => handleSettingChange("address", e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Legal Tab */}
            <TabsContent value="legal" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                    Legal & Compliance
                  </CardTitle>
                  <CardDescription className="text-sm">Legal information and regulatory compliance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                  <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium">
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        value={settings.companyName}
                        onChange={(e) => handleSettingChange("companyName", e.target.value)}
                        className="h-10 sm:h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber" className="text-sm font-medium">
                        License Number
                      </Label>
                      <Input
                        id="licenseNumber"
                        value={settings.licenseNumber}
                        onChange={(e) => handleSettingChange("licenseNumber", e.target.value)}
                        className="h-10 sm:h-11"
                      />
                    </div>
                    <div className="space-y-2 lg:col-span-2">
                      <Label htmlFor="regulatoryBody" className="text-sm font-medium">
                        Regulatory Body
                      </Label>
                      <Input
                        id="regulatoryBody"
                        value={settings.regulatoryBody}
                        onChange={(e) => handleSettingChange("regulatoryBody", e.target.value)}
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="xl:col-span-1 order-1 xl:order-2">
          <Card className="xl:sticky xl:top-6">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  Live Preview
                </CardTitle>
                <div className="flex items-center justify-center sm:justify-start space-x-1">
                  <Button
                    variant={previewMode === "desktop" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("desktop")}
                    className="h-8 w-8 p-0"
                  >
                    <Monitor className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    variant={previewMode === "tablet" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("tablet")}
                    className="h-8 w-8 p-0"
                  >
                    <Tablet className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    variant={previewMode === "mobile" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewMode("mobile")}
                    className="h-8 w-8 p-0"
                  >
                    <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-sm">See how your changes will look in real-time</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div
                className={`border rounded-lg overflow-hidden mx-auto transition-all duration-300 ${
                  previewMode === "mobile"
                    ? "max-w-[280px] sm:max-w-[320px]"
                    : previewMode === "tablet"
                      ? "max-w-[400px] sm:max-w-[500px]"
                      : "w-full"
                }`}
              >
                <div
                  className="p-3 sm:p-4 transition-all duration-500 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10 transition-all duration-500"
                    style={{
                      background: `radial-gradient(circle at 20% 50%, ${settings.accentColor} 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${settings.primaryColor} 0%, transparent 50%)`,
                    }}
                  />

                  <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
                    <div
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-500 shadow-lg"
                      style={{
                        backgroundColor: settings.accentColor,
                        boxShadow: `0 4px 12px ${settings.accentColor}40`,
                      }}
                    >
                      <Gamepad2 className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-white text-sm sm:text-base truncate transition-all duration-300 drop-shadow-sm">
                        {settings.platformName}
                      </h3>
                      <p className="text-xs text-white/90 truncate transition-all duration-300">{settings.tagline}</p>
                    </div>
                    <div
                      className="px-2 py-1 rounded-full text-xs font-medium transition-all duration-500"
                      style={{
                        backgroundColor: settings.accentColor + "20",
                        color: "white",
                        border: `1px solid ${settings.accentColor}60`,
                      }}
                    >
                      {predefinedThemes.find((t) => t.id === settings.selectedTheme)?.name || "Custom"}
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 bg-background">
                  <div className="flex items-center space-x-2 mb-3">
                    <div
                      className="w-8 h-1 rounded transition-all duration-500"
                      style={{ backgroundColor: settings.primaryColor }}
                    />
                    <div
                      className="w-6 h-1 rounded transition-all duration-500"
                      style={{ backgroundColor: settings.secondaryColor }}
                    />
                    <div
                      className="w-4 h-1 rounded transition-all duration-500"
                      style={{ backgroundColor: settings.accentColor }}
                    />
                  </div>

                  <div
                    className="h-2 rounded transition-all duration-500 shadow-sm"
                    style={{
                      background: `linear-gradient(90deg, ${settings.primaryColor}60, ${settings.secondaryColor}40)`,
                    }}
                  />
                  <div
                    className="h-2 rounded w-3/4 transition-all duration-500 shadow-sm"
                    style={{
                      background: `linear-gradient(90deg, ${settings.secondaryColor}50, ${settings.accentColor}30)`,
                    }}
                  />
                  <div
                    className="h-2 rounded w-1/2 transition-all duration-500 shadow-sm"
                    style={{
                      background: `linear-gradient(90deg, ${settings.accentColor}40, ${settings.primaryColor}20)`,
                    }}
                  />

                  <div className="mt-3 sm:mt-4 space-y-2">
                    <div
                      className="h-6 sm:h-8 rounded flex items-center justify-center text-white text-xs sm:text-sm font-medium transition-all duration-500 cursor-pointer transform hover:scale-105 shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${settings.accentColor}, ${settings.primaryColor})`,
                        boxShadow: `0 4px 12px ${settings.accentColor}30`,
                      }}
                    >
                      Primary Action
                    </div>

                    <div
                      className="h-5 sm:h-6 rounded flex items-center justify-center text-xs font-medium transition-all duration-500 cursor-pointer border"
                      style={{
                        color: settings.primaryColor,
                        borderColor: settings.primaryColor + "40",
                        backgroundColor: settings.primaryColor + "10",
                      }}
                    >
                      Secondary Action
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div
                      className="p-2 rounded text-center transition-all duration-500"
                      style={{ backgroundColor: settings.primaryColor + "15" }}
                    >
                      <div
                        className="text-xs font-bold transition-all duration-500"
                        style={{ color: settings.primaryColor }}
                      >
                        1,247
                      </div>
                      <div className="text-xs text-muted-foreground">Players</div>
                    </div>
                    <div
                      className="p-2 rounded text-center transition-all duration-500"
                      style={{ backgroundColor: settings.accentColor + "15" }}
                    >
                      <div
                        className="text-xs font-bold transition-all duration-500"
                        style={{ color: settings.accentColor }}
                      >
                        89
                      </div>
                      <div className="text-xs text-muted-foreground">Games</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>Active Theme:</span>
                  <Badge
                    variant="outline"
                    className="text-xs transition-all duration-500 font-medium"
                    style={{
                      borderColor: settings.primaryColor,
                      backgroundColor: settings.primaryColor + "10",
                      color: settings.primaryColor,
                    }}
                  >
                    {predefinedThemes.find((t) => t.id === settings.selectedTheme)?.name || "Custom"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>Color Harmony:</span>
                  <div className="flex items-center space-x-1">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-500 hover:scale-125"
                      style={{ backgroundColor: settings.primaryColor }}
                      title={`Primary: ${settings.primaryColor}`}
                    />
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-500 hover:scale-125"
                      style={{ backgroundColor: settings.secondaryColor }}
                      title={`Secondary: ${settings.secondaryColor}`}
                    />
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-500 hover:scale-125"
                      style={{ backgroundColor: settings.accentColor }}
                      title={`Accent: ${settings.accentColor}`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>Gradient Preview:</span>
                  <div
                    className="h-4 w-20 rounded-full transition-all duration-500 shadow-sm"
                    style={{
                      background: `linear-gradient(90deg, ${settings.primaryColor}, ${settings.secondaryColor}, ${settings.accentColor})`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>Typography:</span>
                  <Badge
                    variant="outline"
                    className="text-xs transition-all duration-300"
                    style={{ borderColor: settings.secondaryColor + "50" }}
                  >
                    {settings.font}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>Features Active:</span>
                  <Badge
                    variant="outline"
                    className="text-xs transition-all duration-300"
                    style={{
                      backgroundColor: settings.accentColor + "10",
                      borderColor: settings.accentColor + "50",
                      color: settings.accentColor,
                    }}
                  >
                    {Object.values(settings).filter((v) => v === true).length} enabled
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
