"use client"

import Link from "next/link"
import { MoveLeft } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

export function Generator() {
  return (
    <div className="flex h-full min-h-svh w-full flex-col items-center justify-center space-y-2 text-center">
      <h2 className="text-2xl font-bold">Coming Soon</h2>
      <p className="text-muted-foreground text-balance">
        This feature is currently under development. Stay tuned for updates!
      </p>
      <div className="flex items-center justify-center pt-5">
        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          <MoveLeft className="size-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
