"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { DashboardOverview } from "@/components/admin/dashboard-overview"
import { UserManagement } from "@/components/admin/user-management"
import { GameManagement } from "@/components/admin/game-management"
import { TournamentManagement } from "@/components/admin/tournament-management"
import { WhiteLabelSettings } from "@/components/admin/white-label-settings"
import { AnalyticsReports } from "@/components/admin/analytics-reports"
import { PromotionsManagement } from "@/components/admin/promotions-management"

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />
      case "users":
        return <UserManagement />
      case "games":
        return <GameManagement />
      case "tournaments":
        return <TournamentManagement />
      case "promotions":
        return <PromotionsManagement />
      case "white-label":
        return <WhiteLabelSettings />
      case "analytics":
        return <AnalyticsReports />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <AdminHeader setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} activeSection={activeSection} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          <div className="max-w-full">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
