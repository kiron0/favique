import { Emoji } from "emojibase"

export function getEmojiUrl(emoji: Emoji, format = "svg") {
  let url
  let folder = "svg"
  let hex = emoji.hexcode

  let code = hex.toLowerCase()

  if (code.substring(0, 2) == "00") {
    code = code.substring(2)

    const regex = /-fe0f/i
    code = code.replace(regex, "")
  }

  if (code.includes("1f441")) {
    const regex = /-fe0f/gi
    code = code.replace(regex, "")
  }

  if (format == "png") {
    folder = "72x72"
  }

  url = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/${folder}/${code}.${format}`

  return url
}
