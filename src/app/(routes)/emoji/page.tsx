import type { Metadata } from "next"

import { Emoji } from "@/components/shared/emoji"

export const metadata: Metadata = {
  title: "Favicon Generator - Emoji to Favicon",
  description:
    "Want to use an emoji for your favicon? Choose from a list of hundreds of emojis to generate a favicon for your website.",
}

export default function Page() {
  return <Emoji />
}
