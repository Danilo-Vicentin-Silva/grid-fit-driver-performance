"use client"

import { useState, useEffect, useCallback } from "react"
import { saveCompletedWorkout } from "@/lib/services/workoutService"

export function useWorkoutPlayer({
  userId,
  workoutId,
}: {
  userId: string
  workoutId: string
}) {
  const [isStarted, setIsStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [exerciseSets, setExerciseSets] = useState<Record<string, number>>({})
  const [showComplete, setShowComplete] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isStarted && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isStarted, isPaused])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }, [])

  const handleSetComplete = useCallback(
    (exerciseId: string, setIndex: number, completed: boolean) => {
      setExerciseSets((prev) => {
        const currentSets = prev[exerciseId] || 0
        if (completed) {
          return { ...prev, [exerciseId]: Math.max(currentSets, setIndex + 1) }
        } else {
          return { ...prev, [exerciseId]: Math.min(currentSets, setIndex) }
        }
      })
    },
    []
  )

  const handleComplete = useCallback(async () => {
    if (isSaving) return
    setIsSaving(true)
    try {
      await saveCompletedWorkout(userId, workoutId, elapsedTime, exerciseSets)
      setShowComplete(true)
    } catch (error) {
      console.error("Error saving workout:", error)
    } finally {
      setIsSaving(false)
    }
  }, [exerciseSets, elapsedTime, isSaving, userId, workoutId])

  const reset = useCallback(() => {
    setIsStarted(false)
    setIsPaused(false)
    setElapsedTime(0)
    setExerciseSets({})
    setShowComplete(false)
    setIsSaving(false)
  }, [])

  return {
    isStarted,
    setIsStarted,
    isPaused,
    setIsPaused,
    elapsedTime,
    formatTime,
    exerciseSets,
    setExerciseSets,
    handleSetComplete,
    handleComplete,
    showComplete,
    isSaving,
    reset,
  }
}
