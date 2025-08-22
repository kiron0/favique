import * as React from "react"
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
      setSrc("/assets/default.png")
    }
    return () => {
      setSrc(null)
    }
  }, [emoji])

  return src || "/assets/default.png"
}
