"use client"

import * as React from "react"
import { MAX_FILE_SIZE } from "@/utils"
import { Loader2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useFaviconGenerator } from "@/hooks/use-favicon-generator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Banner } from "@/components/banner"
import { CustomImage } from "@/components/custom-image"
import { Installation } from "@/components/installation"
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
  const { generateBundle } = useFaviconGenerator(canvasRef)

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
    if (file.type.includes("image/") === false) {
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
    e.preventDefault()
    handleFile(e.target.files?.[0] as File)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files?.[0] as File)
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
      generateBundle({
        canvas: canvasRef.current,
        image: file,
        manifest: wantToAddSiteName ? siteConfig : undefined,
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
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Favicon Converter / Generate from Image"
        description="Quickly generate your favicon from an image by uploading your image below. Download your favicon in the most up to date formats."
      />
      <div className="mx-auto w-full max-w-7xl space-y-20">
        <div className="mx-3 max-w-2xl flex-col space-y-8 xl:mx-0">
          <Card className="w-full border-none">
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
                    <CustomImage
                      src={preview}
                      width={180}
                      height={180}
                      alt="Preview"
                      className="mx-auto max-h-64 rounded-md border object-contain"
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
                    <div className="flex min-h-60 flex-col items-center justify-center space-y-2 text-balance">
                      <p className="text-muted-foreground">
                        Drag & drop an image here or
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Supports only image files (Max 5MB)
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
                    manifest file. If you don&apos;t want to add it, leave it
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
        <Installation />
      </div>
    </div>
  )
}
