import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { Providers } from "@/providers"

import { cn } from "@/lib/utils"

import "@/styles/globals.css"

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700", "800"],
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
      <body className={cn("antialiased", jetbrainsMono.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
