import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/ui/header"
import { ProgressContent } from "@/components/progress-content"

export default async function ProgressPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch completed workouts
  const { data: completedWorkouts } = await supabase
    .from("completed_workouts")
    .select(`
      *,
      workout:workouts(*)
    `)
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(20)

  // Fetch profile for weekly goal
  const { data: profile } = await supabase.from("profiles").select("weekly_goal").eq("id", user.id).maybeSingle()

  return (
    <>
      <Header title="GridFit" />
      <ProgressContent completedWorkouts={completedWorkouts || []} weeklyGoal={profile?.weekly_goal || 4} />
    </>
  )
}
