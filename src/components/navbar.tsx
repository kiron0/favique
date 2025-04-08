"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

export function Navbar() {
  const [open, setOpen] = React.useState(false)

  const { logo, menu, extra } = menuItems

  return (
    <div className="bg-background sticky top-0 z-[99] mx-auto w-full border-b">
      <div className="mx-auto w-full max-w-7xl p-4 xl:px-0">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
              <div className="relative flex max-w-max flex-1 items-center justify-center">
                <div className="group flex flex-1 list-none items-center justify-center gap-1">
                  {menu.map((item) =>
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
            <Link
              href={extra.author.url}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              {extra.author.title}
            </Link>
            <Link
              href={extra.coffee.url}
              className={buttonVariants({ size: "sm" })}
            >
              {extra.coffee.title}
            </Link>
          </div>
        </nav>
        <div className="lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-11/12 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8" alt={logo.alt} />
                      <span className="text-lg font-semibold tracking-tighter">
                        {logo.title}
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
                      {menu.map((item) =>
                        renderMenuItem({
                          item,
                          setOpen,
                        })
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <a
                      href={extra.author.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      {extra.author.title}
                    </a>
                    <a
                      href={extra.coffee.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className={buttonVariants()}
                    >
                      {extra.coffee.title}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
