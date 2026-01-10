import { createClient } from "@/lib/supabase/client"

export async function saveCompletedWorkout(
  userId: string,
  workoutId: string,
  durationSeconds: number,
  exerciseSets: Record<string, number>
) {
  const supabase = createClient()

  const { data: completedWorkout, error: workoutError } = await supabase
    .from("completed_workouts")
    .insert({
      user_id: userId,
      workout_id: workoutId,
      duration_seconds: durationSeconds,
    })
    .select()
    .single()

  if (workoutError) throw workoutError

  const completedExercises = Object.entries(exerciseSets).map(
    ([exerciseId, setsCompleted]) => ({
      completed_workout_id: completedWorkout.id,
      exercise_id: exerciseId,
      sets_completed: setsCompleted,
    })
  )

  if (completedExercises.length > 0) {
    const { error: exercisesError } = await supabase
      .from("completed_exercises")
      .insert(completedExercises)
    if (exercisesError) throw exercisesError
  }

  return completedWorkout
}
