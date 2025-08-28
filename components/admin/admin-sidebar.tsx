"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Users, Gamepad2, Trophy, Palette, BarChart3, Settings, X, Upload } from "lucide-react"

interface AdminSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard},
  { id: "users", name: "User Management", icon: Users },
  { id: "games", name: "Game Management", icon: Gamepad2 },
  { id: "tournaments", name: "Tournaments", icon: Trophy },
  { id: "promotions", name: "Promotions", icon: Upload },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "white-label", name: "White Label", icon: Palette },
  { id: "settings", name: "Settings", icon: Settings },
]

export function AdminSidebar({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  return (
    <>
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-30">
        <div className="flex flex-col flex-grow bg-sidebar border-r border-sidebar-border">
          <div className="flex items-center h-16 px-6 bg-gaming-gradient">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-sidebar-primary-foreground">AIEXCH</h1>
                <p className="text-xs text-sidebar-primary-foreground/80">Admin Panel</p>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 px-4 py-6">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start h-11 px-4 transition-all duration-200",
                      activeSection === item.id
                        ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Button>
                )
              })}
            </nav>
          </ScrollArea>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-all duration-300 ease-in-out lg:hidden",
          "shadow-2xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gaming-gradient">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-primary-foreground">AIEXCH</h1>
              <p className="text-xs text-sidebar-primary-foreground/80">Admin Panel</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="text-sidebar-primary-foreground hover:bg-sidebar-primary-foreground/10 transition-colors duration-200 p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-12 px-4 transition-all duration-200 text-left",
                    activeSection === item.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={() => {
                    setActiveSection(item.id)
                    setSidebarOpen(false)
                  }}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Button>
              )
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-sidebar-accent/10">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Admin User</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">admin@aiexch.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
