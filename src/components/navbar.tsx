"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config"
import { MenuItem, menuItems } from "@/utils"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { ToggleTheme } from "./toggle-theme"

export function Navbar() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="bg-background sticky top-0 z-50 mx-auto w-full border-b">
      <div className="mx-auto w-full max-w-7xl p-4 xl:px-0">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={siteConfig.logo}
                width={512}
                height={512}
                className="h-8 w-8 select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                alt={siteConfig.name}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {siteConfig.name}
              </span>
            </Link>
            <div className="flex items-center">
              <div className="relative flex max-w-max flex-1 items-center justify-center">
                <div className="group flex flex-1 list-none items-center justify-center gap-1">
                  {menuItems.map((item) =>
                    renderMenuItem({
                      item,
                      setOpen,
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={siteConfig.links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Author
            </a>
            <a
              href="https://buymeacoffee.com/_thk"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "sm" })}
            >
              Buy me a coffee
            </a>
            <ToggleTheme />
          </div>
        </nav>
        <div className="lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={siteConfig.logo}
                width={512}
                height={512}
                className="h-8 w-8 select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                alt={siteConfig.name}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {siteConfig.name}
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <ToggleTheme />
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="z-[56] w-11/12 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href="/" className="flex items-center gap-2">
                        <Image
                          src={siteConfig.logo}
                          width={512}
                          height={512}
                          className="h-8 w-8 select-none"
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          alt={siteConfig.name}
                        />
                        <span className="text-lg font-semibold tracking-tighter">
                          {siteConfig.name}
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <div
                      data-slot="navigation-menu"
                      className="group/navigation-menu relative flex max-w-max flex-1 items-center justify-center"
                    >
                      <div className="group flex flex-1 list-none flex-col items-start justify-center gap-2">
                        {menuItems.map((item) =>
                          renderMenuItem({
                            item,
                            setOpen,
                          })
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <a
                        href={siteConfig.links.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className={buttonVariants({ variant: "outline" })}
                      >
                        Author
                      </a>
                      <a
                        href="https://buymeacoffee.com/_thk"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className={buttonVariants()}
                      >
                        Buy me a coffee
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const renderMenuItem = ({
  item,
  setOpen,
}: {
  item: MenuItem
  setOpen: (open: boolean) => void
}) => {
  const pathname = usePathname()
  const isActive = (url: string) => {
    return pathname === url
  }

  return (
    <div key={item.title} className="relative">
      <Link
        onClick={() => setOpen(false)}
        href={item.url}
        className={cn(
          "hover:bg-muted/80 hover:text-accent-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
          isActive(item.url) ? "underline decoration-2 underline-offset-6" : ""
        )}
      >
        {item.title}
      </Link>
    </div>
  )
}
