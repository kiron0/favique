export * from "./generate-ico"
export * from "./manifest"
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

export const resizeImage = (
  img: HTMLImageElement,
  size: number
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")!
    ctx.drawImage(img, 0, 0, size, size)
    canvas.toBlob((blob) => resolve(blob!), "image/png")
  })
}
