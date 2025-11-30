"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { siteConfig } from "@/config/global"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(siteConfig.theme.default)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved theme preference
    const savedTheme = localStorage.getItem(siteConfig.theme.storageKey) as Theme | null

    if (savedTheme && siteConfig.theme.supported.includes(savedTheme)) {
      setThemeState(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      // Check system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const defaultTheme = systemPrefersDark ? "dark" : siteConfig.theme.default
      setThemeState(defaultTheme)
      document.documentElement.classList.toggle("dark", defaultTheme === "dark")
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(siteConfig.theme.storageKey, newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Return default values when outside provider (e.g., during SSR)
    return {
      theme: "light" as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
    }
  }
  return context
}
