"use client"

import { WorkoutCard } from "@/components/workout-card"
import { WeeklyProgress } from "@/components/weekly-progress"
import { StatsCard } from "@/components/stats-card"
import { Flame, Target, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Workout } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { useDashboard } from "@/hooks/use-dashboard"

interface DashboardContentProps {
  workouts: Workout[]
  completedDays: number[]
  weeklyGoal: number
  totalCompleted: number
}

export function DashboardContent({
  workouts,
  completedDays,
  weeklyGoal,
  totalCompleted,
}: DashboardContentProps) {
  const { t, language } = useLanguage()

  // Extracted dashboard logic to a hook to keep this component focused on UI
  const { todayIndex, todayPlan, recommendedWorkout } = useDashboard({
    workouts,
    completedDays,
    weeklyGoal,
    totalCompleted,
  })

  return (
    <div className="space-y-6 p-4">
      {/* Weekly Progress */}
      <WeeklyProgress completedDays={completedDays} goal={weeklyGoal} />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title={t("dashboard.thisWeek")}
          value={totalCompleted}
          subtitle={t("dashboard.workouts")}
          icon={Flame}
          color="primary"
        />
        <StatsCard
          title={t("dashboard.weeklyGoal")}
          value={weeklyGoal}
          subtitle={t("dashboard.workouts")}
          icon={Target}
          color="accent"
        />
      </div>

      {/* Today's Plan Card */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {t("dashboard.todayWorkout")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">
                {todayPlan}
              </p>
              <p className="text-sm text-muted-foreground">
                {t("dashboard.dailyPlan")}
              </p>
            </div>
            {todayIndex !== 6 && (
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {language === "pt" ? "Hoje" : "Today"}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Workout */}
      {recommendedWorkout && todayIndex !== 6 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">
            {t("dashboard.nextRecommended")}
          </h2>
          <WorkoutCard workout={recommendedWorkout} featured />
        </section>
      )}

      {/* Quick Start */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          {t("dashboard.quickStart")}
        </h2>
        <div className="space-y-3">
          {workouts.slice(0, 3).map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </div>
  )
}
