"use client"

import * as React from "react"
import { siteConfig } from "@/config"
import { calculateSizes, drawRoundedRect, loadFonts } from "@/utils"
import CanvasToSVG from "@/utils/canvas-to-svg"
import { zodResolver } from "@hookform/resolvers/zod"
import { saveAs } from "file-saver"
import JSZip from "jszip"
import { Loader2, Shuffle } from "lucide-react"
import { useForm, UseFormReturn } from "react-hook-form"

import { logoFormSchema, LogoFormSchema } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Banner } from "@/components/banner"
import { ColorPicker } from "@/components/color-picker"
import { CustomImage } from "@/components/custom-image"
import { FontsSelection } from "@/components/fonts-selection"
import { notifyError } from "@/components/toast"

import Fonts from "../../public/fonts.json"

const generateRandomColor = (useWhiteBias = true): string => {
  if (useWhiteBias && Math.random() < 0.8) return "#FFFFFF"
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`
}

const DEFAULT_VALUES: LogoFormSchema = {
  logoText: "F",
  logoColor: "#FFE8F5",
  bannerText: "Favique.com",
  bannerColor: "#8000FF",
  logoBackgroundColor: "#8000FF",
  bannerBackgroundColor: "#FFE8F5",
  fontFamily: "Leckerli One",
  fontWeight: "Regular 400 Normal",
  logoRoundness: 15,
}

export function Logos() {
  const [files, setFiles] = React.useState<{
    img: string | null
    svg: string | null
  }>({
    img: null,
    svg: null,
  })
  const [loading, setLoading] = React.useState(false)

  const form = useForm<LogoFormSchema>({
    resolver: zodResolver(logoFormSchema),
    defaultValues: DEFAULT_VALUES,
  }) as UseFormReturn<LogoFormSchema>

  const selectedFontFamily = form.watch("fontFamily")

  const fontVariants = React.useMemo(
    () =>
      Fonts.find((font) => font.family === selectedFontFamily)?.variants || [],
    [selectedFontFamily]
  )

  const generateRandomLogo = React.useCallback((): LogoFormSchema => {
    if (!Fonts.length) return DEFAULT_VALUES

    const randomFontFamily =
      Fonts[Math.floor(Math.random() * Fonts.length)].family

    return {
      ...DEFAULT_VALUES,
      logoColor: generateRandomColor(),
      bannerColor: generateRandomColor(),
      logoBackgroundColor: generateRandomColor(false),
      bannerBackgroundColor: generateRandomColor(false),
      logoRoundness: Math.floor(Math.random() * 101),
      fontFamily: randomFontFamily || DEFAULT_VALUES.fontFamily,
      fontWeight:
        Fonts.find((font) => font.family === randomFontFamily)?.variants[0]
          ?.name || DEFAULT_VALUES.fontWeight,
    }
  }, [])

  const onSubmit = async (data: LogoFormSchema) => {
    const { fontWeight } = data

    if (!files.img || !files.svg) {
      return notifyError({
        title: "Image not generated",
        description: "Please generate the image before downloading.",
      })
    }

    try {
      setLoading(true)
      const zip = new JSZip()

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

      const imgName = "logo"

      const imgBlob = await fetch(files.img).then((res) => res.blob())

      zip.file(`${imgName}.png`, imgBlob)

      zip.file(`${imgName}.svg`, files.svg)

      const zipBlob = await zip.generateAsync({ type: "blob" })
      saveAs(zipBlob, `${siteConfig.name}-logo-${Date.now()}.zip`)
      setLoading(false)
    } catch (error) {
      return notifyError({
        title: "Error generating logo",
        description: "Please try again later.",
      })
    }
  }

  const updateCanvas = React.useCallback(async () => {
    const data = form.getValues()

    const selectedFont = fontVariants.find((v) => v.name === data.fontWeight)

    if (!selectedFont) return

    const [, weight, style] = selectedFont.name.split(" ")

    const canvas = document.createElement("canvas")

    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = 500
    const height = 300
    canvas.width = width * 2
    canvas.height = height * 2
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(2, 2)

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = data.bannerBackgroundColor
    ctx.fillRect(0, 0, width, height)

    await loadFonts({
      families: [data.fontFamily],
    })

    const paddingBetween = 20
    const { fontSize, logoRadius } = calculateSizes(
      ctx,
      data,
      width,
      height,
      paddingBetween,
      style,
      weight
    )

    ctx.font = `${style} ${weight} ${fontSize}px ${data.fontFamily}`
    const bannerTextWidth = ctx.measureText(data.bannerText).width

    const logoWidth = logoRadius * 2
    const totalContentWidth = logoWidth + paddingBetween + bannerTextWidth
    const startX = (width - totalContentWidth) / 2
    const centerY = height / 2

    const logoX = startX + logoRadius
    const cornerRadius = Math.min(data.logoRoundness, logoRadius)

    drawRoundedRect(
      ctx,
      logoX - logoRadius,
      centerY - logoRadius,
      logoWidth,
      logoWidth,
      cornerRadius
    )
    ctx.fillStyle = data.logoBackgroundColor
    ctx.fill()

    ctx.fillStyle = data.logoColor
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(data.logoText, logoX, centerY)

    const bannerTextX = logoX + logoRadius + paddingBetween
    ctx.fillStyle = data.bannerColor
    ctx.textAlign = "left"
    ctx.fillText(data.bannerText, bannerTextX, centerY)

    const exporter = new CanvasToSVG(canvas)
    const svgData = exporter.toSVGWithFullScreen()
    setFiles({
      img: canvas.toDataURL("image/png"),
      svg: svgData,
    })
  }, [form, fontVariants])

  React.useEffect(() => {
    form.reset(generateRandomLogo())
  }, [form, generateRandomLogo])

  React.useEffect(() => {
    if (typeof window === "undefined") return

    updateCanvas()
    const subscription = form.watch(() => updateCanvas())
    return () => subscription.unsubscribe()
  }, [form, updateCanvas])

  return (
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Logo Generator"
        description="Generate a logo by configuring the settings below. Download your logo in a variety of layouts and formats."
      />
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-4 flex-col space-y-8 xl:mx-0">
          <Card className="w-full border-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold md:text-2xl">
                Logo Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 gap-8 lg:grid-cols-3"
                >
                  <div className="order-2 grid grid-cols-1 gap-6 lg:order-1">
                    <FormField
                      control={form.control}
                      name="bannerText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Banner Text</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Banner Text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bannerColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Banner Color</FormLabel>
                          <FormControl>
                            <ColorPicker {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bannerBackgroundColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Banner Background Color</FormLabel>
                          <FormControl>
                            <ColorPicker {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="logoText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo Text</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Logo Text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="logoColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo Color</FormLabel>
                          <FormControl>
                            <ColorPicker {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="logoBackgroundColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo Background Color</FormLabel>
                          <FormControl>
                            <ColorPicker {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="logoRoundness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Background Roundness: {field.value}px
                          </FormLabel>
                          <FormControl>
                            <Slider
                              max={100}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) => {
                                field.onChange(value[0])
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fontFamily"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Font Family</FormLabel>
                            <FormControl>
                              <FontsSelection
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="fontWeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Font Weight</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                            disabled={fontVariants.length === 0}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select font weight" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {fontVariants.map((variant) => (
                                <SelectItem
                                  key={variant.name}
                                  value={variant.name}
                                >
                                  {variant.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="order-1 col-span-1 space-y-6 lg:order-2 lg:col-span-2">
                    <div className="flex w-full items-center justify-center overflow-hidden rounded-md border">
                      {files.svg ? (
                        <CustomImage
                          src={`data:image/svg+xml;base64,${btoa(files.svg)}`}
                          alt="Generated Logo"
                          className="h-full w-full object-contain"
                          width={1000}
                          height={600}
                        />
                      ) : (
                        <div className="flex aspect-video h-full w-full items-center justify-center rounded-md border">
                          <p className="text-muted-foreground">
                            No image generated
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => form.reset(generateRandomLogo())}
                        disabled={loading || form.formState.isSubmitting}
                      >
                        <Shuffle className="h-4 w-4" />
                        Randomize
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Downloading...
                          </>
                        ) : (
                          "Download"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
