import { Banner } from "@/components/banner"
import { WhatIsAFavicon } from "@/components/shared/tutorials/what-is-a-favicon"

export default function Page() {
  return (
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Tutorials"
        description="Learn how to create a favicon for your website, what it is, and why it's important."
      />
      <div className="mx-auto w-full max-w-7xl space-y-20">
        <div className="mx-4 flex-col space-y-12 xl:mx-0">
          <WhatIsAFavicon />
        </div>
      </div>
    </div>
  )
}
