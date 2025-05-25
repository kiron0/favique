"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { useDebounce } from "use-debounce"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import ALL_FONTS from "../../public/fonts.json"

interface Font {
  family: string
}

interface FontsSelectionProps {
  value: string
  onValueChange: (value: string) => void
}

const PAGE_SIZE = 50

export function FontsSelection({ value, onValueChange }: FontsSelectionProps) {
  const [open, setOpen] = React.useState(false)
  const [loadedCount, setLoadedCount] = React.useState(PAGE_SIZE)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [debouncedQuery] = useDebounce(searchQuery, 300)
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)

  const filteredFonts = React.useMemo(() => {
    if (!debouncedQuery) return ALL_FONTS
    return ALL_FONTS.filter((font) =>
      font.family.toLowerCase().includes(debouncedQuery.toLowerCase())
    )
  }, [debouncedQuery])

  const visibleFonts = React.useMemo(() => {
    return filteredFonts.slice(0, loadedCount)
  }, [filteredFonts, loadedCount])

  const loadMore = React.useCallback(() => {
    setLoadedCount((prev) => Math.min(prev + PAGE_SIZE, filteredFonts.length))
  }, [filteredFonts.length])

  React.useEffect(() => {
    setLoadedCount(PAGE_SIZE)
  }, [debouncedQuery])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadedCount < filteredFonts.length) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    )

    const currentSentinel = sentinelRef.current
    if (currentSentinel) {
      observer.observe(currentSentinel)
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel)
      }
      observer.disconnect()
    }
  }, [loadMore, filteredFonts.length, loadedCount])

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) {
          setLoadedCount(PAGE_SIZE)
          setSearchQuery("")
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value || "Select font family"}
          </span>
          <ChevronDownIcon
            size={16}
            className="text-muted-foreground/80 shrink-0"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-input !z-10 w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search from ${ALL_FONTS.length} fonts...`}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No font found.</CommandEmpty>
            <CommandGroup>
              {visibleFonts.map((font) => (
                <CommandItem
                  key={font.family}
                  value={font.family}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue)
                    setOpen(false)
                    setLoadedCount(PAGE_SIZE)
                    setSearchQuery("")
                  }}
                >
                  {font.family}
                  {value === font.family && (
                    <CheckIcon size={16} className="ml-auto" />
                  )}
                </CommandItem>
              ))}
              {loadedCount < filteredFonts.length && (
                <div ref={sentinelRef} key={`sentinel-${loadedCount}`} />
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
