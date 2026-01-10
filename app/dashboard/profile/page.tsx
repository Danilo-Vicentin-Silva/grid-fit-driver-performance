import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/ui/header"
import { ProfileContent } from "@/components/profile-content"

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()

  if (!profile) {
    const { data: newProfile } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        name: "",
        category: "amateur",
        weight: null,
        height: null,
        weekly_goal: 3,
      })
      .select()
      .single()

    return (
      <>
        <Header title="GridFit" />
        <ProfileContent profile={newProfile} userId={user.id} email={user.email || ""} />
      </>
    )
  }

  return (
    <>
      <Header title="GridFit" />
      <ProfileContent profile={profile} userId={user.id} email={user.email || ""} />
    </>
  )
}
