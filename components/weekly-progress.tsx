"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

interface WeeklyProgressProps {
  completedDays: number[]
  goal: number
}

export function WeeklyProgress({ completedDays, goal }: WeeklyProgressProps) {
  const { t } = useLanguage()
  const completed = completedDays.length
  const progress = Math.min((completed / goal) * 100, 100)

  const dayKeys = ["days.mon", "days.tue", "days.wed", "days.thu", "days.fri", "days.sat", "days.sun"]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center justify-between">
          <span>{t("dashboard.thisWeek")}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completed}/{goal} {t("dashboard.workouts")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress bar */}
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        {/* Day indicators */}
        <div className="flex justify-between">
          {dayKeys.map((dayKey, index) => {
            const isCompleted = completedDays.includes(index)
            const today = new Date().getDay()
            const isToday = index === (today === 0 ? 6 : today - 1)

            return (
              <div key={dayKey} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isToday
                        ? "bg-secondary border-2 border-primary text-foreground"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {isCompleted ? "✓" : t(dayKey).charAt(0)}
                </div>
                <span className="text-xs text-muted-foreground">{t(dayKey)}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
