"use client"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import {
  Users,
  Twitter,
  Github,
  Linkedin,
  Network,
  Rocket,
  Brain,
  Target,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  Instagram,
  ChevronDown,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Enhanced mobile-first mouse follower (kept as is, as it's not meant to be seen in screenshot)
const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const updateMousePosition = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseEnter = () => !isMobile && setIsHovering(true)
    const handleMouseLeave = () => !isMobile && setIsHovering(false)

    if (!isMobile) {
      window.addEventListener("mousemove", updateMousePosition)
      const interactiveElements = document.querySelectorAll("button, a, [data-interactive]")
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter)
        el.addEventListener("mouseleave", handleMouseLeave)
      })
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
      if (!isMobile) {
        window.removeEventListener("mousemove", updateMousePosition)
        const interactiveElements = document.querySelectorAll("button, a, [data-interactive]")
        interactiveElements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter)
          el.removeEventListener("mouseleave", handleMouseLeave)
        })
      }
    }
  }, [isMobile])

  if (isMobile) return null

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

// Minimal background (Adjusted opacity and color based on the screenshot, which implies a very subtle effect)
const MinimalBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
      {/* Mobile-optimized grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.01] sm:opacity-[0.015]" // Reduced opacity
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), /* Very light lines */
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px) /* Very light lines */
          `,
          backgroundSize: "30px 30px",
        }}
      />
    </div>
  )
}

// Mobile-optimized logo (kept as is, looks good and matches screenshot)
const Logo = () => {
  const [currentTheme, setCurrentTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") || "light"
    setCurrentTheme(savedTheme)

    // Listen for theme changes
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

// Enhanced mobile-first navigation (Adjusted for visual match based on screenshot)
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()

  // Use a conditional background based on scroll position
  // For light mode: transparent at top, almost white when scrolled
  // For dark mode: transparent at top, almost black when scrolled
  const scrolledBgOpacity = useTransform(scrollY, [0, 50], [0, 0.95]);

  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setCurrentTheme(savedTheme);

    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute("data-theme") || "light";
      setCurrentTheme(theme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const backgroundColor = useTransform(scrolledBgOpacity, (opacity) => {
    if (currentTheme === "dark" || currentTheme === "night") {
      return `rgba(23,23,23,${opacity})`; // Dark background
    }
    return `rgba(255,255,255,${opacity})`; // Light background
  });


  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm border-b border-transparent" // Start with transparent border
      style={{ backgroundColor, borderColor: useTransform(scrollY, [0, 50], ["transparent", "var(--border)"]) }} // Border appears on scroll
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Logo />

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
            <Link
              href="/news"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              data-interactive
            >
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

          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <Button
              className="hidden sm:flex bg-black text-white hover:bg-gray-800 transition-all duration-200 text-sm px-4 py-2 rounded-lg"
              onClick={() => window.open("https://chat.whatsapp.com/Iko7hynwsRmAl6PJu86HMJ", "_blank")}
              data-interactive
            >
              Join Community
              <ArrowRight className="ml-2 w-3 h-3" />
            </Button>

            {/* Enhanced Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground w-10 h-10 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              data-interactive
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-3 pb-4 space-y-2 bg-background/95 backdrop-blur-md rounded-xl mt-3 border border-border shadow-lg">
            {[
              { href: "/team", label: "Team" },
              { href: "/partners", label: "Partners" },
              { href: "/events", label: "Events" },
              { href: "/news", label: "News" },
              { href: "/contact", label: "Contact" },
            ].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 rounded-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <div className="pt-3 border-t border-border">
              <Button
                className="w-full bg-foreground text-background hover:bg-foreground/90 text-sm py-3 rounded-lg font-medium"
                onClick={() => {
                  window.open("https://chat.whatsapp.com/Iko7hynwsRmAl6PJu86HMJ", "_blank")
                  setIsOpen(false)
                }}
              >
                <Users className="mr-2 w-4 h-4" />
                Join Community
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

// Enhanced mobile-first hero section (Adjusted for visual match based on screenshot)
const HeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 pt-20 sm:pt-16">
      <motion.div style={{ y }} className="text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Mobile-optimized badge */}
          <motion.div
            className="inline-flex items-center px-3 py-1.5 sm:px-4 bg-muted rounded-full mb-6 sm:mb-8 border border-border" // Added border
            whileHover={{ scale: 1.05 }}
            data-interactive
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 sm:mr-3 animate-pulse" />
            <span className="text-muted-foreground text-xs sm:text-sm font-medium text-center">
              India's Premier Web3 & AI Community
            </span>
          </motion.div>

          {/* Mobile-optimized heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-foreground px-2" // Increased font size significantly
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Code the Future.
            <br />
            <span className="text-muted-foreground/80">Build Tomorrow.</span> {/* Slightly lighter muted color */}
          </motion.h1>

          {/* Mobile-optimized description */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Join <span className="font-semibold text-foreground">400+ elite builders</span> shaping the Web3 & AI
            revolution
          </motion.p>

          {/* Enhanced mobile CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 px-8 py-3.5 text-base rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300" // Increased padding and font size for prominent look
              onClick={() => window.open("https://link3.to/XHHCI8L7", "_blank")}
              data-interactive
            >
              <Rocket className="mr-2 w-5 h-5" /> {/* Increased icon size */}
              Start Building
              <ExternalLink className="ml-2 w-4 h-4" /> {/* Increased icon size */}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-border text-foreground hover:bg-muted px-8 py-3.5 text-base rounded-xl font-medium bg-transparent" // Increased padding and font size
              onClick={() => window.open("https://chat.whatsapp.com/Iko7hynwsRmAl6PJu86HMJ", "_blank")}
              data-interactive
            >
              <Users className="mr-2 w-5 h-5" /> {/* Increased icon size */}
              Join Community
            </Button>
          </motion.div>

          {/* Enhanced mobile stats */}
          <motion.div
            className="grid grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto px-4" // Adjusted max-width and gap for visual match
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              { number: "400+", label: "Elite Builders" },
              { number: "100%", label: "Innovation" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 sm:p-5 bg-card/50 rounded-xl border border-border/70" // Adjusted padding, background, and border
                whileHover={{ scale: 1.05 }}
                data-interactive
              >
                <div className="text-xl sm:text-3xl font-bold text-foreground mb-1">{stat.number}</div> {/* Increased font size */}
                <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div> {/* Adjusted font size */}
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile scroll indicator */}
          <motion.div
            className="mt-12 sm:mt-16 flex flex-col items-center justify-center" // Centered both horizontally and vertically
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.div
              className="flex flex-col items-center text-muted-foreground cursor-pointer"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            >
              <span className="text-xs mb-2">Scroll to explore</span> {/* Show on all sizes as in screenshot */}
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Enhanced mobile features section (kept as is, not visible in initial screenshot)
const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "AI Innovation",
      description: "Build next-generation AI applications with cutting-edge tools and frameworks.",
    },
    {
      icon: <Network className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Web3 Ecosystem",
      description: "Dive into blockchain, DeFi, and decentralized technologies.",
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Elite Network",
      description: "Connect with 400+ pre-vetted developers and innovators.",
    },
    {
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Impact Projects",
      description: "Work on meaningful projects that create real value.",
    },
  ]

  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-4">
            Why Choose Builder Base
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Join India's most exclusive community of builders and innovators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              data-interactive
            >
              <Card className="bg-card border-border hover:border-foreground/20 transition-all duration-300 h-full rounded-xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg mb-3 sm:mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced mobile team section (kept as is, not visible in initial screenshot)
const TeamSection = () => {
  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 px-4">
            Meet the Visionary
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            The innovative mind building the future of Web3 & AI
          </p>
        </motion.div>

        <div className="text-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} data-interactive>
            <Card className="bg-card border-border max-w-sm sm:max-w-md mx-auto rounded-xl">
              <CardContent className="p-6 sm:p-8">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6">
                  <Image
                    src="/images/founder-avatar.jpg"
                    alt="Punit Pal - Founder of Builder Base"
                    width={96}
                    height={96}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">Punit Pal</h3>
                <p className="text-muted-foreground font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                  Founder & Visionary
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 sm:mb-6">
                  Leading the Web3 & AI revolution in India. Connecting elite builders to create the future.
                </p>

                {/* Enhanced mobile contact */}
                <div className="mb-4 sm:mb-6 p-3 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground text-xs sm:text-sm mb-1">Get in touch:</p>
                  <a
                    href="mailto:founder@builderbase.xyz"
                    className="text-foreground font-medium hover:text-purple-400 transition-colors text-sm break-all"
                  >
                    founder@builderbase.xyz
                  </a>
                </div>

                <Button
                  className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 rounded-lg"
                  onClick={() => window.open("https://link3.to/right-almonte", "_blank")}
                  data-interactive
                >
                  <ExternalLink className="mr-2 w-4 h-4" />
                  Connect
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Enhanced mobile CTA section (kept as is, not visible in initial screenshot)
const CTASection = () => {
  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-4">
            Ready to Build the Future?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join ambitious developers and visionary builders creating groundbreaking Web3 & AI solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 px-6 sm:px-8 py-3 text-sm sm:text-base rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open("https://link3.to/XHHCI8L7", "_blank")}
              data-interactive
            >
              <Rocket className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Join Builder Base
              <ExternalLink className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-border text-foreground hover:bg-muted px-6 sm:px-8 py-3 text-sm sm:text-base rounded-xl font-medium bg-transparent"
              onClick={() => window.open("https://chat.whatsapp.com/Iko7hynwsRmAl6PJu86HMJ", "_blank")}
              data-interactive
            >
              <Network className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Explore Community
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced mobile footer (kept as is, not visible in initial screenshot)
const Footer = () => {
  const footerLinks = {
    Community: [
      { name: "Telegram", href: "https://t.me/TheBuilderBase" },
      { name: "WhatsApp", href: "https://chat.whatsapp.com/Iko7hynwsRmAl6PJu86HMJ" },
      { name: "Community Profile", href: "https://link3.to/XHHCI8L7" },
    ],
    Resources: [
      { name: "Documentation", href: "https://builderbase.my.canva.site/" },
      { name: "Blog", href: "#" },
      { name: "Events", href: "/events" },
    ],
    Company: [
      { name: "About", href: "/team" },
      { name: "Contact", href: "/contact" },
    ],
  }

  return (
    <footer className="py-8 sm:py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="lg:col-span-2 text-center sm:text-left">
            <Logo />
            <p className="text-muted-foreground text-sm mt-3 sm:mt-4 max-w-md mx-auto sm:mx-0">
              India's premier community for elite Web3 & AI builders. Join 400+ innovators building the future.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3 mt-4 sm:mt-6">
              {[
                { icon: Twitter, url: "https://x.com/theBuilder_base" },
                { icon: Github, url: "https://github.com/ShahiTechnovation" },
                { icon: Linkedin, url: "https://www.linkedin.com/company/builder-base" },
                { icon: Instagram, url: "https://www.instagram.com/the.builderbase" },
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground w-10 h-10 rounded-lg"
                  onClick={() => window.open(social.url, "_blank")}
                  data-interactive
                >
                  <social.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="text-center sm:text-left">
              <h3 className="text-foreground font-semibold mb-3 text-sm sm:text-base">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      data-interactive
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-4 sm:pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-xs sm:text-sm">© 2025 Builder Base. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main page component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <MinimalBackground />
      <MouseFollower />
      <Navigation />

      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <TeamSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  )
}
