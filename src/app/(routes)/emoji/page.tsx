import type { Metadata } from "next"

import { Emoji } from "@/components/emoji"

export const metadata: Metadata = {
  title: "Generate favicon from Emoji",
  description:
    "Want to use an emoji for your favicon? Choose from a list of hundreds of emojis to generate a favicon for your website.",
}

export default function Page() {
  return <Emoji />
}
