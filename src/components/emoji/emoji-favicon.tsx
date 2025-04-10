"use client"

import * as React from "react"
import { getEmojiUrl, imgToFile } from "@/utils"
import { Emoji } from "emojibase"
import { Loader2 } from "lucide-react"

import { useDefaultEmoji } from "@/hooks/use-default-emoji"
import { useFaviconGenerator } from "@/hooks/use-favicon-generator"
import { Button } from "@/components/ui/button"
import { CustomImage } from "@/components/custom-image"
import { notifyError } from "@/components/toast"

interface EmojiFaviconProps {
  emoji: Emoji
}

export function EmojiFavicon({ emoji }: EmojiFaviconProps) {
  const src = useDefaultEmoji(emoji)
  const [isImageValid, setIsImageValid] = React.useState(false)

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  const { generateBundle } = useFaviconGenerator(canvasRef)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGenerate = async () => {
    if (!emoji) {
      return notifyError({
        title: "No emoji selected",
        description: "Please select an emoji to convert.",
      })
    }

    const imageUrl = getEmojiUrl(emoji)
    const img = await imgToFile(imageUrl)

    if (!img) {
      return notifyError({
        title: "Image Load Failed",
        description:
          "The selected image is invalid and has been replaced with a default fallback. Please try a different one.",
      })
    }

    setIsLoading(true)

    try {
      generateBundle({
        canvas: canvasRef.current,
        image: img,
      })
    } catch (error) {
      console.error("Error generating favicon pack:", error)
      notifyError({
        title: "Error generating favicon pack",
        description: "Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    const validateImage = async () => {
      const imageUrl = getEmojiUrl(emoji, "png")
      const img = await imgToFile(imageUrl)
      setIsImageValid(!!img)
    }
    validateImage()
  }, [emoji])

  return (
    <div className="space-y-8">
      <div className="flex w-full items-center justify-center gap-5 py-5">
        <CustomImage
          src={src}
          width={512}
          height={512}
          alt={emoji.emoji}
          className="h-auto w-20 rounded-md"
        />
        <CustomImage
          src={src}
          width={512}
          height={512}
          alt={emoji.emoji}
          className="h-auto w-16 rounded-md"
        />
        <CustomImage
          src={src}
          width={512}
          height={512}
          alt={emoji.emoji}
          className="h-auto w-10 rounded-md"
        />
      </div>
      {!isImageValid && (
        <div className="text-destructive text-center text-sm text-balance">
          The selected emoji is invalid or not found and has been replaced with
          a default fallback. Please try a different one. Thank you for your
          understanding!
        </div>
      )}
      {isImageValid && (
        <div className="flex justify-end">
          <Button disabled={isLoading} onClick={handleGenerate}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Favicon"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
