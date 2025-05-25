"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import { useFaviconGenerator } from "@/hooks/use-favicon-generator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Installation } from "@/components/installation"

export function Generator() {
  const [wantToAddSiteName, setWantToAddSiteName] = React.useState(false)
  const [manifest, setManifest] = React.useState({
    name: "",
    short_name: "",
  })
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  const { img, loading, form, fontVariants, generateFaviconPack } =
    useFaviconGenerator(canvasRef)

  return (
    <div className="space-y-4 pb-2 md:space-y-6 lg:space-y-8">
      <Banner
        title="Favicon Generator / Generate from Text"
        description="Quickly generate your favicon from text by selecting the text, fonts, and colors. Download your favicon in the most up-to-date formats."
      />
      <div className="mx-auto w-full max-w-7xl space-y-20">
        {img && (
          <div className="mx-4 mb-8 flex justify-between border-b pb-4 xl:mx-0">
            <div className="flex w-full items-center gap-4">
              <h2 className="text-base font-bold md:text-lg">Preview</h2>
              <div className="flex w-full items-center gap-3">
                <CustomImage
                  src={img}
                  width={512}
                  height={512}
                  alt="Generated Favicon"
                  className="h-auto w-12"
                />
                <CustomImage
                  src={img}
                  width={512}
                  height={512}
                  alt="Generated Favicon"
                  className="h-auto w-8"
                />
                <CustomImage
                  src={img}
                  width={512}
                  height={512}
                  alt="Generated Favicon"
                  className="h-auto w-4"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-end gap-4">
              <Button
                disabled={loading}
                onClick={() => generateFaviconPack(canvasRef.current, manifest)}
              >
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
        )}
        <div className="mx-4 flex-col space-y-8 xl:mx-0">
          <Card className="w-full border-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold md:text-2xl">
                Generate From Text
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(() =>
                    generateFaviconPack(canvasRef.current)
                  )}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="text"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Text</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cornerRadius"
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
                      name="backgroundColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Background Color</FormLabel>
                          <FormControl>
                            <ColorPicker {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fontColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Text Color</FormLabel>
                          <FormControl>
                            <ColorPicker {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fontSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Font Size: {field.value}px</FormLabel>
                          <FormControl>
                            <Slider
                              max={512}
                              min={16}
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
                    <div className="col-span-full space-y-6">
                      <div className="items-top flex space-x-2">
                        <Checkbox
                          id="want-to-add-site-name-generator"
                          checked={wantToAddSiteName}
                          onCheckedChange={(value) =>
                            setWantToAddSiteName(value as boolean)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="want-to-add-site-name-generator"
                            className="cursor-pointer"
                          >
                            Add site name and short name to manifest
                          </Label>
                          <p className="text-muted-foreground text-xs">
                            This will add the site name and short name to the
                            web manifest file. If you don&apos;t want to add it,
                            leave it unchecked.
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
                              value={manifest.name}
                              onChange={(e) =>
                                setManifest({
                                  ...manifest,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="site-short-name">
                              Site Short Name
                            </Label>
                            <Input
                              type="text"
                              placeholder="Enter your site short name"
                              value={manifest.short_name}
                              onChange={(e) =>
                                setManifest({
                                  ...manifest,
                                  short_name: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <Installation />
      </div>
    </div>
  )
}
