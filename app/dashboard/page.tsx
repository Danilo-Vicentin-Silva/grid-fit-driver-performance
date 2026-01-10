import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/ui/header"
import { DashboardContent } from "@/components/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch workouts
  const { data: workouts } = await supabase
    .from("workouts")
    .select(`
      *,
      exercises:workout_exercises(
        *,
        exercise:exercises(*)
      )
    `)
    .order("created_at", { ascending: true })

  // Fetch completed workouts for this week
  const startOfWeek = new Date()
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1)
  startOfWeek.setHours(0, 0, 0, 0)

  const { data: completedWorkouts } = await supabase
    .from("completed_workouts")
    .select("*")
    .eq("user_id", user.id)
    .gte("completed_at", startOfWeek.toISOString())

  // Get profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()

  // Calculate completed days this week
  const completedDays =
    completedWorkouts
      ?.map((cw) => {
        const date = new Date(cw.completed_at)
        return date.getDay() === 0 ? 6 : date.getDay() - 1 // Convert to Mon=0 format
      })
      .filter((v, i, a) => a.indexOf(v) === i) || []

  return (
    <>
      <Header title="GridFit" subtitle={profile?.name ? `${profile.name}` : undefined} />
      <DashboardContent
        workouts={workouts || []}
        completedDays={completedDays}
        weeklyGoal={profile?.weekly_goal || 4}
        totalCompleted={completedWorkouts?.length || 0}
      />
    </>
  )
}
