import * as React from "react"
import { HexColorPicker } from "react-colorful"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  getInputValue,
  hslToRgb,
  oklabToRgb,
  oklchToOklab,
  parseHexString,
  parseHslString,
  parseOklchString,
  parseRgbString,
  rgbToHex,
} from "./utils"

interface ColorPickerProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

function ColorPicker({
  value = "#ffffff",
  onChange,
  disabled = false,
  className,
}: ColorPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [inputType, setInputType] = React.useState<
    "hex" | "rgb" | "hsl" | "oklch"
  >("hex")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()

    if (inputType === "hex") {
      const hex = parseHexString(val)
      if (hex) onChange?.(hex)
      else onChange?.(value)
    } else if (inputType === "rgb") {
      const rgb = parseRgbString(val)
      if (rgb) {
        const hex = rgbToHex(...rgb)
        onChange?.(hex)
      } else {
        onChange?.(value)
      }
    } else if (inputType === "hsl") {
      const hsl = parseHslString(val)
      if (hsl) {
        const rgb = hslToRgb(...hsl)
        const hex = rgbToHex(...rgb)
        onChange?.(hex)
      } else {
        onChange?.(value)
      }
    } else if (inputType === "oklch") {
      const oklch = parseOklchString(val)
      if (oklch) {
        const [L, C, H] = oklch
        const [L_ok, a, b] = oklchToOklab(L, C, H)
        const rgb = oklabToRgb(L_ok, a, b)
        const hex = rgbToHex(...rgb)
        onChange?.(hex)
      } else {
        onChange?.(value)
      }
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "focus-visible:ring-ring relative block h-20 w-full cursor-pointer overflow-hidden rounded-md border focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
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
      <PopoverContent className="z-40 w-[var(--radix-popover-trigger-width)] p-0">
        <div className="flex flex-col gap-4 p-4">
          <HexColorPicker
            color={value}
            onChange={(newColor) => onChange?.(newColor)}
            aria-disabled={disabled}
            className="min-w-full"
          />
          <div className="flex items-center gap-2">
            <Select
              defaultValue={inputType}
              onValueChange={(value) =>
                setInputType(value as "hex" | "rgb" | "hsl" | "oklch")
              }
              disabled={disabled}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select input type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hex">HEX</SelectItem>
                <SelectItem value="rgb">RGB</SelectItem>
                <SelectItem value="hsl">HSL</SelectItem>
                <SelectItem value="oklch">OKLCH</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              value={getInputValue(inputType, value)}
              onChange={handleInputChange}
              disabled={disabled}
              className="w-full uppercase"
              placeholder={
                inputType === "hex"
                  ? "#FFFFFF"
                  : inputType === "rgb"
                    ? "255 255 255"
                    : inputType === "hsl"
                      ? "0.0 0.0% 100.0%"
                      : "1 0 0"
              }
              aria-label="Color input"
              maxLength={inputType === "hex" ? 7 : 20}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

ColorPicker.displayName = "ColorPicker"

export { ColorPicker }
