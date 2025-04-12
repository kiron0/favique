"use client"

import Link from "next/link"
import EmojiImg from "@/assets/emoji.png"
import ConverterImg from "@/assets/image.png"
import LogosImg from "@/assets/logos.png"
import GeneratorImg from "@/assets/text.png"

import { Banner } from "@/components/banner"
import { CustomImage } from "@/components/custom-image"

interface MenuItem {
  name: string
  path: string
  img: {
    src: string
    width?: number
    height?: number
    blurDataURL?: string
  }
  description: string
}

const menuItems: MenuItem[] = [
  {
    name: "Image",
    path: "/converter",
    img: ConverterImg,
    description:
      "If you already have an image or logo that you want to use for your favicon then use this tool to convert your image to the proper favicon format.",
  },
  {
    name: "Text",
    path: "/generator",
    img: GeneratorImg,
    description:
      "If you don't have a logo or image for your website and want to generate a favicon from scratch then use this tool to generate your favicon.",
  },
  {
    name: "Emoji",
    path: "/emoji",
    img: EmojiImg,
    description:
      "Want to use an emoji for your favicon? Choose from a list of hundreds of emojis to generate a favicon for your website.",
  },
  {
    name: "Logos",
    path: "/logos",
    img: LogosImg,
    description:
      "Don't have a logo or image for your website and want to generate a favicon from scratch then use this tool to generate your favicon.",
  },
  {
    name: "Tutorials",
    path: "/tutorials",
    img: LogosImg,
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
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-center space-y-6 p-4 xl:p-0">
        <h1 className="text-xl font-bold md:text-2xl">Favicon Generators</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="flex flex-col items-center overflow-hidden rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <CustomImage
                src={item.img.src}
                className="h-36 w-full object-cover md:h-40 lg:h-44"
                width={item.img.width}
                height={item.img.height}
                placeholder="blur"
                blurDataURL={item.img.blurDataURL}
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
    </div>
  )
}
