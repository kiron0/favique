"use client"

import Link from "next/link"

import { Banner } from "@/components/banner"

const tutorials = [
  {
    title: "Overview",
    description:
      "What is a favicon, why do I need one, and how can I generate one?",
    items: [
      {
        title: "What is a favicon?",
        link: "/coming-soon",
      },
    ],
  },
  {
    title: "Installation",
    description:
      "After you've generated your favicon you can use the following comprehensive guides to install it on your website.",
    items: [
      {
        title: "How to add a favicon to a website - ICO format",
        link: "/coming-soon",
      },
      {
        title: "How to add a favicon to a website - PNG format",
        link: "/coming-soon",
      },
    ],
  },
]

export function Tutorials() {
  return (
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Tutorials"
        description="Want to learn how to install a favicon on your website? Interested in how the .ico format works? We've created easy, but comprehensive tutorials!"
      />
      <div className="mx-auto w-full max-w-7xl space-y-20">
        <div className="mx-4 flex-col space-y-12 xl:mx-0">
          {tutorials.map((tutorial, i) => (
            <div key={i} className="space-y-4">
              <h2 className="text-xl leading-none font-bold md:text-2xl">
                {tutorial.title}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">
                {tutorial.description}
              </p>
              <ul className="list-disc pl-8">
                {tutorial.items.map((item, j) => (
                  <li key={j} className="text-blue-400">
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
