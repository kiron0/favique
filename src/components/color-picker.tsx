import * as React from "react"
import { HexColorPicker } from "react-colorful"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ColorPickerProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

function ColorPicker({
  value = "#ffffff",
  onChange,
  disabled,
  className,
}: ColorPickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative block h-20 w-full overflow-hidden rounded-md border",
            !disabled && "cursor-pointer",
            "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2",
            disabled && "pointer-events-none cursor-not-allowed opacity-50",
            className
          )}
          style={{ backgroundColor: value }}
          disabled={disabled}
        >
          <span className="absolute inset-0 flex items-center justify-center font-semibold uppercase">
            {value}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="z-40 w-auto p-0">
        <div className="flex flex-col gap-4 p-4">
          <HexColorPicker
            color={value}
            onChange={(newColor) => {
              onChange?.(newColor)
            }}
            aria-disabled={disabled}
            className="min-w-[var(--radix-popover-trigger-width)]"
          />
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className="w-full uppercase"
            placeholder="#ffffff"
            aria-label="Hex color input"
            maxLength={7}
            pattern="#?[0-9A-Fa-f]{6}"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
ColorPicker.displayName = "ColorPicker"

export { ColorPicker }
