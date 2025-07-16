"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import Image from "next/image"
import {
  Mail,
  MessageCircle,
  Users,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  ExternalLink,
  Send,
  MapPin,
  Clock,
  Globe,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Phone,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Enhanced mobile-first mouse follower
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

// Enhanced mobile background
const MinimalBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
      <div
        className="absolute inset-0 opacity-[0.015] sm:opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />
    </div>
  )
}

// Update the Logo component
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
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              data-interactive
            >
              Partners
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
              className="text-foreground font-medium border-b-2 border-foreground/20"
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
              { href: "/news", label: "News" },
              { href: "/contact", label: "Contact", active: true },
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    contactType: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
            contactType: "general",
          })
        }, 5000)
      } else {
        setError(data.error || "Failed to send message. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Email",
      description: "Get in touch directly",
      contact: "founder@builderbase.xyz",
      action: () => window.open("mailto:founder@builderbase.xyz"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Telegram",
      description: "Join our community chat",
      contact: "@TheBuilderBase",
      action: () => window.open("https://t.me/TheBuilderBase", "_blank"),
      gradient: "from-blue-400 to-blue-600",
    },
    {
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "WhatsApp",
      description: "Connect on WhatsApp",
      contact: "Community Group",
      action: () => window.open("https://chat.whatsapp.com/Iko7hynwsRmAl6PJu86HMJ", "_blank"),
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Community Profile",
      description: "View our Link3 profile",
      contact: "link3.to/XHHCI8L7",
      action: () => window.open("https://link3.to/XHHCI8L7", "_blank"),
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  const socialLinks = [
    {
      icon: <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />,
      name: "Twitter",
      handle: "@theBuilder_base",
      url: "https://x.com/theBuilder_base",
    },
    {
      icon: <Github className="w-4 h-4 sm:w-5 sm:h-5" />,
      name: "GitHub",
      handle: "ShahiTechnovation",
      url: "https://github.com/ShahiTechnovation",
    },
    {
      icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
      name: "LinkedIn",
      handle: "builder-base",
      url: "https://www.linkedin.com/company/builder-base",
    },
    {
      icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />,
      name: "Instagram",
      handle: "@the.builderbase",
      url: "https://www.instagram.com/the.builderbase",
    },
  ]

  const contactTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "partnership", label: "Partnership" },
    { value: "collaboration", label: "Collaboration" },
    { value: "support", label: "Support" },
    { value: "media", label: "Media & Press" },
    { value: "investment", label: "Investment" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <MinimalBackground />
      <MouseFollower />
      <Navigation />

      <div className="relative z-10">
        {/* Enhanced Mobile Header */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20 pt-20 sm:pt-32">
          <motion.div
            className="text-center mb-8 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-4">
              Get in
              <span className="text-muted-foreground"> Touch</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Ready to build the future together? We'd love to hear from you. Choose your preferred way to connect.
            </p>
          </motion.div>

          {/* Enhanced Mobile Layout */}
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Contact Methods - Mobile First */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center lg:text-left">
                  Contact Methods
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                  {contactMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className="bg-card border-border backdrop-blur-sm hover:border-foreground/20 transition-all duration-300 cursor-pointer rounded-xl"
                        onClick={method.action}
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div
                              className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${method.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}
                            >
                              {method.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-foreground font-semibold mb-1 text-sm sm:text-base">
                                {method.title}
                              </h3>
                              <p className="text-muted-foreground text-xs sm:text-sm mb-1 line-clamp-1">
                                {method.description}
                              </p>
                              <p className="text-purple-400 text-xs sm:text-sm font-medium truncate">
                                {method.contact}
                              </p>
                            </div>
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Mobile Founder Contact */}
                <motion.div
                  className="mt-6 sm:mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/30 rounded-xl">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="relative flex-shrink-0">
                          <Image
                            src="/images/founder-avatar.jpg"
                            alt="Punit Pal"
                            width={48}
                            height={48}
                            className="w-12 h-12 sm:w-15 sm:h-15 rounded-full object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-background animate-pulse" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-foreground font-semibold text-sm sm:text-base">Punit Pal</h3>
                          <p className="text-purple-400 text-xs sm:text-sm">Founder & Visionary</p>
                          <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                            Available for partnerships & collaborations
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Enhanced Mobile Office Info */}
                <motion.div
                  className="mt-6 sm:mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <h3 className="text-foreground font-semibold mb-3 sm:mb-4 text-center lg:text-left">
                    Office Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 text-muted-foreground">
                    {[
                      { icon: MapPin, text: "India (Remote-First)" },
                      { icon: Clock, text: "IST (UTC +5:30)" },
                      { icon: Globe, text: "Global Community" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-center lg:justify-start space-x-3">
                        <item.icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Mobile Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="bg-card border-border backdrop-blur-sm rounded-xl">
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 text-center lg:text-left">
                      Send us a Message
                    </h2>

                    {submitted ? (
                      <motion.div
                        className="text-center py-8 sm:py-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                          Thank you for reaching out. We'll get back to you within 24-48 hours.
                        </p>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 sm:p-4 max-w-md mx-auto">
                          <p className="text-green-600 text-xs sm:text-sm">
                            ✅ Your message has been delivered to our team
                            <br />📧 You'll receive a confirmation email shortly
                            <br />🚀 We're excited to connect with you!
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {error && (
                          <motion.div
                            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 sm:p-4 flex items-start space-x-3"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-red-600 text-xs sm:text-sm">{error}</p>
                          </motion.div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                            <Input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="bg-background border-border text-foreground placeholder-muted-foreground focus:border-purple-500 h-11 sm:h-12 rounded-lg"
                              placeholder="Your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="bg-background border-border text-foreground placeholder-muted-foreground focus:border-purple-500 h-11 sm:h-12 rounded-lg"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Contact Type</label>
                          <select
                            name="contactType"
                            value={formData.contactType}
                            onChange={handleInputChange}
                            className="w-full bg-background border border-border text-foreground rounded-lg px-3 py-3 sm:py-3.5 focus:border-purple-500 focus:outline-none text-sm sm:text-base"
                          >
                            {contactTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                          <Input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="bg-background border-border text-foreground placeholder-muted-foreground focus:border-purple-500 h-11 sm:h-12 rounded-lg"
                            placeholder="What's this about?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            rows={5}
                            className="bg-background border-border text-foreground placeholder-muted-foreground focus:border-purple-500 resize-none rounded-lg"
                            placeholder="Tell us more about your inquiry..."
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 h-12 sm:h-14 rounded-lg font-medium text-sm sm:text-base"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Sending Message...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 w-4 h-4" />
                              Send Message
                            </>
                          )}
                        </Button>

                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">
                            By sending this message, you agree to our privacy policy and terms of service.
                          </p>
                        </div>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Mobile Social Media Section */}
          <motion.div
            className="mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-6 sm:mb-8">Follow Us</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-card border-border backdrop-blur-sm hover:border-foreground/20 transition-all duration-300 cursor-pointer rounded-xl"
                    onClick={() => window.open(social.url, "_blank")}
                  >
                    <CardContent className="p-4 sm:p-6 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        {social.icon}
                      </div>
                      <h3 className="text-foreground font-semibold mb-1 text-sm sm:text-base">{social.name}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm truncate">{social.handle}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Mobile FAQ Section */}
          <motion.div
            className="mt-12 sm:mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-6 sm:mb-8">Quick Answers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Response Time",
                  description: "We typically respond to inquiries within 24-48 hours during business days.",
                },
                {
                  title: "Best Contact Method",
                  description: "For urgent matters, use Telegram. For formal inquiries, email works best.",
                },
                {
                  title: "Partnership Inquiries",
                  description:
                    "Send partnership proposals directly to founder@builderbase.xyz with detailed information.",
                },
                {
                  title: "Community Support",
                  description: "Join our Telegram or WhatsApp groups for community support and discussions.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border backdrop-blur-sm rounded-xl h-full">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-foreground font-semibold mb-2 text-sm sm:text-base">{faq.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{faq.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
