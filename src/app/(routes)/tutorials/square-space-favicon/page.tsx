import { type Metadata } from "next"

import { Banner } from "@/components/banner"
import { SquareSpace } from "@/components/shared/tutorials/square-space"

export const metadata: Metadata = {
  title: "How to add a favicon to SquareSpace",
  description:
    "Learn how to add a favicon to your SquareSpace website. This tutorial will guide you through the process step by step.",
}

export default function Page() {
  return (
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Tutorials"
        description="Learn how to add a favicon to your SquareSpace website."
      />
      <div className="mx-auto w-full max-w-7xl space-y-20">
        <div className="mx-4 flex-col space-y-12 xl:mx-0">
          <SquareSpace />
        </div>
      </div>
    </div>
  )
}
