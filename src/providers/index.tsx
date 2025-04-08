import NextTopLoader from "nextjs-toploader"

import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-svh w-full flex-col overflow-auto">
        {children}
      </main>
      <Footer />
      <Toaster />
      <NextTopLoader showForHashAnchor={false} />
    </>
  )
}
