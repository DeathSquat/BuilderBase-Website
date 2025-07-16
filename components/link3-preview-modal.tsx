"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { X, ExternalLink, Users, MessageCircle, Gamepad2, Trophy, ArrowRight, Sparkles } from "lucide-react"

interface Link3PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
}

export const Link3PreviewModal = ({ isOpen, onClose, onContinue }: Link3PreviewModalProps) => {
  const communityLinks = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Founder",
      description: "Connect directly with Punit Pal",
      color: "bg-orange-500",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "WhatsApp Community",
      description: "Join our active community chat",
      color: "bg-green-500",
    },
    {
      icon: <Gamepad2 className="w-5 h-5" />,
      title: "Cyber Jump",
      description: "Gaming and tech discussions",
      color: "bg-blue-500",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      title: "Tricky Cup",
      description: "Challenges and competitions",
      color: "bg-purple-500",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Card className="w-full max-w-2xl bg-background border-border shadow-2xl">
              <CardContent className="p-0">
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-b border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                    onClick={onClose}
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <Image
                        src="/images/builder-base-logo.png"
                        alt="Builder Base Logo"
                        width={60}
                        height={60}
                        className="w-15 h-15 object-contain rounded-xl"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">The Builder Base</h2>
                      <p className="text-muted-foreground text-sm">
                        Web3 | Crypto | Hackathons | Internships | Dev Collabs
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Welcome to The Builder Base - where ideas meet execution. Join our comprehensive community hub with
                    multiple ways to connect and collaborate.
                  </p>

                  <div className="flex items-center justify-center mt-4">
                    <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Builder + Beginner = Community ❤️
                    </Badge>
                  </div>
                </div>

                {/* Community Links Preview */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-purple-400" />
                    Community Access Points
                  </h3>

                  <div className="grid gap-3 mb-6">
                    {communityLinks.map((link, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div
                          className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center text-white`}
                        >
                          {link.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{link.title}</h4>
                          <p className="text-sm text-muted-foreground">{link.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-foreground mb-2">What you'll find on Link3:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Direct access to all community platforms</li>
                      <li>• Founder contact and social links</li>
                      <li>• Latest updates and announcements</li>
                      <li>• Exclusive community features and tools</li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={onContinue}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Continue to Link3 Hub
                    </Button>
                    <Button variant="outline" onClick={onClose} className="flex-1">
                      Maybe Later
                    </Button>
                  </div>

                  {/* Footer Note */}
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Link3 is a Web3 social platform that hosts our community hub
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Hook for using the Link3 preview modal
export const useLink3Preview = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openPreview = () => setIsOpen(true)
  const closePreview = () => setIsOpen(false)

  const handleContinue = () => {
    setIsOpen(false)
    window.open("https://link3.to/XHHCI8L7", "_blank")
  }

  return {
    isOpen,
    openPreview,
    closePreview,
    handleContinue,
  }
}
