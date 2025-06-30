import { formatHex, hsl, Hsl, oklch, Oklch, parse, rgb, Rgb } from "culori"

// Convert hex string to RGB tuple
export function hexToRgb(
  hex: string
): [number, number, number, number?] | null {
  const color = parse(hex)
  if (!color || color.mode !== "rgb") return null
  const { r, g, b, alpha } = color as Rgb
  const result: [number, number, number, number?] = [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255),
  ]
  if (alpha !== undefined && alpha < 1) result.push(Math.round(alpha * 255))
  return result
}

// Convert RGB values to HEX string
export function rgbToHex(r: number, g: number, b: number, a?: number): string {
  const color: Rgb =
    a !== undefined
      ? { mode: "rgb", r: r / 255, g: g / 255, b: b / 255, alpha: a / 255 }
      : { mode: "rgb", r: r / 255, g: g / 255, b: b / 255 }
  return formatHex(color).toUpperCase()
}

// Convert RGB values to HSL values
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  const color = hsl({ mode: "rgb", r: r / 255, g: g / 255, b: b / 255 })
  return [color.h ?? 0, color.s ?? 0, color.l ?? 0]
}

// Convert HSL values to RGB
export function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  const color = rgb({ mode: "hsl", h, s, l })
  return [
    Math.round((color.r ?? 0) * 255),
    Math.round((color.g ?? 0) * 255),
    Math.round((color.b ?? 0) * 255),
  ]
}

// Convert hex to "r g b" or "r g b a" string
export function hexToRgbString(hex: string): string | null {
  const color = parse(hex)
  if (!color || color.mode !== "rgb") return null
  const { r, g, b, alpha } = color as Rgb
  const [rr, gg, bb] = [r, g, b].map((v) => Math.round(v * 255))
  return alpha !== undefined && alpha < 1
    ? `${rr} ${gg} ${bb} ${Math.round(alpha * 255)}`
    : `${rr} ${gg} ${bb}`
}

// Convert hex to HSL string
export function hexToHslString(hex: string): string | null {
  const color = parse(hex)
  if (!color || color.mode !== "rgb") return null
  const hslColor = hsl(color as Rgb)
  return `${(hslColor.h ?? 0).toFixed(1)} ${(hslColor.s * 100).toFixed(1)}% ${(hslColor.l * 100).toFixed(1)}%`
}

// Convert hex to OKLCH string
export function hexToOklchString(hex: string): string | null {
  const color = parse(hex)
  if (!color || color.mode !== "rgb") return null
  const oklchColor = oklch(color as Rgb)
  return `${oklchColor.l.toFixed(4)} ${oklchColor.c.toFixed(4)} ${oklchColor?.h?.toFixed(2)}`
}

// Parse HEX string and return formatted HEX
export function parseHexString(hexStr: string): string | null {
  const color = parse(hexStr)
  if (!color || color.mode !== "rgb") return null
  return formatHex(color as Rgb).toUpperCase()
}

// Parse RGB string to tuple
export function parseRgbString(
  rgbStr: string
): [number, number, number, number?] | null {
  const color = parse(rgbStr)
  if (!color || color.mode !== "rgb") return null
  const { r, g, b, alpha } = color as Rgb
  const result: [number, number, number, number?] = [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255),
  ]
  if (alpha !== undefined && alpha < 1) result.push(Math.round(alpha * 255))
  return result
}

// Parse HSL string to tuple
export function parseHslString(
  hslStr: string
): [number, number, number] | null {
  const color = parse(hslStr)
  if (!color || color.mode !== "hsl") return null
  const { h, s, l } = color as Hsl
  return [h ?? 0, s ?? 0, l ?? 0]
}

// Parse OKLCH string to tuple
export function parseOklchString(
  oklchStr: string
): [number, number, number] | null {
  const color = parse(`oklch(${oklchStr})`)
  if (!color || color.mode !== "oklch") return null
  const { l, c, h } = color as Oklch
  return [l ?? 0, c ?? 0, h ?? 0]
}

// Convert OKLCH to Oklab
export function oklchToOklab(
  L: number,
  C: number,
  H: number
): [number, number, number] {
  const hRad = (H * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)
  return [L, a, b]
}

// Convert Oklab to RGB
export function oklabToRgb(
  L: number,
  a: number,
  b: number
): [number, number, number] {
  const oklabColor = { mode: "oklab" as const, l: L, a, b }
  const color = rgb(oklabColor)
  if (!color) return [0, 0, 0]
  return [
    Math.round((color.r ?? 0) * 255),
    Math.round((color.g ?? 0) * 255),
    Math.round((color.b ?? 0) * 255),
  ]
}

// Smart selector for display
export function getInputValue(inputType: string, value: string): string {
  const result = (() => {
    switch (inputType) {
      case "hex":
        return parseHexString(value)
      case "rgb":
        return hexToRgbString(value)
      case "hsl":
        return hexToHslString(value)
      case "oklch":
        return hexToOklchString(value)
      default:
        return null
    }
  })()
  return result || value
}
