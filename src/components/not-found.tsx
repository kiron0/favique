"use client"

import Link from "next/link"
import { MoveLeft } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

export function NotFound() {
  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-8 text-center">
      <div className="space-y-1 text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground text-lg text-balance">
          Oops! The page you are looking for does not exist.
        </p>
      </div>
      <Link href="/" className={buttonVariants()}>
        <MoveLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  )
}
