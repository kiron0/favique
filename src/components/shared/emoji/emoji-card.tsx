"use client"

import { Emoji } from "emojibase"

import { useDefaultEmoji } from "@/hooks/use-default-emoji"
import { CustomImage } from "@/components/custom-image"

interface EmojiCardProps {
  emoji: Emoji
}

export function EmojiCard({ emoji }: EmojiCardProps) {
  const src = useDefaultEmoji(emoji)

  return (
    <div className="flex cursor-pointer items-center justify-center rounded-md border p-2">
      <CustomImage
        src={src}
        height={512}
        width={512}
        alt={emoji.emoji}
        className="h-auto w-10 rounded-md"
      />
    </div>
  )
}
