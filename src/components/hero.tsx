interface HeroProps {
  title: string
  description: string
}

export function Hero({ title, description }: HeroProps) {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 p-4 xl:p-0">
        <div className="space-y-6 py-4 md:py-12">
          <h1 className="text-base uppercase md:text-lg">{title}</h1>
          <p className="text-lg font-bold md:text-2xl">{description}</p>
        </div>
      </div>
    </div>
  )
}
