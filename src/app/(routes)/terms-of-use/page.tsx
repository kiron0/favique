import type { Metadata } from "next"

import { TermsOfUse } from "@/components/shared/terms-of-use"

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "These Terms of Use govern your use of our website and services. By accessing or using our website, you agree to comply with these terms. If you do not agree with any part of these terms, you must not use our website.",
}

export default function Page() {
  return <TermsOfUse />
}
