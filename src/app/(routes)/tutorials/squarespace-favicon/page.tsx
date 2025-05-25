import { Banner } from "@/components/banner"
import { Squarespace } from "@/components/shared/tutorials/squarespace"

export default function Page() {
  return (
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Tutorials"
        description="Learn how to add a favicon to your Squarespace website."
      />
      <div className="mx-auto w-full max-w-7xl space-y-20">
        <div className="mx-4 flex-col space-y-12 xl:mx-0">
          <Squarespace />
        </div>
      </div>
    </div>
  )
}
