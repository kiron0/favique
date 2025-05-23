"use client"

import { Banner } from "./banner"

export function ComingSoon() {
  return (
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Coming Soon"
        description="This page is coming soon. Please check back later. We are working hard to bring you the best experience possible. Thank you for your patience!"
      />
      <div className="mx-auto w-full max-w-7xl space-y-20">
        <div className="mx-4 flex-col space-y-12 xl:mx-0">
          <div className="space-y-4">
            <h2 className="text-xl leading-none font-bold md:text-2xl">
              On the way...
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}
