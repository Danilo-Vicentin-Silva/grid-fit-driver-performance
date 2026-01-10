"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { LogOut, Save, Loader2, User, Mail, Globe, Sun, Moon } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "@/lib/theme-context"
import type { Profile } from "@/lib/types"

interface ProfileContentProps {
  profile: Profile | null
  userId: string
  email: string
}

const categories = [
  "Kart Indoor",
  "Kart Outdoor",
  "Rotax",
  "Formula Vee",
  "Formula 3",
  "GT3",
  "Stock Car",
  "Endurance",
  "Other",
]

export function ProfileContent({ profile, userId, email }: ProfileContentProps) {
  const router = useRouter()
  const { t, language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    category: profile?.category || "",
    weight: profile?.weight?.toString() || "",
    height: profile?.height?.toString() || "",
    weekly_goal: profile?.weekly_goal?.toString() || "4",
  })

  const handleSave = async () => {
    setIsSaving(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: userId,
        name: formData.name || null,
        category: formData.category || null,
        weight: formData.weight ? Number.parseFloat(formData.weight) : null,
        height: formData.height ? Number.parseFloat(formData.height) : null,
        weekly_goal: Number.parseInt(formData.weekly_goal) || 4,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <div className="space-y-6 p-4">
      {/* User Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            {t("profile.account")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-foreground">{email}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Globe className="h-5 w-5 text-muted-foreground" />
            {t("profile.language")} & {t("profile.theme")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Toggle */}
          <div className="flex items-center justify-between">
            <Label className="text-foreground">{t("profile.language")}</Label>
            <div className="flex gap-2">
              <Button variant={language === "pt" ? "default" : "outline"} size="sm" onClick={() => setLanguage("pt")}>
                Português
              </Button>
              <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
                English
              </Button>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <Label className="text-foreground flex items-center gap-2">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {theme === "dark" ? t("profile.darkMode") : t("profile.lightMode")}
            </Label>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
        </CardContent>
      </Card>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">{t("profile.pilotProfile")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{t("profile.name")}</Label>
            <Input
              id="name"
              placeholder={t("profile.yourName")}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">{t("profile.category")}</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger id="category" className="h-12">
                <SelectValue placeholder={t("profile.selectCategory")} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="weight">{t("profile.weight")}</Label>
              <Input
                id="weight"
                type="number"
                placeholder="75"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height">{t("profile.height")}</Label>
              <Input
                id="height"
                type="number"
                placeholder="175"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="h-12"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="weekly_goal">{t("profile.weeklyGoal")}</Label>
            <Select
              value={formData.weekly_goal}
              onValueChange={(value) => setFormData({ ...formData, weekly_goal: value })}
            >
              <SelectTrigger id="weekly_goal" className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5, 6, 7].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {t("profile.workoutsPerWeek")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full h-12 mt-2" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("profile.saving")}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {t("profile.saveProfile")}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Button
        variant="outline"
        className="w-full h-12 text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
        onClick={handleSignOut}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
        {t("profile.signOut")}
      </Button>
    </div>
  )
}
