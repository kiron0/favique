"use client"

import Image from "next/image"
import Link from "next/link"
import ConverterImg from "@/assets/image.png"
import GeneratorImg from "@/assets/text.png"

const menuItems = [
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
]

export function Home() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center p-4 xl:p-0">
      <h1 className="my-8 text-center text-2xl font-bold md:text-3xl">
        Favicon Generator
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="ring-primary flex flex-col items-center overflow-hidden rounded-xl shadow-sm ring transition-shadow duration-300 hover:shadow-lg"
          >
            <Image
              src={item.img.src}
              className="h-48 w-full object-cover select-none"
              width={item.img.width}
              height={item.img.height}
              alt={item.name}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
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
  )
}
