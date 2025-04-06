"use client"

import * as React from "react"
import ImageView from "next/image"
import { saveAs } from "file-saver"
import JSZip from "jszip"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

async function generateIco(pngBlobs: Blob[]): Promise<Blob> {
  const headerSize = 6
  const entrySize = 16
  const header = new Uint8Array(headerSize)
  header.set([0, 0, 1, 0])
  const entries: Uint8Array[] = []
  const imageData: Uint8Array[] = []

  let offset = headerSize + entrySize * pngBlobs.length

  for (const blob of pngBlobs) {
    const buffer = await blob.arrayBuffer()
    const data = new Uint8Array(buffer)

    // ICO directory entry: width, height, colors, reserved, planes, bitCount, size, offset
    const width = blob.type === "image/png" ? 32 : 16 // Assuming 16x16 or 32x32
    const height = width
    const entry = new Uint8Array(entrySize)
    entry.set([
      width & 0xff, // Width (0 = 256)
      height & 0xff, // Height (0 = 256)
      0, // Color count (0 = >256)
      0, // Reserved
      1,
      0, // Color planes (1)
      32,
      0, // Bits per pixel (32)
    ])
    entry.set(new Uint8Array(new Uint32Array([data.length]).buffer), 8) // Size of image data
    entry.set(new Uint8Array(new Uint32Array([offset]).buffer), 12) // Offset of image data

    entries.push(entry)
    imageData.push(data)
    offset += data.length
  }

  // Set idCount in header
  header.set(new Uint8Array(new Uint16Array([pngBlobs.length]).buffer), 4)

  // Combine all parts into a single buffer
  const totalSize =
    headerSize +
    entrySize * entries.length +
    imageData.reduce((sum, d) => sum + d.length, 0)
  const icoBuffer = new Uint8Array(totalSize)
  let currentOffset = 0

  icoBuffer.set(header, currentOffset)
  currentOffset += headerSize

  for (const entry of entries) {
    icoBuffer.set(entry, currentOffset)
    currentOffset += entrySize
  }

  for (const data of imageData) {
    icoBuffer.set(data, currentOffset)
    currentOffset += data.length
  }

  return new Blob([icoBuffer], { type: "image/x-icon" })
}

export function Converter() {
  const [file, setFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [dragActive, setDragActive] = React.useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile)
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(droppedFile)
    }
  }

  const handleDrag = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    } else if (e.type === "drop") {
      setDragActive(false)
    }
  }, [])

  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  const resizeImage = (img: HTMLImageElement, size: number): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, size, size)
      canvas.toBlob((blob) => resolve(blob!), "image/png")
    })
  }

  // Generate and download favicons
  const handleGenerate = async () => {
    if (!file) return
    setLoading(true)

    try {
      const zip = new JSZip()
      const img = await loadImage(file)

      // Define favicon sizes and names
      const sizes = [
        { name: "android-chrome-192x192.png", size: 192 },
        { name: "android-chrome-512x512.png", size: 512 },
        { name: "apple-touch-icon.png", size: 180 },
        { name: "favicon-16x16.png", size: 16 },
        { name: "favicon-32x32.png", size: 32 },
      ]

      const pngBlobs: { [key: number]: Blob } = {}

      // Generate resized PNGs
      for (const { name, size } of sizes) {
        const blob = await resizeImage(img, size)
        zip.file(name, blob)
        if (size === 16 || size === 32) {
          pngBlobs[size] = blob
        }
      }

      // Generate favicon.ico
      const icoBlob = await generateIco([pngBlobs[16], pngBlobs[32]])
      zip.file("favicon.ico", icoBlob)

      // Create site.webmanifest
      const manifest = {
        name: "",
        short_name: "",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      }
      zip.file("site.webmanifest", JSON.stringify(manifest, null, 2))

      // Generate and download zip
      const zipBlob = await zip.generateAsync({ type: "blob" })
      saveAs(zipBlob, "favicons.zip")
    } catch (error) {
      console.error("Error generating favicons:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto mt-8 max-w-md">
      <CardHeader>
        <CardTitle>Favicon Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`rounded-md border-2 border-dashed p-4 text-center transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          {preview ? (
            <div className="flex flex-col items-center">
              <ImageView
                src={preview}
                width={180}
                height={180}
                alt="Preview"
                className="mx-auto mb-4 max-h-64 object-contain"
              />
              <p className="mb-2 text-sm text-gray-600">
                {file?.name} ({Math.round((file?.size || 0) / 1024)} KB)
              </p>
            </div>
          ) : (
            <div className="py-8">
              <p className="mb-2 text-gray-500">Drag & drop an image here or</p>
              <p className="text-sm text-gray-400">
                Supports PNG, JPG, SVG (Max 5MB)
              </p>
            </div>
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-2 inline-block cursor-pointer rounded-md bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
          >
            Select File
          </label>
        </div>
        {file && (
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Download Favicon Pack"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
