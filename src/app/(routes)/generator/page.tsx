import type { Metadata } from "next"

import { Generator } from "@/components/generator"

export const metadata: Metadata = {
  title: "Favicon Generator - Text to Favicon",
  description:
    "Quickly generate your favicon from text by selecting the text, fonts, and colors. Download your favicon in the most up-to-date formats.",
}

export default function Page() {
  return <Generator />
}
