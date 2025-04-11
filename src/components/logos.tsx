"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
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

const DEFAULT_VALUES: LogoFormSchema = {
  logoText: "F",
  logoColor: "#FFE8F5",
  bannerText: "Favique",
  bannerColor: "#8000FF",
  logoBackgroundColor: "#8000FF",
  bannerBackgroundColor: "#FFE8F5",
  fontFamily: "Leckerli One",
  fontWeight: "Regular 400 Normal",
  logoRoundness: 15,
}

export function Logos() {
  const [img, setImg] = React.useState<string | null>(null)
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

  const onSubmit = async (data: LogoFormSchema) => {
    try {
      await updateCanvas()
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
    if (!selectedFont) {
      return notifyError({
        title: "Font weight not found",
        description: "Please select a valid font weight.",
      })
    }
    const [, weight, style] = selectedFont.name.split(" ")

    const canvas = document.createElement("canvas")
    if (!canvas) {
      return notifyError({
        title: "Canvas not found",
        description: "Please try again later.",
      })
    }
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Canvas setup
    const width = 1000
    const height = 400
    canvas.width = width * 2
    canvas.height = height * 2
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(2, 2)

    // Clear and draw background
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = data.bannerBackgroundColor
    ctx.fillRect(0, 0, width, height)

    // Load font
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

    // Constants
    const minPadding = 20
    const paddingBetween = 40
    const maxRadius = height * 0.3
    const minRadius = 20
    const tempFontSize = 100

    // Calculate adaptive circleRadius
    ctx.font = `${style} ${weight} ${tempFontSize}px ${data.fontFamily}`
    const bannerTextWidthTemp = ctx.measureText(data.bannerText).width
    const k = bannerTextWidthTemp / tempFontSize // Text width scaling factor
    const maxContentWidth = width - 2 * minPadding
    const availableRadius = (maxContentWidth - paddingBetween) / (2 + k)
    const circleRadius = Math.max(
      minRadius,
      Math.min(maxRadius, availableRadius)
    )

    // Set font size and measure actual text width
    ctx.font = `${style} ${weight} ${circleRadius}px ${data.fontFamily}`
    const bannerTextWidth = ctx.measureText(data.bannerText).width

    // Calculate content layout
    const logoWidth = circleRadius * 2
    const totalContentWidth = logoWidth + paddingBetween + bannerTextWidth
    const startX = (width - totalContentWidth) / 2
    const centerY = height / 2

    // Draw logo background (rounded rectangle)
    const logoX = startX + circleRadius
    const cornerRadius = data.logoRoundness
    drawRoundedRect(
      ctx,
      logoX - circleRadius,
      centerY - circleRadius,
      logoWidth,
      logoWidth,
      cornerRadius
    )
    ctx.fillStyle = data.logoBackgroundColor
    ctx.fill()

    // Draw logo text
    ctx.fillStyle = data.logoColor
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(data.logoText, logoX, centerY)

    // Draw banner text
    const bannerTextX = logoX + circleRadius + paddingBetween
    ctx.fillStyle = data.bannerColor
    ctx.textAlign = "left"
    ctx.fillText(data.bannerText, bannerTextX, centerY)

    // Output canvas as image
    const dataURL = canvas.toDataURL("image/png")
    setImg(dataURL)
    setLoading(false)

    // Reusable rounded rectangle function
    function drawRoundedRect(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) {
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      )
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
    }
  }, [form, fontVariants])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      updateCanvas()
      const subscription = form.watch(() => updateCanvas())
      return () => subscription.unsubscribe()
    }
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
                    <div className="flex h-96 w-full items-center justify-center rounded-md border">
                      {img ? (
                        <CustomImage
                          src={img}
                          alt="Generated Logo"
                          className="aspect-video h-full w-full object-contain"
                          width={1000}
                          height={600}
                          onError={() => setImg(null)}
                          onLoad={() => setLoading(false)}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-md border">
                          <p className="text-muted-foreground">
                            No image generated
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end">
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
