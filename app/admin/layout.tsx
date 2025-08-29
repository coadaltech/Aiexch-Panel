// 'use client'
// import type React from "react"
// import type { Metadata } from "next"
// import { AdminHeader } from "@/components/admin/admin-header"
// import { useState } from "react"
// import { AdminSidebar } from "@/components/admin/admin-sidebar"

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   return (
//     <main className="flex min-h-screen ">
//       <AdminSidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />
//       <div className="flex w-full flex-col ">
//         <AdminHeader setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} activeSection="promotions" />
//         <div className="p-5">
//           {children}
//         </div>
//       </div>
//     </main>
//   )
// }



"use client"

import type React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // जिन routes पर sidebar/header hide करना है
  const authRoutes = ["/admin/login", "/admin/signup", "/admin/forget-password"]

  const hideLayout = authRoutes.some(route => pathname.startsWith(route))

  if (hideLayout) {
    return <main className="min-h-screen">{children}</main>
  }

  return (
    <main className="flex min-h-screen">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex w-full flex-col">
        <AdminHeader setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} activeSection="promotions" />
        <div className="p-5">{children}</div>
      </div>
    </main>
  )
}
