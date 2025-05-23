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

function rgbToOklab(r: number, g: number, b: number): [number, number, number] {
  const rLin = r / 255
  const gLin = g / 255
  const bLin = b / 255
  const l = Math.cbrt(
    0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin
  )
  const m = Math.cbrt(
    0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin
  )
  const s = Math.cbrt(
    0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin
  )
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const b_ = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s
  return [L, a, b_]
}

function oklabToRgb(L: number, a: number, b: number): [number, number, number] {
  const l = L + 0.3963377774 * a + 0.2158037573 * b
  const m = L - 0.1055613458 * a - 0.0638541728 * b
  const s = L - 0.0894841775 * a - 1.291485548 * b
  const l3 = l * l * l
  const m3 = m * m * m
  const s3 = s * s * s
  const r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  const b_ = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3
  return [
    Math.max(0, Math.min(255, Math.round(r * 255))),
    Math.max(0, Math.min(255, Math.round(g * 255))),
    Math.max(0, Math.min(255, Math.round(b_ * 255))),
  ]
}

function oklabToOklch(
  L: number,
  a: number,
  b: number
): [number, number, number] {
  const C = Math.sqrt(a * a + b * b)
  let H = (Math.atan2(b, a) * 180) / Math.PI
  if (H < 0) H += 360
  return [L, C, H]
}

function oklchToOklab(
  L: number,
  C: number,
  H: number
): [number, number, number] {
  const hRad = (H * Math.PI) / 180
  return [L, C * Math.cos(hRad), C * Math.sin(hRad)]
}

function hexToHexString(hex: string): string {
  return hex.replace(/^#/, "").toUpperCase()
}

function hexToRgbString(hex: string): string {
  const rgb = hexToRgb(hex)
  return rgb ? `${rgb[0]} ${rgb[1]} ${rgb[2]}` : ""
}

function hexToHslString(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return ""
  const [h, s, l] = rgbToHsl(...rgb)
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

function hexToOklchString(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return ""
  const [L, a, b] = rgbToOklab(...rgb)
  const [L_ok, C, H] = oklabToOklch(L, a, b)
  return `${L_ok.toFixed(3)} ${C.toFixed(3)} ${Math.round(H)}`
}

function parseHexString(hexStr: string): string | null {
  if (!/^[0-9a-fA-F]{6}$/.test(hexStr)) return null
  return `#${hexStr.toUpperCase()}`
}

function parseRgbString(rgbStr: string): [number, number, number] | null {
  const match = rgbStr.match(/^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})$/)
  if (!match) return null
  const r = parseInt(match[1], 10)
  const g = parseInt(match[2], 10)
  const b = parseInt(match[3], 10)
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return null
  return [r, g, b]
}

function parseHslString(hslStr: string): [number, number, number] | null {
  const match = hslStr.match(/^(\d{1,3})\s+(\d{1,3})%\s+(\d{1,3})%$/)
  if (!match) return null
  const h = parseInt(match[1], 10) % 360
  const s = parseInt(match[2], 10) / 100
  const l = parseInt(match[3], 10) / 100
  if (s < 0 || s > 1 || l < 0 || l > 1) return null
  return [h, s, l]
}

function parseOklchString(oklchStr: string): [number, number, number] | null {
  const match = oklchStr.match(/^(\d*\.?\d+)\s+(\d*\.?\d+)\s+(\d{1,3})$/)
  if (!match) return null
  const L = parseFloat(match[1])
  const C = parseFloat(match[2])
  const H = parseInt(match[3], 10) % 360
  if (L < 0 || L > 1 || C < 0 || C > 0.4 || H < 0 || H > 360) return null
  return [L, C, H]
}

function ColorPicker({
  value = "#FFFFFF",
  onChange,
  disabled,
  className,
}: ColorPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [inputType, setInputType] = React.useState<
    "hex" | "rgb" | "hsl" | "oklch"
  >("hex")

  function getInputValue() {
    if (inputType === "hex") return hexToHexString(value)
    if (inputType === "rgb") return hexToRgbString(value)
    if (inputType === "hsl") return hexToHslString(value)
    if (inputType === "oklch") return hexToOklchString(value)
    return value
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
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
                setInputType(value as "hex" | "rgb" | "hsl" | "oklch")
              }
              disabled={disabled}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select input type" />{" "}
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
                  ? "FFFFFF"
                  : inputType === "rgb"
                    ? "255 255 255"
                    : inputType === "hsl"
                      ? "0 0% 100%"
                      : "1 0 0"
              }
              aria-label="Color input"
              maxLength={inputType === "hex" ? 6 : 20}
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
