"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Dumbbell, User, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { href: "/dashboard", icon: Home, labelKey: "nav.home" },
    { href: "/dashboard/workouts", icon: Dumbbell, labelKey: "nav.workouts" },
    { href: "/dashboard/progress", icon: Trophy, labelKey: "nav.progress" },
    { href: "/dashboard/profile", icon: User, labelKey: "nav.profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm">
      <div className="flex items-center justify-around py-2 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 transition-colors min-w-[64px]",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "text-primary")} />
              <span className="text-xs font-medium">{t(item.labelKey)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
