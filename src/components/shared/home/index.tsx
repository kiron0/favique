"use client"

import { Route } from "next"
import Link from "next/link"

import { Banner } from "@/components/banner"
import { CustomImage } from "@/components/custom-image"
import { Resources } from "@/components/shared/resources"

interface MenuItem {
  name: string
  path: string
  img: string
  description: string
}

const menuItems: MenuItem[] = [
  {
    name: "Image",
    path: "/converter",
    img: "assets/image.png",
    description:
      "If you already have an image or logo that you want to use for your favicon then use this tool to convert your image to the proper favicon format.",
  },
  {
    name: "Text",
    path: "/generator",
    img: "assets/text.png",
    description:
      "If you don't have a logo or image for your website and want to generate a favicon from scratch then use this tool to generate your favicon.",
  },
  {
    name: "Emoji",
    path: "/emoji",
    img: "assets/emoji.png",
    description:
      "Want to use an emoji for your favicon? Choose from a list of hundreds of emojis to generate a favicon for your website.",
  },
  {
    name: "Logos",
    path: "/logos",
    img: "assets/logos.png",
    description:
      "Don't have a logo or image for your website and want to generate a favicon from scratch then use this tool to generate your favicon.",
  },
  {
    name: "Tutorials",
    path: "/tutorials",
    img: "assets/tutorials.png",
    description:
      "Want to learn how to install a favicon on your website? Interested in how the .ico format works? We've created easy, but comprehensive tutorials!",
  },
]

export function Home() {
  return (
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Favicon Generator"
        description="The only favicon generator you need for your next project. Quickly generate your favicon from text, image, or choose from hundreds of emojis."
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-center space-y-20 p-4 xl:p-0">
        <div className="space-y-6">
          <h1 className="text-xl font-bold md:text-2xl">Favicon Generators</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path as Route}
                className="flex flex-col items-center overflow-hidden rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <CustomImage
                  src={item.img}
                  className="h-36 w-full object-cover md:h-40 lg:h-44"
                  width={1920}
                  height={1080}
                  placeholder="blur"
                  blurDataURL={item.img}
                  alt={item.name}
                />
                <div className="flex flex-col justify-center gap-2 p-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Resources />
      </div>
    </div>
  )
}
