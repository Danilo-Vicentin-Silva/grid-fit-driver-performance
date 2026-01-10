"use client"

import { useMemo } from "react"
import type { Workout } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"

interface UseDashboardProps {
  workouts: Workout[]
  completedDays: number[]
  weeklyGoal: number
  totalCompleted: number
}

const dailyWorkoutPlanPT: Record<number, string> = {
  0: "Segunda - Pescoço & Core",
  1: "Terça - Grip & Antebraço",
  2: "Quarta - Cardio HIIT",
  3: "Quinta - Core & Estabilidade",
  4: "Sexta - Treino Completo",
  5: "Sábado - Recuperação Ativa",
  6: "Domingo - Descanso",
}

const dailyWorkoutPlanEN: Record<number, string> = {
  0: "Monday - Neck & Core",
  1: "Tuesday - Grip & Forearm",
  2: "Wednesday - HIIT Cardio",
  3: "Thursday - Core & Stability",
  4: "Friday - Full Workout",
  5: "Saturday - Active Recovery",
  6: "Sunday - Rest Day",
}

export function useDashboard({
  workouts,
  completedDays,
  weeklyGoal,
  totalCompleted,
}: UseDashboardProps) {
  const { language } = useLanguage()

  const todayIndex = useMemo(() => {
    const today = new Date().getDay()
    return today === 0 ? 6 : today - 1
  }, [])

  const todayPlan = useMemo(
    () =>
      language === "pt"
        ? dailyWorkoutPlanPT[todayIndex]
        : dailyWorkoutPlanEN[todayIndex],
    [language, todayIndex]
  )

  const recommendedWorkout = useMemo(() => {
    const dayToWorkoutType: Record<number, string> = {
      0: "neck",
      1: "grip",
      2: "cardio",
      3: "core",
      4: "complete",
      5: "cardio",
      6: "",
    }

    const workoutType = dayToWorkoutType[todayIndex]
    if (!workoutType) return workouts[0]

    const found = workouts.find(
      (w) =>
        w.name.toLowerCase().includes(workoutType) ||
        w.name_pt.toLowerCase().includes(workoutType)
    )
    return (
      found ||
      workouts.find((w) => w.difficulty === "intermediate") ||
      workouts[0]
    )
  }, [workouts, todayIndex])

  return {
    todayIndex,
    todayPlan,
    recommendedWorkout,
    completedDays,
    weeklyGoal,
    totalCompleted,
  }
}
