"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export default function SignUpSuccessPage() {
  const { t } = useLanguage()

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
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <Mail className="h-6 w-6 text-accent" />
              </div>
            </div>
            <CardTitle className="text-xl text-foreground">{t("auth.checkEmail")}</CardTitle>
            <CardDescription className="text-muted-foreground">{t("auth.confirmationSent")}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/auth/login">
              <Button variant="outline" className="w-full h-12 bg-transparent">
                {t("auth.backToLogin")}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
