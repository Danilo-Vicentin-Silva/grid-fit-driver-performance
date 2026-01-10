"use client"

import { useState } from "react"
import { WorkoutCard } from "@/components/workout-card"
import { Button } from "@/components/ui/button"
import type { Workout, ExerciseCategory } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

interface WorkoutsContentProps {
  workouts: Workout[]
  categories: ExerciseCategory[]
}

type DifficultyFilter = "all" | "beginner" | "intermediate" | "advanced"

export function WorkoutsContent({ workouts, categories }: WorkoutsContentProps) {
  const { t } = useLanguage()
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all")

  const filteredWorkouts = workouts.filter((workout) => {
    if (difficultyFilter === "all") return true
    return workout.difficulty === difficultyFilter
  })

  const difficulties: { value: DifficultyFilter; label: string }[] = [
    { value: "all", label: t("workouts.allLevels") },
    { value: "beginner", label: t("workouts.beginner") },
    { value: "intermediate", label: t("workouts.intermediate") },
    { value: "advanced", label: t("workouts.advanced") },
  ]

  return (
    <div className="space-y-4 p-4">
      {/* Difficulty Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {difficulties.map((diff) => (
          <Button
            key={diff.value}
            variant={difficultyFilter === diff.value ? "default" : "secondary"}
            size="sm"
            onClick={() => setDifficultyFilter(diff.value)}
            className={cn("shrink-0", difficultyFilter === diff.value && "bg-primary text-primary-foreground")}
          >
            {diff.label}
          </Button>
        ))}
      </div>

      {/* Workouts List */}
      <div className="space-y-3">
        {filteredWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>

      {filteredWorkouts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("workouts.noWorkouts")}</p>
        </div>
      )}
    </div>
  )
}
