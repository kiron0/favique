"use client"

import { Banner } from "@/components/banner"

export function Tutorials() {
  return (
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Tutorials"
        description="Want to learn how to install a favicon on your website? Interested in how the .ico format works? We've created easy, but comprehensive tutorials!"
      />
      <div className="mx-auto w-full max-w-7xl space-y-20">
        <div className="mx-4 flex-col space-y-8 xl:mx-0">
          <p>On the way..!</p>
        </div>
      </div>
    </div>
  )
}
