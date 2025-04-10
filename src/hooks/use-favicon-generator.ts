import * as React from "react"
import { generateManifest, loadImage, sizes } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  FaviconComposer,
  TextIconGenerator,
  TextIconGeneratorOptions,
} from "favium"
import { saveAs } from "file-saver"
import JSZip from "jszip"
import { useForm, UseFormReturn } from "react-hook-form"

import { textIconFormSchema, TextIconFormSchema } from "@/lib/schema"
import { notifyError } from "@/components/toast"

import Fonts from "../../public/fonts.json"

const DEFAULT_VALUES: TextIconFormSchema = {
  text: "F",
  width: 512,
  height: 512,
  fontFamily: "Leckerli One",
  fontStyle: "normal",
  fontColor: "#ffffff",
  backgroundColor: "#209CEE",
  fontSize: 110,
  fontWeight: "Regular 400 Normal",
  cornerRadius: 15,
  manifest: {
    name: "",
    short_name: "",
  },
}

export function useFaviconGenerator(
  canvasRef: React.RefObject<HTMLCanvasElement | null>
) {
  const [img, setImg] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const form = useForm<TextIconFormSchema>({
    resolver: zodResolver(textIconFormSchema),
    defaultValues: DEFAULT_VALUES,
  }) as UseFormReturn<TextIconFormSchema>

  const selectedFontFamily = form.watch("fontFamily")
  const fontWeight = form.watch("fontWeight")

  const fontVariants = React.useMemo(
    () =>
      Fonts.find((font) => font.family === selectedFontFamily)?.variants || [],
    [selectedFontFamily]
  )

  React.useEffect(() => {
    if (typeof window !== "undefined" && !canvasRef.current) {
      canvasRef.current = document.createElement("canvas")
    }
  }, [])

  const generateFaviconPack = async (
    canvas: HTMLCanvasElement | null,
    manifest?: { name: string; short_name: string }
  ) => {
    if (!canvas) return

    setLoading(true)

    try {
      generateBundle({
        canvas,
        manifest,
      })
    } catch (error) {
      console.error("Error generating favicon pack:", error)
      notifyError({
        title: "Error generating favicon pack",
        description: "Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateBundle = async ({
    canvas,
    image,
    manifest,
  }: {
    canvas: HTMLCanvasElement | null
    image?: File | null
    manifest?: { name: string; short_name: string }
  }) => {
    if (!canvas) return

    const zip = new JSZip()

    if (image) {
      const img = await loadImage(image)

      const targetSize = 512
      const scale = Math.min(targetSize / img.width, targetSize / img.height)

      canvas.width = targetSize
      canvas.height = targetSize

      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Failed to get canvas context")

      const scaledWidth = img.width * scale
      const scaledHeight = img.height * scale
      const offsetX = (canvas.width - scaledWidth) / 2
      const offsetY = (canvas.height - scaledHeight) / 2

      ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight)
    } else {
      const selectedFontWeight = fontVariants.find((v) => v.name === fontWeight)

      const fontInfo = Fonts.find((font) => font.family === selectedFontFamily)
      const fontAuthor = "Unknown"
      const fontSource =
        fontInfo?.variants?.find((v) => v.name === selectedFontWeight?.name)
          ?.url || "Unknown"
      const fontLicense = "Unknown"
      const fontTitle = fontInfo?.family || "Unknown"
      const fontText = `This favicon was generated using the following font:\n\n- Font Title: ${fontTitle}\n- Font Author: ${fontAuthor}\n- Font Source: ${fontSource}\n- Font License: ${fontLicense}`
      zip.file("about.txt", fontText)
    }

    const favicon = new FaviconComposer(canvas)
    const bundle = favicon.bundle()

    sizes.forEach(({ name, size }) => {
      const dataUrl = bundle[`png${size}` as keyof typeof bundle]
      if (!dataUrl) return
      const base64Data = dataUrl.split(",")[1]
      zip.file(name, base64Data, { base64: true })
    })

    const icoBase64 = bundle.ico.split(",")[1]
    const icoBytes = atob(icoBase64)
    const icoArray = new Uint8Array(icoBytes.length)
    for (let i = 0; i < icoBytes.length; i++) {
      icoArray[i] = icoBytes.charCodeAt(i)
    }
    zip.file("favicon.ico", icoArray)

    const manifestJson = generateManifest({
      name: manifest?.name,
      short_name: manifest?.short_name,
    })
    zip.file("site.webmanifest", JSON.stringify(manifestJson, null, 2))

    const readmeText = `# Favicon Pack\n\nThis is a favicon pack generated using Favium.\n\n## How to use\n\n1. Unzip the package.\n2. Upload the favicon files to your website.\n3. Update your HTML to link to the new favicons.\n`

    zip.file("README.txt", readmeText)

    const zipBlob = await zip.generateAsync({ type: "blob" })
    saveAs(zipBlob, `favicon-pack-${manifest?.short_name || Date.now()}.zip`)
  }

  const updateCanvas = React.useCallback(async () => {
    if (typeof window === "undefined" || !canvasRef.current) return

    const data = form.getValues()

    const selectedFont = fontVariants.find((v) => v.name === data.fontWeight)

    if (!selectedFont) {
      console.error("Selected font variant not found")
      return
    }

    const [, weight, style] = selectedFont.name.split(" ")

    const WebFont = (await import("webfontloader")).default

    await new Promise<void>((resolve) => {
      WebFont.load({
        google: { families: [data.fontFamily] },
        active: () => resolve(),
        inactive: () => {
          console.error("Font loading failed")
          resolve()
        },
      })
    })

    const payload: TextIconGeneratorOptions = {
      ...data,
      fontStyle: style.toLowerCase() as "normal" | "italic",
      fontSize: data.fontSize * 4,
      fontWeight: weight,
      cornerRadius: data.cornerRadius * 4,
    }

    const generator = new TextIconGenerator(canvasRef.current)
    const textIcon = generator.generate(payload)
    const url = textIcon.toDataURL()
    setImg(url)
  }, [form, fontVariants])

  React.useEffect(() => {
    if (typeof window !== "undefined" && canvasRef.current) {
      updateCanvas()
      const subscription = form.watch(() => updateCanvas())
      return () => subscription.unsubscribe()
    }
  }, [form, updateCanvas])

  return {
    img,
    loading,
    form,
    fontVariants,
    generateFaviconPack,
    generateBundle,
    canvasRef,
  }
}
