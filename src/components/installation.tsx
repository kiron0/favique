"use client"

import { sizes } from "@/utils"

import { CopyButton } from "./copy-button"
import { ScrollArea } from "./ui/scroll-area"

const links = [
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  { rel: "manifest", href: "/site.webmanifest" },
]

export function Installation() {
  return (
    <div className="mx-3 max-w-2xl flex-col space-y-6 xl:mx-0">
      <h1 className="text-2xl font-bold">Installation</h1>
      <p className="text-muted-foreground">
        First, use the download button to download the files listed below. Place
        the files in the root directory of your website.
      </p>
      <ul className="text-muted-foreground list-disc space-y-2 pl-5">
        {sizes.map((size) => (
          <li key={size.name}>
            <code>{size.name}</code>
          </li>
        ))}
        <li>
          <code>favicon.ico</code>
        </li>
        <li>
          <code>site.webmanifest</code>
        </li>
      </ul>
      <p className="text-muted-foreground">
        Next, copy the following link tags and paste them into the{" "}
        <span className="text-destructive bg-secondary rounded-md px-2 py-1">
          head
        </span>{" "}
        of your HTML.
      </p>
      <ScrollArea className="bg-secondary text-muted-foreground relative rounded-md border p-4 text-sm">
        <div className="absolute top-2 right-2">
          <CopyButton
            content={links
              .map((link) => {
                return `<link ${Object.entries(link)
                  .map(([key, value]) => `${key}="${value}"`)
                  .join(" ")} />`
              })
              .join("")}
          />
        </div>
        {links.map((link) => (
          <code key={link.href} className="block truncate text-sm">
            &lt;link{" "}
            {Object.entries(link).map(([key, value]) => {
              return `${key}="${value}" `
            })}
            /&gt;
          </code>
        ))}
      </ScrollArea>
    </div>
  )
}
