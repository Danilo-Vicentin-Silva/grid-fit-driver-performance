"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/stats-card"
import { WeeklyProgress } from "@/components/weekly-progress"
import { Flame, Clock, Trophy, Calendar } from "lucide-react"
import type { CompletedWorkout } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"

interface ProgressContentProps {
  completedWorkouts: CompletedWorkout[]
  weeklyGoal: number
}

export function ProgressContent({ completedWorkouts, weeklyGoal }: ProgressContentProps) {
  const { t, language } = useLanguage()

  // Calculate this week's completed days
  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1)
  startOfWeek.setHours(0, 0, 0, 0)

  const thisWeekWorkouts = completedWorkouts.filter((cw) => new Date(cw.completed_at) >= startOfWeek)

  const completedDays = thisWeekWorkouts
    .map((cw) => {
      const date = new Date(cw.completed_at)
      return date.getDay() === 0 ? 6 : date.getDay() - 1
    })
    .filter((v, i, a) => a.indexOf(v) === i)

  // Calculate total time trained
  const totalSeconds = completedWorkouts.reduce((acc, cw) => acc + (cw.duration_seconds || 0), 0)
  const totalMinutes = Math.round(totalSeconds / 60)

  // Format time for display
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6 p-4">
      {/* Weekly Progress */}
      <WeeklyProgress completedDays={completedDays} goal={weeklyGoal} />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard title={t("progress.totalWorkouts")} value={completedWorkouts.length} icon={Trophy} color="primary" />
        <StatsCard
          title={t("progress.totalTime")}
          value={`${totalMinutes}m`}
          subtitle={t("progress.trained")}
          icon={Clock}
          color="accent"
        />
      </div>

      {/* Recent Workouts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            {t("progress.recentActivity")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {completedWorkouts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">{t("progress.noWorkouts")}</p>
          ) : (
            completedWorkouts.slice(0, 10).map((cw) => (
              <div key={cw.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Flame className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {language === "pt" ? cw.workout?.name_pt : cw.workout?.name || "Workout"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(cw.completed_at).toLocaleDateString(language === "pt" ? "pt-BR" : "en-US", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-foreground">
                    {cw.duration_seconds ? formatDuration(cw.duration_seconds) : "--:--"}
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
