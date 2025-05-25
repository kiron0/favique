"use client"

import Image, { ImageProps } from "next/image"

import { cn } from "@/lib/utils"

interface CustomImageProps
  extends Omit<ImageProps, "className" | "draggable" | "onContextMenu"> {
  className?: string
}

function CustomImage({ className, ...props }: CustomImageProps) {
  return (
    <Image
      className={cn("select-none", className)}
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      {...props}
      alt={props.alt || "Custom Image"}
    />
  )
}
CustomImage.displayName = "CustomImage"

export { CustomImage }
