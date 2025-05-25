import type { Metadata } from "next"

import { Logos } from "@/components/shared/logos"

export const metadata: Metadata = {
  title: "The best Logo Generator (completely free)",
  description:
    "Generate a logo by configuring the settings below. Download your logo in a variety of layouts and formats.",
}

export default function Page() {
  return <Logos />
}
