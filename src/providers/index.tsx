import NextTopLoader from "nextjs-toploader"

import { Toaster } from "@/components/ui/toaster"

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <main>{children}</main>
      <Toaster />
      <NextTopLoader showForHashAnchor={false} />
    </>
  )
}
