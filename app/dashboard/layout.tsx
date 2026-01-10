import type React from "react"
import { BottomNav } from "@/components/ui/bottom-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <main className="flex-1 pb-20">{children}</main>
      <BottomNav />
    </div>
  )
}
