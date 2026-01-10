"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  color?: "primary" | "accent" | "orange"
}

const colorStyles = {
  primary: "bg-primary/20 text-primary",
  accent: "bg-accent/20 text-accent",
  orange: "bg-racing-orange/20 text-racing-orange",
}

export function StatsCard({ title, value, subtitle, icon: Icon, color = "primary" }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg shrink-0", colorStyles[color])}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
