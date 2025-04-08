"use client"

import * as React from "react"
import ImageView from "next/image"
import { loadImage, MAX_FILE_SIZE, SUPPORTED_TYPES } from "@/utils"
import { Loader2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useFaviconGenerator } from "@/hooks/use-favicon-generator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Hero } from "@/components/hero"
import { notifyError } from "@/components/toast"

interface TState {
  file: File | null
  preview: string | null
  loading: boolean
  dragActive: boolean
  wantToAddSiteName: boolean
  siteConfig: {
    name: string
    short_name: string
  }
}

export function Converter() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const { generateFaviconPack } = useFaviconGenerator(canvasRef)

  const [state, setState] = React.useState<TState>({
    file: null,
    preview: null,
    loading: false,
    dragActive: false,
    wantToAddSiteName: false,
    siteConfig: {
      name: "",
      short_name: "",
    },
  })

  const updateState = (newState: Partial<typeof state>) => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }

  const { file, preview, loading, dragActive, wantToAddSiteName, siteConfig } =
    state

  const handleFile = (file: File) => {
    if (!file) {
      updateState({ dragActive: false })
      return notifyError({
        title: "Invalid file",
        description: "Please select a valid image (PNG/JPG/SVG, max 5MB)",
      })
    }
    if (file.size > MAX_FILE_SIZE) {
      updateState({ dragActive: false })
      return notifyError({
        title: "File too large",
        description: `Please select a file smaller than ${MAX_FILE_SIZE} MB.`,
      })
    }
    if (!SUPPORTED_TYPES.includes(file.type)) {
      updateState({ dragActive: false })
      return notifyError({
        title: "Unsupported file type",
        description: "Please select a PNG, JPG, or SVG file.",
      })
    }

    updateState({
      file,
      preview: URL.createObjectURL(file),
      dragActive: false,
    })
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
    updateState({ dragActive: e.type === "dragenter" || e.type === "dragover" })
  }

  const handleGenerate = async () => {
    if (!file) {
      return notifyError({
        title: "No file selected",
        description: "Please select an image to convert.",
      })
    }

    if (wantToAddSiteName && (!siteConfig.name || !siteConfig.short_name)) {
      return notifyError({
        title: "Missing site name",
        description:
          "Please enter a site name and short name or uncheck the option.",
      })
    }

    updateState({ loading: true })

    try {
      const img = await loadImage(file)

      const canvas = canvasRef.current
      if (!canvas) throw new Error("Canvas not found")

      canvas.width = img.width
      canvas.height = img.height

      generateFaviconPack(canvas, {
        name: siteConfig.name,
        short_name: siteConfig.short_name,
      })
    } catch (error) {
      console.error("Error generating favicon pack:", error)
      notifyError({
        title: "Error generating favicon pack",
        description: "Please try again later.",
      })
    } finally {
      updateState({
        loading: false,
      })
    }
  }

  return (
    <div className="space-y-4 md:space-y-8">
      <Hero
        title="Favicon Converter / Generate from Image"
        description="Quickly generate your favicon from an image by uploading your image below. Download your favicon in the most up to date formats."
      />
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-3 max-w-2xl flex-col space-y-8 xl:mx-0">
          <Card className="w-full rounded-md border-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold md:text-2xl">
                Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={cn(
                  "rounded-lg border-2 border-dashed text-center transition-colors",
                  dragActive ? "bg-secondary border-primary" : "bg-background",
                  !file &&
                    "hover:bg-secondary hover:border-primary cursor-pointer"
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
                      onClick={() =>
                        updateState({
                          file: null,
                          preview: null,
                          dragActive: false,
                          wantToAddSiteName: false,
                          siteConfig: {
                            name: "",
                            short_name: "",
                          },
                        })
                      }
                      className="absolute top-2 right-2 h-8 w-8 rounded-full p-0"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <label
                    htmlFor="file-upload"
                    className={cn(!file && "cursor-pointer")}
                  >
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
                    updateState({ wantToAddSiteName: value as boolean })
                    if (!value) {
                      updateState({ siteConfig: { name: "", short_name: "" } })
                    }
                  }}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="want-to-add-site-name"
                    className="cursor-pointer"
                  >
                    Add site name and short name to manifest
                  </Label>
                  <p className="text-muted-foreground text-xs">
                    This will add the site name and short name to the web
                    manifest file. If you don't want to add it, leave it
                    unchecked.
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
                        updateState({
                          siteConfig: {
                            ...siteConfig,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-short-name">Site Short Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter your site short name"
                      value={siteConfig.short_name}
                      onChange={(e) =>
                        updateState({
                          siteConfig: {
                            ...siteConfig,
                            short_name: e.target.value,
                          },
                        })
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
      </div>
    </div>
  )
}
