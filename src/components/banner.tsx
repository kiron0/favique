interface BannerProps {
  title: string
  description: string
}

export function Banner({ title, description }: BannerProps) {
  return (
    <div className="bg-primary dark:bg-secondary dark:text-secondary-foreground text-primary-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-8 p-4 xl:p-0">
        <div className="space-y-6 py-2 sm:py-4 md:py-6 lg:py-8 xl:py-10">
          <h1 className="text-lg font-semibold uppercase md:text-xl">
            {title}
          </h1>
          <p className="text-lg font-bold md:text-2xl">{description}</p>
        </div>
      </div>
    </div>
  )
}
