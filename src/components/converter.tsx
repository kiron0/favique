"use client"

import * as React from "react"
import ImageView from "next/image"
import Link from "next/link"
import {
  generateManifest,
  loadImage,
  MAX_FILE_SIZE,
  sizes,
  SUPPORTED_TYPES,
} from "@/utils"
import { FaviconComposer } from "favium"
import { saveAs } from "file-saver"
import JSZip from "jszip"
import { Loader2, MoveLeft, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { notifyError } from "@/components/toast"

export function Converter() {
  const [file, setFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [dragActive, setDragActive] = React.useState(false)
  const [wantToAddSiteName, setWantToAddSiteName] = React.useState(false)
  const [siteConfig, setSiteConfig] = React.useState<{
    name: string
    shortName: string
  }>({
    name: "",
    shortName: "",
  })

  const handleFile = (file: File) => {
    if (!file) {
      setDragActive(false)
      return notifyError({
        title: "Invalid file",
        description: "Please select a valid image (PNG/JPG/SVG, max 5MB)",
      })
    }
    if (file.size > MAX_FILE_SIZE) {
      setDragActive(false)
      return notifyError({
        title: "File too large",
        description: `Please select a file smaller than ${MAX_FILE_SIZE} MB.`,
      })
    }
    if (!SUPPORTED_TYPES.includes(file.type)) {
      setDragActive(false)
      return notifyError({
        title: "Unsupported file type",
        description: "Please select a PNG, JPG, or SVG file.",
      })
    }

    setFile(file)
    setPreview(URL.createObjectURL(file))
    setDragActive(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] as File)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleGenerate = async () => {
    if (!file) {
      return notifyError({
        title: "No file selected",
        description: "Please select an image to convert.",
      })
    }

    if (wantToAddSiteName && (!siteConfig.name || !siteConfig.shortName)) {
      return notifyError({
        title: "Missing site name",
        description:
          "Please enter a site name and short name or uncheck the option.",
      })
    }

    setLoading(true)

    try {
      const zip = new JSZip()

      const img = await loadImage(file)

      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Failed to get canvas context")
      ctx.drawImage(img, 0, 0)

      const favicon = new FaviconComposer(canvas)
      const bundle = favicon.bundle()

      sizes.forEach(({ name, size }) => {
        const dataUrl = bundle[`png${size}` as keyof typeof bundle]
        if (!dataUrl) return
        const base64Data = dataUrl.split(",")[1]
        const byteString = atob(base64Data)
        const byteArray = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++) {
          byteArray[i] = byteString.charCodeAt(i)
        }
        zip.file(name, byteArray)
      })

      const icoBase64 = bundle.ico.split(",")[1]
      const icoBytes = atob(icoBase64)
      const icoArray = new Uint8Array(icoBytes.length)
      for (let i = 0; i < icoBytes.length; i++) {
        icoArray[i] = icoBytes.charCodeAt(i)
      }
      zip.file("favicon.ico", icoArray)

      const manifest = generateManifest({
        name: siteConfig.name,
        short_name: siteConfig.shortName,
      })
      zip.file("site.webmanifest", JSON.stringify(manifest, null, 2))

      const zipBlob = await zip.generateAsync({ type: "blob" })
      saveAs(zipBlob, `favicon-pack-${siteConfig.shortName || Date.now()}.zip`)
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

  return (
    <div className="mx-3 mt-8 max-w-2xl flex-col items-center justify-center space-y-8 md:mx-auto md:mt-0 md:flex md:min-h-svh">
      <div className="flex items-center justify-center">
        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
          })}
        >
          <MoveLeft className="size-4" />
          Back to Home
        </Link>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Favicon Converter</CardTitle>
          <CardDescription>
            Convert your image to a favicon pack for your website.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              "hover:bg-secondary hover:border-primary cursor-pointer rounded-lg border-2 border-dashed text-center transition-colors",
              dragActive ? "bg-secondary border-primary" : "bg-background"
            )}
          >
            {preview ? (
              <div className="relative flex min-h-60 flex-col items-center justify-center gap-4 py-6">
                <ImageView
                  src={preview}
                  width={180}
                  height={180}
                  alt="Preview"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="mx-auto max-h-64 rounded-md border object-contain select-none"
                />
                <p className="text-muted-foreground text-sm text-balance">
                  {file?.name} ({Math.round((file?.size || 0) / 1024)} KB)
                </p>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setFile(null)
                    setPreview(null)
                    setDragActive(false)
                    setWantToAddSiteName(false)
                    setSiteConfig({
                      name: "",
                      shortName: "",
                    })
                  }}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full p-0"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <label htmlFor="file-upload">
                <div className="flex min-h-60 flex-col items-center justify-center space-y-2">
                  <p className="text-muted-foreground">
                    Drag & drop an image here or
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Supports PNG, JPEG/JPG, WEBP, GIF, SVG (Max 5MB)
                  </p>
                </div>
              </label>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="file-upload"
            />
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox
              id="want-to-add-site-name"
              checked={wantToAddSiteName}
              onCheckedChange={(value) => {
                setWantToAddSiteName(value as boolean)
                if (!value) {
                  setSiteConfig({ name: "", shortName: "" })
                }
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="want-to-add-site-name" className="cursor-pointer">
                Add site name and short name to manifest
              </Label>
              <p className="text-muted-foreground text-xs">
                This will add the site name and short name to the web manifest
                file. If you don't want to add it, leave it unchecked.
              </p>
            </div>
          </div>
          {wantToAddSiteName && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your site name"
                  value={siteConfig.name}
                  onChange={(e) =>
                    setSiteConfig({ ...siteConfig, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-short-name">Site Short Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your site short name"
                  value={siteConfig.shortName}
                  onChange={(e) =>
                    setSiteConfig({ ...siteConfig, shortName: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          {file && (
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Download Favicon Pack"
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
