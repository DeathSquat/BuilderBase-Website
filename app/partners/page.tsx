"use client"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import {
  Users,
  Network,
  Rocket,
  Building2,
  UserCheck,
  Globe,
  Target,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Minimalistic mouse follower (disabled on mobile)
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

// Enhanced mobile-first navigation
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
        <div className="flex items-center justify-between h-14 sm:h-16">
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
              className="text-foreground font-medium border-b-2 border-foreground/20"
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
              className="hidden sm:flex bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 text-sm px-4 py-2"
              onClick={() => window.open("https://chat.whatsapp.com/Iko7hynwsRmAl6PJu86HMJ", "_blank")}
              data-interactive
            >
              Join Community
              <ArrowRight className="ml-2 w-3 h-3" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground w-8 h-8"
              onClick={() => setIsOpen(!isOpen)}
              data-interactive
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
          <div className="px-2 pt-2 pb-4 space-y-2 bg-background/95 backdrop-blur-md rounded-lg mt-2 border border-border shadow-lg">
            {[
              { href: "/team", label: "Team" },
              { href: "/partners", label: "Partners", active: true },
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
                  className={`block px-4 py-3 transition-all duration-200 rounded-lg font-medium ${
                    item.active
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <div className="pt-2 border-t border-border">
              <Button
                className="w-full bg-foreground text-background hover:bg-foreground/90 text-sm py-3"
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

// Enhanced mobile-first hero section
const PartnersHeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 pt-20 sm:pt-16">
      <motion.div style={{ y }} className="text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Mobile-optimized badge */}
          <motion.div
            className="inline-flex items-center px-3 py-2 sm:px-4 bg-muted rounded-full mb-6 sm:mb-8"
            whileHover={{ scale: 1.05 }}
            data-interactive
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 sm:mr-3" />
            <span className="text-muted-foreground text-xs sm:text-sm font-medium text-center">
              Strategic Partnerships & Collaborations
            </span>
          </motion.div>

          {/* Mobile-optimized heading */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-foreground px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our
            <span className="text-muted-foreground"> Partners</span>
          </motion.h1>

          {/* Mobile-optimized description */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Strategic partnerships that drive innovation in the{" "}
            <span className="font-semibold text-foreground">Web3 & AI ecosystem</span>
          </motion.p>

          {/* Mobile-optimized CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 px-6 sm:px-8 py-3 text-sm sm:text-base"
              onClick={() => window.open("https://link3.to/XHHCI8L7", "_blank")}
              data-interactive
            >
              <Rocket className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Start Building
              <ExternalLink className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-border text-foreground hover:bg-muted px-6 sm:px-8 py-3 text-sm sm:text-base bg-transparent"
              onClick={() => window.open("https://chat.whatsapp.com/Iko7hynwsRmAl6PJu86HMJ", "_blank")}
              data-interactive
            >
              <Users className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Join Community
            </Button>
          </motion.div>

          {/* Mobile-optimized stats */}
          <motion.div
            className="grid grid-cols-2 gap-4 sm:gap-8 max-w-sm sm:max-w-md mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              { number: "Coming", label: "Soon" },
              { number: "Strategic", label: "Partnerships" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 sm:p-4 bg-muted/30 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// Enhanced mobile-first partnership types section
const PartnershipTypesSection = () => {
  const partnershipTypes = [
    {
      icon: <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Technology Partners",
      description: "Collaborate with leading tech companies to build cutting-edge solutions.",
    },
    {
      icon: <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Strategic Alliances",
      description: "Form strategic partnerships to expand our ecosystem and reach.",
    },
    {
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Global Networks",
      description: "Connect with international communities and organizations.",
    },
    {
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Mission Aligned",
      description: "Partner with organizations that share our vision for the future.",
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
            Partnership Opportunities
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            We're always looking for strategic partners to join our mission of building the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {partnershipTypes.map((type, index) => (
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
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg mb-3 sm:mb-4">
                    {type.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{type.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{type.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Enhanced mobile-first CTA section
const PartnershipCTASection = () => {
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
            Ready to Partner with Us?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join forces with Builder Base to create innovative solutions and drive the Web3 & AI revolution forward.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 px-6 sm:px-8 py-3 text-sm sm:text-base"
              onClick={() => window.open("https://link3.to/XHHCI8L7", "_blank")}
              data-interactive
            >
              <Rocket className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Start Partnership
              <ExternalLink className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-border text-foreground hover:bg-muted px-6 sm:px-8 py-3 text-sm sm:text-base bg-transparent"
              onClick={() => window.open("mailto:founder@builderbase.xyz?subject=Partnership Inquiry", "_blank")}
              data-interactive
            >
              <Network className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced mobile-first footer
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
      { name: "Events", href: "#" },
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
          <div className="lg:col-span-2">
            <Logo />
            <p className="text-muted-foreground text-sm mt-3 sm:mt-4 max-w-md">
              India's premier community for elite Web3 & AI builders. Join 400+ innovators building the future.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-foreground font-semibold text-sm sm:text-base">{category}</h3>
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

// Main partners page component
export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <MinimalBackground />
      <MouseFollower />
      <Navigation />

      <div className="relative z-10">
        <PartnersHeroSection />
        <PartnershipTypesSection />
        <PartnershipCTASection />
        <Footer />
      </div>
    </div>
  )
}
