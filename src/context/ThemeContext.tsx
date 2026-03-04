"use client"

import React, { createContext, useContext, useEffect } from "react"

const ThemeContext = createContext<{} | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always use nebula (blue) theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "nebula")
  }, [])

  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
