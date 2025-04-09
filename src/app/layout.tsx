import type { Metadata } from "next"
import { Concert_One } from "next/font/google"
import { siteConfig } from "@/config"
import { Providers } from "@/providers"

import { cn } from "@/lib/utils"

import "@/styles/globals.css"

import { getBaseURL } from "@/utils"

const concertOne = Concert_One({
  weight: ["400"],
  subsets: ["latin"],
})

export async function generateMetadata(): Promise<Metadata> {
  const BASE_URL = await getBaseURL()

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
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
      images: [new URL(siteConfig.ogImage, BASE_URL)],
      creator: siteConfig.links.twitter,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${BASE_URL}/site.webmanifest`,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", concertOne.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
