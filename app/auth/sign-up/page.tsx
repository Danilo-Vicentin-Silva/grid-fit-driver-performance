"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Flag, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError(t("auth.passwordMismatch"))
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError(t("auth.passwordTooShort"))
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
        },
      })
      if (error) throw error
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <Flag className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">GridFit</h1>
          <p className="text-sm text-muted-foreground">{t("dashboard.driverPerformance")}</p>
        </div>

        <Card className="border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-foreground">{t("auth.joinGrid")}</CardTitle>
            <CardDescription className="text-muted-foreground">{t("auth.createPilotAccount")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-foreground">
                    {t("auth.email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="piloto@gridfit.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-foreground">
                    {t("auth.password")}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-input border-border text-foreground"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="repeat-password" className="text-foreground">
                    {t("auth.confirmPassword")}
                  </Label>
                  <Input
                    id="repeat-password"
                    type="password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="h-12 bg-input border-border text-foreground"
                  />
                </div>
                {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>}
                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("auth.creating")}
                    </>
                  ) : (
                    t("auth.createAccount")
                  )}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {t("auth.hasAccount") + " "}
                <Link href="/auth/login" className="text-primary hover:underline underline-offset-4 font-medium">
                  {t("auth.signInLink")}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
