import { Metadata } from "next"

import { NotFound } from "@/components/not-found"

export const metadata: Metadata = {
  title: "404 Page Not Found!",
  description:
    "Oops! The page you are looking for does not exist. Please check the URL or return to the homepage.",
}

export default function Page() {
  return <NotFound />
}
