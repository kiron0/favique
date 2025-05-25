function hexToRgb(hex: string): [number, number, number] | null {
  const cleanHex = hex.replace(/^#/, "")
  if (cleanHex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(cleanHex)) return null
  const num = parseInt(cleanHex, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  let h = 0,
    s = 0
  const l = (max + min) / 2
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

export function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
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

export function oklabToRgb(
  L: number,
  a: number,
  b: number
): [number, number, number] {
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

export function oklchToOklab(
  L: number,
  C: number,
  H: number
): [number, number, number] {
  const hRad = (H * Math.PI) / 180
  return [L, C * Math.cos(hRad), C * Math.sin(hRad)]
}

function hexToRgbString(hex: string): string {
  const rgb = hexToRgb(hex)
  return rgb ? `${rgb[0]} ${rgb[1]} ${rgb[2]}` : ""
}

function hexToHslString(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return ""
  const [h, s, l] = rgbToHsl(...rgb)
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`
}

function hexToOklchString(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return ""
  const [L, a, b] = rgbToOklab(...rgb)
  const [L_ok, C, H] = oklabToOklch(L, a, b)
  return `${L_ok.toFixed(3)} ${C.toFixed(3)} ${Math.round(H)}`
}

export function parseHexString(hexStr: string): string | null {
  if (!/^#[0-9a-fA-F]{6}$/.test(hexStr)) return null
  return hexStr.toUpperCase()
}

export function parseRgbString(
  rgbStr: string
): [number, number, number] | null {
  const match = rgbStr.match(/^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})$/)
  if (!match) return null
  const r = parseInt(match[1], 10)
  const g = parseInt(match[2], 10)
  const b = parseInt(match[3], 10)
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return null
  return [r, g, b]
}

export function parseHslString(
  hslStr: string
): [number, number, number] | null {
  const match = hslStr.match(/^(\d*\.?\d+)\s+(\d*\.?\d+)%\s+(\d*\.?\d+)%$/)
  if (!match) return null
  const h = parseFloat(match[1]) % 360
  const s = parseFloat(match[2]) / 100
  const l = parseFloat(match[3]) / 100
  if (h < 0 || h > 360 || s < 0 || s > 1 || l < 0 || l > 1) return null
  return [h, s, l]
}

export function parseOklchString(
  oklchStr: string
): [number, number, number] | null {
  const match = oklchStr.match(/^(\d*\.?\d+)\s+(\d*\.?\d+)\s+(\d{1,3})$/)
  if (!match) return null
  const L = parseFloat(match[1])
  const C = parseFloat(match[2])
  const H = parseInt(match[3], 10) % 360
  if (L < 0 || L > 1 || C < 0 || C > 0.4 || H < 0 || H > 360) return null
  return [L, C, H]
}

export function getInputValue(inputType: string, value: string): string {
  if (inputType === "hex") return value
  if (inputType === "rgb") return hexToRgbString(value)
  if (inputType === "hsl") return hexToHslString(value)
  if (inputType === "oklch") return hexToOklchString(value)
  return value
}
