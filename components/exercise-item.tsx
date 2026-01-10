"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink, Activity, Target, GripVertical, Zap } from "lucide-react"
import type { Exercise } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

interface ExerciseItemProps {
  exercise: Exercise
  index: number
  setsCompleted: number
  onSetComplete: (setIndex: number, completed: boolean) => void
  isActive?: boolean
}

const categoryIcons: Record<string, React.ReactNode> = {
  activity: <Activity className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
  "grip-vertical": <GripVertical className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
}

const categoryColors: Record<string, string> = {
  orange: "bg-racing-orange/20 text-racing-orange",
  green: "bg-accent/20 text-accent",
  blue: "bg-chart-4/20 text-chart-4",
  red: "bg-primary/20 text-primary",
}

export function ExerciseItem({ exercise, index, setsCompleted, onSetComplete, isActive = false }: ExerciseItemProps) {
  const { t, language } = useLanguage()
  const categoryColor = exercise.category?.color || "orange"
  const categoryIcon = exercise.category?.icon || "activity"

  const exerciseName = language === "pt" ? exercise.name_pt : exercise.name
  const exerciseDescription = language === "pt" ? exercise.description_pt : exercise.description
  const categoryName = language === "pt" ? exercise.category?.name_pt : exercise.category?.name

  const handleHowTo = () => {
    const searchQuery = encodeURIComponent(`${exercise.name} exercise how to`)
    window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, "_blank")
  }

  return (
    <Card className={cn("transition-all", isActive && "border-primary ring-1 ring-primary/50")}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              categoryColors[categoryColor],
            )}
          >
            {categoryIcons[categoryIcon]}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
              {exercise.category && <span className="text-xs text-muted-foreground">{categoryName}</span>}
            </div>

            <h4 className="font-semibold text-foreground text-balance">{exerciseName}</h4>

            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{exerciseDescription}</p>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                {Array.from({ length: exercise.sets }).map((_, setIndex) => (
                  <div key={setIndex} className="flex items-center gap-1">
                    <Checkbox
                      id={`${exercise.id}-set-${setIndex}`}
                      checked={setIndex < setsCompleted}
                      onCheckedChange={(checked) => onSetComplete(setIndex, checked as boolean)}
                      className="h-6 w-6"
                    />
                    <span className="text-xs text-muted-foreground">{exercise.reps}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleHowTo}
                className="text-muted-foreground hover:text-primary shrink-0"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                {t("workouts.howTo")}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
