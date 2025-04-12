import type { Metadata } from "next"

import { Tutorials } from "@/components/tutorials"

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Want to learn how to install a favicon on your website? Interested in how the .ico format works? We've created easy, but comprehensive tutorials!",
}

export default function Page() {
  return <Tutorials />
}
