export interface Profile {
  id: string
  name: string | null
  category: string | null
  weight: number | null
  height: number | null
  weekly_goal: number
  created_at: string
  updated_at: string
}

export interface ExerciseCategory {
  id: string
  name: string
  name_pt: string
  icon: string
  color: string
  created_at: string
}

export interface Exercise {
  id: string
  category_id: string
  name: string
  name_pt: string
  description: string
  description_pt: string
  sets: number
  reps: string
  duration_seconds: number | null
  created_at: string
  category?: ExerciseCategory
}

export interface Workout {
  id: string
  name: string
  name_pt: string
  description: string | null
  description_pt: string | null
  difficulty: "beginner" | "intermediate" | "advanced"
  estimated_duration: number
  created_at: string
  exercises?: WorkoutExercise[]
}

export interface WorkoutExercise {
  id: string
  workout_id: string
  exercise_id: string
  order_index: number
  sets_override: number | null
  reps_override: string | null
  exercise?: Exercise
}

export interface CompletedWorkout {
  id: string
  user_id: string
  workout_id: string | null
  completed_at: string
  duration_seconds: number | null
  notes: string | null
  workout?: Workout
}

export interface CompletedExercise {
  id: string
  completed_workout_id: string
  exercise_id: string | null
  sets_completed: number
  completed_at: string
}
