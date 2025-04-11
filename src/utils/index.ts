export * from "./base-url"
export * from "./get-emoji-url"
export * from "./img-to-url"
export * from "./load-fonts"
export * from "./manifest"
export * from "./menu"
export * from "./sizes"

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const SUPPORTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
  "image/svg",
  "image/webp",
  "image/gif",
]

export const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

export const roundnessOptions = [
  { value: "square", label: "Square" },
  { value: "circle", label: "Circle" },
  { value: "rounded", label: "Rounded" },
]

export const calculateSizes = (
  ctx: CanvasRenderingContext2D,
  data: {
    bannerText: string
    fontFamily: string
  },
  width: number,
  height: number,
  paddingBetween: number,
  style: string,
  weight: string
): { fontSize: number; logoRadius: number } => {
  const minPadding = 80
  const minRadius = 20
  const maxRadius = height * 0.3

  let fontSize = maxRadius
  let textWidth: number
  let logoRadius: number

  do {
    ctx.font = `${style} ${weight} ${fontSize}px ${data.fontFamily}`
    textWidth = ctx.measureText(data.bannerText).width
    logoRadius = fontSize
    const totalWidth = 2 * logoRadius + paddingBetween + textWidth
    if (totalWidth <= width - 2 * minPadding) {
      break
    }
    fontSize -= 1
  } while (fontSize >= minRadius)

  return {
    fontSize,
    logoRadius: Math.max(minRadius, logoRadius),
  }
}

export const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  ctx.beginPath()
  if (radius === 0) {
    ctx.rect(x, y, width, height)
  } else {
    ctx.moveTo(x + radius, y)
    ctx.arcTo(x + width, y, x + width, y + height, radius)
    ctx.arcTo(x + width, y + height, x, y + height, radius)
    ctx.arcTo(x, y + height, x, y, radius)
    ctx.arcTo(x, y, x + width, y, radius)
  }
  ctx.closePath()
}
