"use client"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Target, Rocket, Twitter, Github, Linkedin, ExternalLink, Menu, X, ArrowRight, Users } from "lucide-react"
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
            <Link href="/team" className="text-foreground font-medium border-b-2 border-foreground/20" data-interactive>
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
            <Link href="/team" className="block px-3 py-2 text-foreground font-medium bg-muted rounded">
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
            <Link
              href="/news"
              className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
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

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <MinimalBackground />
      <MouseFollower />
      <Navigation />

      <div className="relative z-10">
        {/* Team Content */}
        <div className="max-w-6xl mx-auto px-4 py-20 pt-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet Our
              <span className="text-muted-foreground"> Visionary</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The innovative mind building the future of Web3 & AI in India
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-card border-border backdrop-blur-sm">
                <CardContent className="p-12">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    {/* Profile Image */}
                    <div className="text-center md:text-left">
                      <motion.div
                        className="relative w-48 h-48 mx-auto md:mx-0 mb-6"
                        whileHover={{ scale: 1.05 }}
                        animate={{
                          boxShadow: [
                            "0 0 30px rgba(124, 58, 237, 0.3)",
                            "0 0 50px rgba(139, 92, 246, 0.4)",
                            "0 0 30px rgba(124, 58, 237, 0.3)",
                          ],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Image
                          src="/images/founder-avatar.jpg"
                          alt="Punit Pal - Founder of Builder Base"
                          width={192}
                          height={192}
                          className="w-48 h-48 rounded-3xl object-cover shadow-2xl"
                        />
                        <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-green-400 rounded-full border-4 border-background flex items-center justify-center">
                          <div className="w-6 h-6 bg-white rounded-full animate-pulse" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Profile Details */}
                    <div className="md:col-span-2 text-center md:text-left">
                      <h2 className="text-3xl font-bold text-foreground mb-2">Punit Pal</h2>
                      <p className="text-purple-400 font-semibold text-lg mb-4">Founder & Visionary Leader</p>

                      <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                        <p>
                          Passionate builder and innovator leading the Web3 & AI revolution in India. With a vision to
                          connect elite builders and create groundbreaking technology solutions, Punit founded Builder
                          Base to bridge the gap between ambitious developers and cutting-edge opportunities.
                        </p>
                        <p>
                          His mission is to foster a community where innovation meets execution, empowering 400+ elite
                          builders to shape the future of technology through meaningful projects and collaborative
                          growth.
                        </p>
                      </div>

                      {/* Add email contact section */}
                      <div className="mb-8 p-4 bg-muted/20 rounded-lg border border-border/30">
                        <h4 className="text-foreground font-semibold mb-2 flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                          Direct Contact
                        </h4>
                        <a
                          href="mailto:founder@builderbase.xyz"
                          className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                        >
                          founder@builderbase.xyz
                        </a>
                        <p className="text-muted-foreground text-sm mt-1">
                          For partnerships, collaborations, and business inquiries
                        </p>
                      </div>

                      {/* Achievements */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-2xl font-bold text-purple-400 mb-1">400+</div>
                          <div className="text-sm text-muted-foreground">Community Members</div>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-2xl font-bold text-blue-400 mb-1">Web3 & AI</div>
                          <div className="text-sm text-muted-foreground">Focus Areas</div>
                        </div>
                      </div>

                      {/* Contact & Social Links */}
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <Button
                          className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
                          onClick={() => window.open("https://link3.to/right-almonte", "_blank")}
                        >
                          <ExternalLink className="mr-2 w-4 h-4" />
                          Connect with Founder
                        </Button>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-border text-muted-foreground hover:text-foreground hover:border-purple-400 bg-transparent"
                            onClick={() => window.open("https://x.com/its_punit05", "_blank")}
                          >
                            <Twitter className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-border text-muted-foreground hover:text-foreground hover:border-purple-400 bg-transparent"
                            onClick={() => window.open("https://github.com/ShahiTechnovation", "_blank")}
                          >
                            <Github className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-border text-muted-foreground hover:text-foreground hover:border-purple-400 bg-transparent"
                            onClick={() => window.open("https://www.linkedin.com/in/punit-pal", "_blank")}
                          >
                            <Linkedin className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision & Mission Section */}
            <motion.div
              className="mt-16 grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-card border-border backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Vision</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To create India's most influential Web3 & AI community where elite builders collaborate, innovate,
                    and build the technologies that will define the future of our digital world.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg flex items-center justify-center mr-4">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Mission</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Empowering developers and innovators with the resources, network, and opportunities needed to
                    transform groundbreaking ideas into impactful solutions that solve real-world problems.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Connect?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our community and start building the future with like-minded innovators.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3"
                  onClick={() => window.open("https://link3.to/right-almonte", "_blank")}
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
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
