"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExerciseItem } from "@/components/exercise-item"
import { CheckeredFlag } from "@/components/checkered-flag"
import { ArrowLeft, Play, Pause, Timer, Flag } from "lucide-react"
import type { Workout, Exercise } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"
import { useWorkoutPlayer } from "@/hooks/use-workout-player"

interface WorkoutPlayerProps {
  workout: Workout
  exercises: Exercise[]
  userId: string
}

export function WorkoutPlayer({
  workout,
  exercises,
  userId,
}: WorkoutPlayerProps) {
  const router = useRouter()
  const { t, language } = useLanguage()
  const {
    isStarted,
    setIsStarted,
    isPaused,
    setIsPaused,
    elapsedTime,
    formatTime,
    exerciseSets,
    handleSetComplete,
    handleComplete,
    showComplete,
    isSaving,
  } = useWorkoutPlayer({ userId, workoutId: workout.id })

  const workoutName = language === "pt" ? workout.name_pt : workout.name
  const workoutDescription =
    language === "pt" ? workout.description_pt : workout.description

  // Calculate total sets and completed sets
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0)
  const completedSets = Object.values(exerciseSets).reduce(
    (acc, sets) => acc + sets,
    0
  )
  const progress = totalSets > 0 ? (completedSets / totalSets) * 100 : 0

  const handleFlagComplete = () => {
    router.push("/dashboard")
  }

  const isAllComplete = exercises.every(
    (ex) => (exerciseSets[ex.id] || 0) >= ex.sets
  )

  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-foreground truncate">
              {workoutName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {workout.estimated_duration} {t("workouts.min")} •{" "}
              {exercises.length} {t("workouts.exercises")}
            </p>
          </div>
        </div>
      </header>

      {/* Timer & Progress Bar */}
      {isStarted && (
        <div className="sticky top-[73px] z-30 border-b border-border bg-card/95 backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-primary" />
              <span className="text-xl font-mono font-bold text-foreground">
                {formatTime(elapsedTime)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? (
                  <Play className="h-5 w-5" />
                ) : (
                  <Pause className="h-5 w-5" />
                )}
              </Button>
              <span className="text-sm text-muted-foreground">
                {completedSets}/{totalSets} {t("workouts.sets")}
              </span>
            </div>
          </div>
          <div className="h-1 bg-secondary">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 p-4 pb-24 space-y-4">
        {!isStarted ? (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-muted-foreground text-balance">
                  {workoutDescription}
                </p>
              </CardContent>
            </Card>

            <h2 className="text-lg font-semibold text-foreground">
              {t("workouts.exercises")} ({exercises.length})
            </h2>

            {exercises.map((exercise, index) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                index={index}
                setsCompleted={0}
                onSetComplete={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                index={index}
                setsCompleted={exerciseSets[exercise.id] || 0}
                onSetComplete={(setIndex, completed) =>
                  handleSetComplete(exercise.id, setIndex, completed)
                }
                isActive={
                  index ===
                  exercises.findIndex(
                    (ex) => (exerciseSets[ex.id] || 0) < ex.sets
                  )
                }
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm p-4 pb-safe">
        {!isStarted ? (
          <Button
            size="lg"
            className="w-full h-14 text-lg font-semibold"
            onClick={() => setIsStarted(true)}
          >
            <Play className="mr-2 h-5 w-5" />
            {t("player.startWorkout")}
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full h-14 text-lg font-semibold"
            onClick={handleComplete}
            disabled={!isAllComplete || isSaving}
          >
            <Flag className="mr-2 h-5 w-5" />
            {isSaving ? t("player.saving") : t("player.finishWorkout")}
          </Button>
        )}
      </div>

      {/* Checkered Flag Animation */}
      <CheckeredFlag show={showComplete} onComplete={handleFlagComplete} />
    </div>
  )
}
