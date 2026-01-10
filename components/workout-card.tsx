"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Dumbbell, ChevronRight } from "lucide-react"
import type { Workout } from "@/lib/types"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

interface WorkoutCardProps {
  workout: Workout
  featured?: boolean
}

export function WorkoutCard({ workout, featured = false }: WorkoutCardProps) {
  const { t, language } = useLanguage()

  const difficultyLabels = {
    beginner: t("workouts.beginner"),
    intermediate: t("workouts.intermediate"),
    advanced: t("workouts.advanced"),
  }

  const difficultyColors = {
    beginner: "bg-accent text-accent-foreground",
    intermediate: "bg-racing-orange text-foreground",
    advanced: "bg-primary text-primary-foreground",
  }

  const name = language === "pt" ? workout.name_pt : workout.name
  const description = language === "pt" ? workout.description_pt : workout.description

  return (
    <Link href={`/dashboard/workouts/${workout.id}`}>
      <Card
        className={cn(
          "transition-all hover:border-primary/50 hover:shadow-lg",
          featured && "border-primary/30 bg-card/80",
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={cn("text-xs", difficultyColors[workout.difficulty])}>
                  {difficultyLabels[workout.difficulty]}
                </Badge>
                {featured && (
                  <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                    {t("workouts.recommended")}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-foreground leading-tight text-balance">{name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {workout.estimated_duration} {t("workouts.min")}
                </span>
                <span className="flex items-center gap-1">
                  <Dumbbell className="h-4 w-4" />
                  {workout.exercises?.length || 0} {t("workouts.exercises")}
                </span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
