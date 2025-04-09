import * as React from "react"
import DefaultImg from "@/assets/default.png"
import { getEmojiUrl } from "@/utils"
import { Emoji } from "emojibase"

export function useDefaultEmoji(emoji: Emoji) {
  const [src, setSrc] = React.useState<string | null>(null)

  React.useEffect(() => {
    const imageUrl = getEmojiUrl(emoji, "png")
    const img = new Image()
    img.src = imageUrl

    img.onload = () => {
      setSrc(imageUrl)
    }
    img.onerror = () => {
      setSrc(DefaultImg.src)
    }
    return () => {
      setSrc(null)
    }
  }, [emoji])

  return src || DefaultImg.src
}
