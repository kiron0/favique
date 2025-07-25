import NextTopLoader from "nextjs-toploader"

import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/shared/footer"
import { Navbar } from "@/components/shared/navbar"

import { ThemeProvider } from "./theme-provider"

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <Navbar />
      <main className="flex min-h-svh w-full flex-col overflow-auto">
        {children}
      </main>
      <Footer />
      <Toaster />
      <NextTopLoader showForHashAnchor={false} />
    </ThemeProvider>
  )
}
