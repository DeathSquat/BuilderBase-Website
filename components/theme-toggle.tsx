"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Moon, Laptop, Check } from "lucide-react"

type Theme = "light" | "dark" | "night"

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light"
    setTheme(savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme)
  }, [])

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  return { theme, changeTheme, mounted }
}

export const ThemeToggle = () => {
  const { theme, changeTheme, mounted } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="text-muted-foreground w-9 h-9 sm:w-10 sm:h-10 rounded-lg">
        <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
    )
  }

  const themes = [
    {
      value: "light" as Theme,
      label: "Light",
      icon: <Sun className="w-3 h-3 sm:w-4 sm:h-4" />,
      description: "Clean and bright",
    },
    {
      value: "dark" as Theme,
      label: "Dark",
      icon: <Moon className="w-3 h-3 sm:w-4 sm:h-4" />,
      description: "Easy on the eyes",
    },
    {
      value: "night" as Theme,
      label: "Night",
      icon: <Laptop className="w-3 h-3 sm:w-4 sm:h-4" />,
      description: "Deep black theme",
    },
  ]

  const currentTheme = themes.find((t) => t.value === theme)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="text-muted-foreground hover:text-foreground transition-colors relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg"
        data-interactive
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {currentTheme?.icon}
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Enhanced Mobile Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Enhanced Mobile Theme Selector */}
            <motion.div
              className="absolute right-0 top-12 z-50 w-screen max-w-xs sm:max-w-none sm:w-auto"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-background/95 backdrop-blur-md border-border shadow-2xl mx-4 sm:mx-0 min-w-[200px] rounded-xl">
                <CardContent className="p-3 sm:p-2">
                  <div className="space-y-1">
                    {themes.map((themeOption) => (
                      <motion.button
                        key={themeOption.value}
                        onClick={() => {
                          changeTheme(themeOption.value)
                          setIsOpen(false)
                        }}
                        className={`w-full flex items-center justify-between px-3 py-3 sm:py-2 rounded-lg text-left transition-colors ${
                          theme === themeOption.value
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted">
                            {themeOption.icon}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{themeOption.label}</div>
                            <div className="text-xs opacity-70 hidden sm:block">{themeOption.description}</div>
                          </div>
                        </div>
                        {theme === themeOption.value && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Enhanced Mobile Theme Preview */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-2 text-center sm:text-left">Preview</div>
                    <div className="flex justify-center sm:justify-start space-x-2">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-background border border-border" />
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-muted" />
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Enhanced Mobile Simple toggle
export const SimpleThemeToggle = () => {
  const { theme, changeTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="text-muted-foreground w-9 h-9 sm:w-10 sm:h-10 rounded-lg">
        <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
    )
  }

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "night"]
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    changeTheme(themes[nextIndex])
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
      case "dark":
        return <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
      case "night":
        return <Laptop className="w-4 h-4 sm:w-5 sm:h-5" />
      default:
        return <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="text-muted-foreground hover:text-foreground transition-colors w-9 h-9 sm:w-10 sm:h-10 rounded-lg"
      data-interactive
      title={`Current theme: ${theme}. Click to cycle.`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {getIcon()}
      </motion.div>
    </Button>
  )
}

// Add this export at the end of the file
export const useCurrentTheme = () => {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light"
    setTheme(savedTheme)

    // Listen for theme changes
    const handleThemeChange = () => {
      const currentTheme = (localStorage.getItem("theme") as Theme) || "light"
      setTheme(currentTheme)
    }

    // Listen for storage changes
    window.addEventListener("storage", handleThemeChange)

    // Listen for theme attribute changes
    const observer = new MutationObserver(() => {
      const currentTheme = (document.documentElement.getAttribute("data-theme") as Theme) || "light"
      setTheme(currentTheme)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => {
      window.removeEventListener("storage", handleThemeChange)
      observer.disconnect()
    }
  }, [])

  return { theme, mounted }
}
