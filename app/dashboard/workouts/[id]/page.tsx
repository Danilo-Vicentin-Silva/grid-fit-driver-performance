import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { WorkoutPlayer } from "@/components/workout-player"

interface WorkoutDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function WorkoutDetailPage({ params }: WorkoutDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch workout with exercises
  const { data: workout } = await supabase
    .from("workouts")
    .select(`
      *,
      exercises:workout_exercises(
        *,
        exercise:exercises(
          *,
          category:exercise_categories(*)
        )
      )
    `)
    .eq("id", id)
    .single()

  if (!workout) {
    notFound()
  }

  // Transform exercises data
  const exercises =
    workout.exercises
      ?.sort((a: { order_index: number }, b: { order_index: number }) => a.order_index - b.order_index)
      .map((we: { exercise: unknown }) => we.exercise) || []

  return <WorkoutPlayer workout={workout} exercises={exercises} userId={user.id} />
}
