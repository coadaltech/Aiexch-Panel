"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Menu, Search, Sun, Moon, LogOut, User, X } from "lucide-react"
import { useTheme } from "next-themes"

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void
  sidebarOpen: boolean
  activeSection: string
}

const sectionTitles = {
  dashboard: "Dashboard Overview",
  users: "User Management",
  games: "Game Management",
  tournaments: "Tournament Management",
  analytics: "Analytics & Reports",
  "white-label": "White Label Settings",
  settings: "System Settings",
}

const mockNotifications = [
  {
    id: 1,
    title: "New user registered",
    message: "John Doe just joined the platform",
    time: "2 min ago",
    unread: true,
  },
  { id: 2, title: "Tournament completed", message: "Cricket Championship has ended", time: "1 hour ago", unread: true },
  {
    id: 3,
    title: "System maintenance",
    message: "Scheduled maintenance completed",
    time: "3 hours ago",
    unread: false,
  },
  { id: 4, title: "Payment processed", message: "₹50,000 withdrawal approved", time: "5 hours ago", unread: false },
]

export function AdminHeader({ setSidebarOpen, sidebarOpen, activeSection }: AdminHeaderProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const handleProfileClick = () => {
    router.push("/admin/profile")
  }

  const handleSettingsClick = () => {
    router.push("/admin/settings")
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    sessionStorage.clear()
    router.push("/admin/login")
  }

  return (
    <>
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 relative z-40">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2 hover:bg-accent/10 transition-colors duration-200 m-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <div className="relative w-5 h-5">
              <Menu
                className={`w-5 h-5 absolute transition-all duration-300 ${sidebarOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
              />
              <X
                className={`w-5 h-5 absolute transition-all duration-300 ${sidebarOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
              />
            </div>
          </Button>

          <div className="hidden sm:block">
            <h2 className="text-xl font-semibold text-card-foreground mobile-title" >
              {sectionTitles[activeSection as keyof typeof sectionTitles] || "Admin Panel"}
            </h2>
            <p className="text-sm text-muted-foreground">Manage your gaming platform</p>
          </div>

          <div className="block sm:hidden">
            <h2 className="text-lg font-semibold text-card-foreground truncate max-w-[150px] mobile-title">
              {sectionTitles[activeSection as keyof typeof sectionTitles]?.split(" ")[0] || "Admin"}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="sm:hidden p-2"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          >
            <Search className="w-4 h-4" />
          </Button>

          <div className="hidden sm:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 w-48 lg:w-64" />
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-accent min-w-[20px]">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 sm:w-96" align="end">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                )}
              </div>
              <ScrollArea className="h-80">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No notifications</div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${notification.unread ? "bg-muted/30" : ""
                        }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{notification.title}</p>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-accent rounded-full mt-1 flex-shrink-0 ml-2" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full p-0">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarImage src="/admin-avatar.png" alt="Admin" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@aiexch.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {mobileSearchOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 z-30 bg-card border-b border-border p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 w-full"
              autoFocus
              onBlur={() => setMobileSearchOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}
