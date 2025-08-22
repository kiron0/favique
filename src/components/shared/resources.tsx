"use client"

import { Route } from "next"
import Link from "next/link"

const resources = [
  {
    title: "What is a favicon?",
    description:
      "What is a favicon, why do I need one, and how can I generate one?",
    link: "/tutorials/what-is-a-favicon",
  },
  {
    title: "Install: favicon.ico",
    description:
      "How to install your favicon.ico file on your website. And how to use it as a shortcut icon.",
    link: "/tutorials/how-to-add-a-favicon-to-a-website-ico-format",
  },
  {
    title: "Install: favicon.png",
    description:
      "How to install your favicon.png file on your website. And how to use it as a shortcut icon.",
    link: "/tutorials/how-to-add-a-favicon-to-a-website-png-format",
  },
  {
    title: "SquareSpace Favicon",
    description:
      "How do I add a custom favicon to my SquareSpace website? And how to use it as a shortcut icon.",
    link: "/tutorials/square-space-favicon",
  },
  {
    title: "Logo Generator",
    description:
      "Generate a logo by configuring the settings below. Download your logo in a variety of layouts and formats.",
    link: "/logos",
  },
]

export function Resources() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold md:text-2xl">Resources</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((item, i) => (
          <Link
            key={i}
            href={item.link as Route}
            className="flex flex-col items-center overflow-hidden rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <div className="flex flex-col justify-center gap-2 p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
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
