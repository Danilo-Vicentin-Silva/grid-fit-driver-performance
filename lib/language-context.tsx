"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "pt" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navigation
    "nav.home": "Início",
    "nav.workouts": "Treinos",
    "nav.progress": "Progresso",
    "nav.profile": "Perfil",

    // Auth
    "auth.welcome": "Bem-vindo de volta",
    "auth.signIn": "Entre para continuar seu treino",
    "auth.email": "E-mail",
    "auth.password": "Senha",
    "auth.confirmPassword": "Confirmar Senha",
    "auth.startSession": "Iniciar Sessão",
    "auth.starting": "Iniciando...",
    "auth.newPilot": "Novo piloto?",
    "auth.createAccount": "Criar conta",
    "auth.joinGrid": "Entre no Grid",
    "auth.createPilotAccount": "Crie sua conta de piloto",
    "auth.creating": "Criando conta...",
    "auth.hasAccount": "Já tem uma conta?",
    "auth.signInLink": "Entrar",
    "auth.passwordMismatch": "As senhas não coincidem",
    "auth.passwordTooShort": "A senha deve ter pelo menos 6 caracteres",
    "auth.checkEmail": "Verifique seu e-mail",
    "auth.confirmationSent": "Enviamos um link de confirmação para",
    "auth.backToLogin": "Voltar para login",

    // Dashboard
    "dashboard.title": "GridFit",
    "dashboard.welcomeBack": "Bem-vindo de volta",
    "dashboard.driverPerformance": "Performance do Piloto",
    "dashboard.thisWeek": "Esta Semana",
    "dashboard.workouts": "treinos",
    "dashboard.weeklyGoal": "Meta Semanal",
    "dashboard.nextRecommended": "Próximo Treino Recomendado",
    "dashboard.quickStart": "Início Rápido",
    "dashboard.todayWorkout": "Treino de Hoje",
    "dashboard.dailyPlan": "Plano Diário",

    // Workouts
    "workouts.title": "Treinos",
    "workouts.subtitle": "Programas de treino para pilotos",
    "workouts.allLevels": "Todos os Níveis",
    "workouts.beginner": "Iniciante",
    "workouts.intermediate": "Intermediário",
    "workouts.advanced": "Avançado",
    "workouts.noWorkouts": "Nenhum treino encontrado para este filtro.",
    "workouts.min": "min",
    "workouts.exercises": "exercícios",
    "workouts.recommended": "Recomendado",
    "workouts.sets": "séries",
    "workouts.reps": "reps",
    "workouts.howTo": "Como fazer",

    // Workout Player
    "player.startWorkout": "Iniciar Treino",
    "player.finishWorkout": "Finalizar Treino",
    "player.saving": "Salvando...",
    "player.completed": "Treino Concluído!",
    "player.greatJob": "Excelente trabalho, piloto!",
    "player.backToDashboard": "Voltar ao Início",

    // Progress
    "progress.title": "Progresso",
    "progress.subtitle": "Acompanhe sua evolução",
    "progress.totalWorkouts": "Total de Treinos",
    "progress.totalTime": "Tempo Total",
    "progress.trained": "treinado",
    "progress.recentActivity": "Atividade Recente",
    "progress.noWorkouts": "Nenhum treino concluído ainda. Comece a treinar!",

    // Profile
    "profile.title": "Perfil",
    "profile.subtitle": "Gerencie suas configurações de piloto",
    "profile.account": "Conta",
    "profile.pilotProfile": "Perfil do Piloto",
    "profile.name": "Nome",
    "profile.yourName": "Seu nome",
    "profile.category": "Categoria",
    "profile.selectCategory": "Selecione sua categoria",
    "profile.weight": "Peso (kg)",
    "profile.height": "Altura (cm)",
    "profile.weeklyGoal": "Meta Semanal (treinos)",
    "profile.workoutsPerWeek": "treinos por semana",
    "profile.saveProfile": "Salvar Perfil",
    "profile.saving": "Salvando...",
    "profile.signOut": "Sair",
    "profile.language": "Idioma",
    "profile.theme": "Tema",
    "profile.darkMode": "Modo Escuro",
    "profile.lightMode": "Modo Claro",

    // Days
    "days.mon": "Seg",
    "days.tue": "Ter",
    "days.wed": "Qua",
    "days.thu": "Qui",
    "days.fri": "Sex",
    "days.sat": "Sáb",
    "days.sun": "Dom",

    // Categories
    "category.neck": "Pescoço",
    "category.core": "Core & Estabilidade",
    "category.grip": "Antebraço & Grip",
    "category.cardio": "Reflexos & Cardio",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.workouts": "Workouts",
    "nav.progress": "Progress",
    "nav.profile": "Profile",

    // Auth
    "auth.welcome": "Welcome back",
    "auth.signIn": "Sign in to continue your training",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.startSession": "Start Session",
    "auth.starting": "Starting...",
    "auth.newPilot": "New pilot?",
    "auth.createAccount": "Create account",
    "auth.joinGrid": "Join the Grid",
    "auth.createPilotAccount": "Create your pilot account",
    "auth.creating": "Creating account...",
    "auth.hasAccount": "Already have an account?",
    "auth.signInLink": "Sign in",
    "auth.passwordMismatch": "Passwords do not match",
    "auth.passwordTooShort": "Password must be at least 6 characters",
    "auth.checkEmail": "Check your email",
    "auth.confirmationSent": "We sent a confirmation link to",
    "auth.backToLogin": "Back to login",

    // Dashboard
    "dashboard.title": "GridFit",
    "dashboard.welcomeBack": "Welcome back",
    "dashboard.driverPerformance": "Driver Performance",
    "dashboard.thisWeek": "This Week",
    "dashboard.workouts": "workouts",
    "dashboard.weeklyGoal": "Weekly Goal",
    "dashboard.nextRecommended": "Next Recommended Workout",
    "dashboard.quickStart": "Quick Start",
    "dashboard.todayWorkout": "Today's Workout",
    "dashboard.dailyPlan": "Daily Plan",

    // Workouts
    "workouts.title": "Workouts",
    "workouts.subtitle": "Training programs for drivers",
    "workouts.allLevels": "All Levels",
    "workouts.beginner": "Beginner",
    "workouts.intermediate": "Intermediate",
    "workouts.advanced": "Advanced",
    "workouts.noWorkouts": "No workouts found for this filter.",
    "workouts.min": "min",
    "workouts.exercises": "exercises",
    "workouts.recommended": "Recommended",
    "workouts.sets": "sets",
    "workouts.reps": "reps",
    "workouts.howTo": "How to",

    // Workout Player
    "player.startWorkout": "Start Workout",
    "player.finishWorkout": "Finish Workout",
    "player.saving": "Saving...",
    "player.completed": "Workout Complete!",
    "player.greatJob": "Great job, pilot!",
    "player.backToDashboard": "Back to Dashboard",

    // Progress
    "progress.title": "Progress",
    "progress.subtitle": "Track your evolution",
    "progress.totalWorkouts": "Total Workouts",
    "progress.totalTime": "Total Time",
    "progress.trained": "trained",
    "progress.recentActivity": "Recent Activity",
    "progress.noWorkouts": "No workouts completed yet. Start training!",

    // Profile
    "profile.title": "Profile",
    "profile.subtitle": "Manage your pilot settings",
    "profile.account": "Account",
    "profile.pilotProfile": "Pilot Profile",
    "profile.name": "Name",
    "profile.yourName": "Your name",
    "profile.category": "Category",
    "profile.selectCategory": "Select your category",
    "profile.weight": "Weight (kg)",
    "profile.height": "Height (cm)",
    "profile.weeklyGoal": "Weekly Goal (workouts)",
    "profile.workoutsPerWeek": "workouts per week",
    "profile.saveProfile": "Save Profile",
    "profile.saving": "Saving...",
    "profile.signOut": "Sign Out",
    "profile.language": "Language",
    "profile.theme": "Theme",
    "profile.darkMode": "Dark Mode",
    "profile.lightMode": "Light Mode",

    // Days
    "days.mon": "Mon",
    "days.tue": "Tue",
    "days.wed": "Wed",
    "days.thu": "Thu",
    "days.fri": "Fri",
    "days.sat": "Sat",
    "days.sun": "Sun",

    // Categories
    "category.neck": "Neck",
    "category.core": "Core & Stability",
    "category.grip": "Forearm & Grip",
    "category.cardio": "Reflexes & Cardio",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")

  useEffect(() => {
    const stored = localStorage.getItem("gridfit-language") as Language | null
    if (stored && (stored === "pt" || stored === "en")) {
      setLanguageState(stored)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("gridfit-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
