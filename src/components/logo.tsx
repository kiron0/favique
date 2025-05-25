"use client"

import Link from "next/link"
import { siteConfig } from "@/config"

import { cn } from "@/lib/utils"
import { CustomImage } from "@/components/custom-image"

interface LogoProps {
  href?: string
  className?: string
}

function Logo({ href, className }: LogoProps) {
  const content = (
    <>
      <CustomImage
        src={siteConfig.logo}
        width={512}
        height={512}
        alt={siteConfig.name}
        priority
        className="w-6 rounded-sm object-cover md:w-7"
      />
      <span className="text-xl font-semibold md:text-2xl">
        {siteConfig.name}
      </span>
    </>
  )

  return href ? (
    <Link href={href} className={cn("flex items-center gap-2", className)}>
      {content}
    </Link>
  ) : (
    <div className={cn("flex items-center gap-2", className)}>{content}</div>
  )
}
Logo.displayName = "Logo"

export { Logo }
