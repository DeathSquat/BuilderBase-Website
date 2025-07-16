"use client"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Users, Network, Rocket, Newspaper, Calendar, Bell, Rss, Menu, X, ArrowRight, ExternalLink } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Minimalistic mouse follower
const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener("mousemove", updateMousePosition)

    const interactiveElements = document.querySelectorAll("button, a, [data-interactive]")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 8,
        y: mousePosition.y - 8,
        scale: isHovering ? 2 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
}

// Minimalistic background
const MinimalBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}

// Enhanced logo with Builder Base design
const Logo = () => {
  const [currentTheme, setCurrentTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") || "light"
    setCurrentTheme(savedTheme)

    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute("data-theme") || "light"
      setCurrentTheme(theme)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => observer.disconnect()
  }, [])

  const isDarkMode = currentTheme === "dark" || currentTheme === "night"
  const logoSrc = isDarkMode ? "/images/builder-base-logo-dark.jpg" : "/images/builder-base-logo.png"

  return (
    <motion.div
      className="flex items-center space-x-2 sm:space-x-3"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="relative">
        {mounted && (
          <Image
            src={logoSrc || "/placeholder.svg"}
            alt="Builder Base Logo"
            width={32}
            height={32}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
        )}
      </div>
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-foreground">Builder Base</h1>
        <p className="text-xs text-muted-foreground font-mono hidden sm:block">{"{ innovate.build.scale }"}</p>
      </div>
    </motion.div>
  )
}

// Consistent navigation
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"])

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-border/50"
      style={{ backgroundColor }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/team"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              data-interactive
            >
              Team
            </Link>
            <Link
              href="/partners"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              data-interactive
            >
              Partners
            </Link>
            <Link
              href="/events"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              data-interactive
            >
              Events
            </Link>
            <Link href="/news" className="text-foreground font-medium border-b-2 border-foreground/20" data-interactive>
              News
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              data-interactive
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              className="hidden sm:flex bg-foreground text-background hover:bg-foreground/90 transition-all duration-200"
              onClick={() => window.open("https://chat.whatsapp.com/Iko7hynwsRmAl6PJu86HMJ", "_blank")}
              data-interactive
            >
              Join Community
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              data-interactive
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background/90 rounded-lg mt-2 border border-border">
            <Link
              href="/team"
              className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Team
            </Link>
            <Link
              href="/partners"
              className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Partners
            </Link>
            <Link
              href="/events"
              className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Events
            </Link>
            <Link href="/news" className="block px-3 py-2 text-foreground font-medium bg-muted rounded">
              News
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Button
              className="w-full mt-2 bg-foreground text-background"
              onClick={() => window.open("https://chat.whatsapp.com/Iko7hynwsRmAl6PJu86HMJ", "_blank")}
            >
              Join Community
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

// News hero section
const NewsHeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 pt-16">
      <motion.div style={{ y }} className="text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Simple badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-muted rounded-full mb-8"
            whileHover={{ scale: 1.05 }}
            data-interactive
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
            <span className="text-muted-foreground text-sm font-medium">Latest Updates & Announcements</span>
          </motion.div>

          {/* Clean heading */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Latest
            <span className="text-muted-foreground"> News</span>
          </motion.h1>

          {/* Simple description */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Stay updated with the latest developments from{" "}
            <span className="font-semibold text-foreground">Builder Base</span>
          </motion.p>

          {/* Clean CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3"
              onClick={() => window.open("https://link3.to/XHHCI8L7", "_blank")}
              data-interactive
            >
              <Rocket className="mr-2 w-5 h-5" />
              Start Building
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-muted px-8 py-3 bg-transparent"
              onClick={() => window.open("https://chat.whatsapp.com/Iko7hynwsRmAl6PJu86HMJ", "_blank")}
              data-interactive
            >
              <Users className="mr-2 w-5 h-5" />
              Join Community
            </Button>
          </motion.div>

          {/* News stats */}
          <motion.div
            className="grid grid-cols-2 gap-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              { number: "Coming", label: "Soon" },
              { number: "Stay", label: "Tuned" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// News categories section
const NewsCategoriesSection = () => {
  const newsCategories = [
    {
      icon: <Newspaper className="w-6 h-6" />,
      title: "Community Updates",
      description: "Latest news about our growing community and member achievements.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Events & Hackathons",
      description: "Upcoming events, hackathons, and community gatherings.",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Announcements",
      description: "Important announcements and platform updates.",
    },
    {
      icon: <Rss className="w-6 h-6" />,
      title: "Industry News",
      description: "Curated Web3 & AI industry news and insights.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">News Categories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about everything happening in the Builder Base ecosystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              data-interactive
            >
              <Card className="bg-card border-border hover:border-foreground/20 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-lg mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{category.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// News CTA section
const NewsCTASection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Stay in the Loop</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Don't miss out on important updates. Join our community to get the latest news and announcements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3"
              onClick={() => window.open("https://link3.to/XHHCI8L7", "_blank")}
              data-interactive
            >
              <Rocket className="mr-2 w-5 h-5" />
              Get Started
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-muted px-8 py-3 bg-transparent"
              onClick={() => window.open("https://t.me/TheBuilderBase", "_blank")}
              data-interactive
            >
              <Network className="mr-2 w-5 h-5" />
              Follow Updates
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main news page component
export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <MinimalBackground />
      <MouseFollower />
      <Navigation />

      <div className="relative z-10">
        <NewsHeroSection />
        <NewsCategoriesSection />
        <NewsCTASection />
      </div>
    </div>
  )
}
