"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

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
import { ScrollArea } from "@/components/ui/scroll-area"

import Fonts from "../../public/fonts.json"

interface FontsSelectionProps {
  value: string
  onValueChange: (value: string) => void
}

export function FontsSelection({ value, onValueChange }: FontsSelectionProps) {
  const [open, setOpen] = React.useState<boolean>(false)

  const filteredFonts = React.useMemo(() => {
    return Fonts.map((font) => ({
      family: font.family,
    }))
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value
              ? filteredFonts.find((framework) => framework.family === value)
                  ?.family
              : "Select font family"}
          </span>
          <ChevronDownIcon
            size={16}
            className="text-muted-foreground/80 shrink-0"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search font..." />
          <CommandList>
            <CommandEmpty>No font found.</CommandEmpty>
            <CommandGroup className="px-0">
              <ScrollArea className="h-[300px] w-full px-3">
                {filteredFonts.map((framework) => (
                  <CommandItem
                    key={framework.family}
                    value={framework.family}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue)
                      setOpen(false)
                    }}
                  >
                    {framework.family}
                    {value === framework.family && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
