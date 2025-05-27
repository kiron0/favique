import type { Metadata } from "next"

import { PrivacyPolicy } from "@/components/shared/privacy-policy"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "This Privacy Policy explains how we collect, use, and protect your information when you use our website. We are committed to safeguarding your privacy and ensuring that your personal information is handled responsibly.",
}

export default function Page() {
  return <PrivacyPolicy />
}
