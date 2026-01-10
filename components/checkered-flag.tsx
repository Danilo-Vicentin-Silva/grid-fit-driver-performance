"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface CheckeredFlagProps {
  show: boolean
  onComplete?: () => void
}

export function CheckeredFlag({ show, onComplete }: CheckeredFlagProps) {
  const [visible, setVisible] = useState(show)
  const { t } = useLanguage()

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        onComplete?.()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            {/* Checkered flag pattern */}
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="grid h-24 w-24 grid-cols-4 grid-rows-4 overflow-hidden rounded-lg shadow-2xl"
              >
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={(Math.floor(i / 4) + (i % 4)) % 2 === 0 ? "bg-foreground" : "bg-background"}
                  />
                ))}
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary"
              >
                <Trophy className="h-5 w-5 text-primary-foreground" />
              </motion.div>
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-foreground">{t("player.completed")}</h2>
              <p className="mt-2 text-muted-foreground">{t("player.greatJob")}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
