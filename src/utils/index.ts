export * from "./base-url"
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
