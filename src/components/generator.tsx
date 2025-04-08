"use client"

import { roundnessOptions } from "@/utils"
import { Loader2 } from "lucide-react"

import { useFaviconGenerator } from "@/hooks/use-favicon-generator"
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
import { ColorPicker } from "@/components/color-picker"
import { FontsSelection } from "@/components/fonts-selection"
import { Hero } from "@/components/hero"

export function Generator() {
  const { img, loading, form, fontVariants, generateFaviconPack } =
    useFaviconGenerator()

  return (
    <div className="space-y-4 md:space-y-8">
      <Hero
        title="Favicon Generator / Generate from Text"
        description="Quickly generate your favicon from text by selecting the text, fonts, and colors. Download your favicon in the most up-to-date formats."
      />
      <div className="mx-auto w-full max-w-7xl">
        {img && (
          <div className="mx-3 mt-8 flex w-full flex-col space-y-4 xl:mx-0">
            <h2 className="text-xl font-bold md:text-2xl">Preview</h2>
            <div className="flex w-full items-center justify-center">
              <img
                src={img}
                alt="Generated Favicon"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                className="h-auto w-52 select-none"
              />
            </div>
          </div>
        )}
        <div className="mx-3 flex-col space-y-8 xl:mx-0">
          <Card className="w-full rounded-md border-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold md:text-2xl">
                Generate From Text
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(generateFaviconPack)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                      name="textColor"
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
                      name="roundness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Background Roundness</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select roundness" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {roundnessOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                              max={1000}
                              step={5}
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
                  {img && (
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
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
