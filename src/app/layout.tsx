import type { Metadata, Viewport } from "next"
import { Concert_One } from "next/font/google"
import { siteConfig } from "@/config"
import { Providers } from "@/providers"

import { cn } from "@/lib/utils"

import "@/styles/globals.css"

const concertOne = Concert_One({
  weight: ["400"],
  subsets: ["latin"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export function generateMetadata(): Metadata {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")

  return {
    title: {
      default: `${siteConfig.slogan} - ${siteConfig.name}`,
      template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL(BASE_URL),
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [
      {
        name: siteConfig.author.name,
        url: siteConfig.links.portfolio,
      },
    ],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: BASE_URL,
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
    openGraph: {
      type: "website",
      locale: "en_US",
      url: BASE_URL,
      title: siteConfig.name,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: new URL(siteConfig.ogImage, BASE_URL),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [new URL(siteConfig.ogImage, BASE_URL)],
      creator: siteConfig.links.twitter,
      site: siteConfig.links.twitter,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7767850897360933"
          crossOrigin="anonymous"
        />
      </head>
      <body className={cn("antialiased", concertOne.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
