import type { Metadata } from "next"

import { Converter } from "@/components/converter"

export const metadata: Metadata = {
  title: "Generate favicon from an image",
  description:
    "Quickly generate your favicon from an image by uploading your image below. Download your favicon in the most up to date formats.",
}

export default function Page() {
  return <Converter />
}
