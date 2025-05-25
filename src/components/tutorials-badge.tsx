"use client"

import * as React from "react"

interface TutorialsBadgeProps {
  children?: React.ReactNode
}

export function TutorialsBadge({ children }: TutorialsBadgeProps) {
  return (
    <span className="text-destructive bg-secondary mx-1 rounded px-2 py-1">
      {children}
    </span>
  )
}
