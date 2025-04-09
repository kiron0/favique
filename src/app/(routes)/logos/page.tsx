import type { Metadata } from "next"

import { Logos } from "@/components/logos"

export const metadata: Metadata = {
  title: "Logo Generator",
  description:
    "Generate a logo by configuring the settings below. Download your logo in a variety of layouts and formats.",
}

export default function Page() {
  return <Logos />
}
