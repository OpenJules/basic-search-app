"use client"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-2.5 py-1.5 text-sm text-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  )
}
