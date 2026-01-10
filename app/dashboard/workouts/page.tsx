import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/ui/header"
import { WorkoutsContent } from "@/components/workouts-content"

export default async function WorkoutsPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch all workouts with exercises
  const { data: workouts } = await supabase
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
    .order("difficulty", { ascending: true })

  // Fetch categories
  const { data: categories } = await supabase.from("exercise_categories").select("*").order("name", { ascending: true })

  return (
    <>
      <Header title="GridFit" />
      <WorkoutsContent workouts={workouts || []} categories={categories || []} />
    </>
  )
}
