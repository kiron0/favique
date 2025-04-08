import type { Metadata } from "next"
import { Concert_One } from "next/font/google"
import { Providers } from "@/providers"

import { cn } from "@/lib/utils"

import "@/styles/globals.css"

const concertOne = Concert_One({
  weight: ["400"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Favique - Favicon Generator",
  description: "Generate favicons and manifest files for your website",
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
