import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Builder Base - India's Premier Web3 & AI Community",
  description: "Join 400+ elite builders shaping the Web3 & AI revolution. Code the future. Build tomorrow.",
  keywords: ["Web3", "AI", "Blockchain", "Community", "Developers", "India", "Innovation", "Technology"],
  authors: [{ name: "Punit Pal", url: "https://link3.to/XHHCI8L7" }],
  creator: "Builder Base",
  publisher: "Builder Base",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://builderbase.xyz",
    title: "Builder Base - India's Premier Web3 & AI Community",
    description: "Join 400+ elite builders shaping the Web3 & AI revolution. Code the future. Build tomorrow.",
    siteName: "Builder Base",
    images: [
      {
        url: "/images/builder-base-logo.png",
        width: 1200,
        height: 630,
        alt: "Builder Base Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Builder Base - India's Premier Web3 & AI Community",
    description: "Join 400+ elite builders shaping the Web3 & AI revolution. Code the future. Build tomorrow.",
    creator: "@theBuilder_base",
    images: ["/images/builder-base-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
