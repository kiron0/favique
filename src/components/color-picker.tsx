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

interface ColorPickerProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

function hexToRgb(hex: string): [number, number, number] | null {
  const cleanHex = hex.replace(/^#/, "")
  if (cleanHex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(cleanHex)) return null
  const num = parseInt(cleanHex, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  let h = 0,
    s = 0,
    l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)
        break
      case gNorm:
        h = (bNorm - rNorm) / d + 2
        break
      case bNorm:
        h = (rNorm - gNorm) / d + 4
        break
    }
    h /= 6
  }
  return [h, s, l]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r, g, b
  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h / 360 + 1 / 3)
    g = hue2rgb(p, q, h / 360)
    b = hue2rgb(p, q, h / 360 - 1 / 3)
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function hexToRgbString(hex: string): string {
  const rgb = hexToRgb(hex)
  return rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : ""
}

function hexToHslString(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return ""
  const [h, s, l] = rgbToHsl(...rgb)
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

function parseRgbString(rgbStr: string): [number, number, number] | null {
  const match = rgbStr.match(
    /rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i
  )
  if (!match) return null
  const r = parseInt(match[1], 10)
  const g = parseInt(match[2], 10)
  const b = parseInt(match[3], 10)
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return null
  return [r, g, b]
}

function parseHslString(hslStr: string): [number, number, number] | null {
  const match = hslStr.match(
    /hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)/i
  )
  if (!match) return null
  const h = parseInt(match[1], 10) % 360
  const s = parseInt(match[2], 10) / 100
  const l = parseInt(match[3], 10) / 100
  if (s < 0 || s > 1 || l < 0 || l > 1) return null
  return [h, s, l]
}

function ColorPicker({
  value = "#ffffff",
  onChange,
  disabled,
  className,
}: ColorPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [inputType, setInputType] = React.useState<"hex" | "rgb" | "hsl">("hex")

  function getInputValue() {
    if (inputType === "hex") return value
    if (inputType === "rgb") return hexToRgbString(value)
    if (inputType === "hsl") return hexToHslString(value)
    return value
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.trim()
    if (inputType === "hex") {
      onChange?.(val)
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
    }
  }

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
            onChange={(newColor) => onChange?.(newColor)}
            aria-disabled={disabled}
            className="min-w-[var(--radix-popover-trigger-width)]"
          />
          <div className="flex items-center gap-2">
            <Select
              defaultValue={inputType}
              onValueChange={(value) =>
                setInputType(value as "hex" | "rgb" | "hsl")
              }
              disabled={disabled}
            >
              <SelectTrigger className="w-[80px]">
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
              value={getInputValue()}
              onChange={handleInputChange}
              disabled={disabled}
              className="w-full uppercase"
              placeholder={
                inputType === "hex"
                  ? "#ffffff"
                  : inputType === "rgb"
                    ? "rgb(255, 255, 255)"
                    : "hsl(0, 0%, 100%)"
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
