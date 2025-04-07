"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

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
import { Hero } from "@/components/hero"

import Fonts from "../../public/fonts.json"
import { FontsSelection } from "./fonts-selection"

const roundnessOptions = [
  { value: "square", label: "Square" },
  { value: "circle", label: "Circle" },
  { value: "rounded", label: "Rounded" },
]

const formSchema = z.object({
  text: z.string().min(1, { message: "Logo text is required" }),
  textColor: z.string().min(1, { message: "Text color is required" }),
  backgroundColor: z
    .string()
    .min(1, { message: "Background color is required" }),
  fontFamily: z.string().min(1, { message: "Font family is required" }),
  fontSize: z.string().min(1, { message: "Font size is required" }),
  fontWeight: z.string().min(1, { message: "Font weight is required" }),
  roundness: z.string().min(1, { message: "Roundness is required" }),
})
type FormSchema = z.infer<typeof formSchema>

export function Generator() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "F",
      fontFamily: "42dot Sans",
      textColor: "#ffffff",
      backgroundColor: "#000000",
      fontSize: "32",
      fontWeight: "400",
      roundness: "square",
    },
  }) as UseFormReturn<FormSchema>

  const selectedFontFamily = form.watch("fontFamily")

  const fontVariants = React.useMemo(() => {
    return (
      Fonts.find((font) => font.family === selectedFontFamily)?.variants.map(
        (variant) => ({
          name: variant.name,
        })
      ) || []
    )
  }, [selectedFontFamily])

  const onSubmit = (data: FormSchema) => {
    console.log(data)
  }

  return (
    <div className="space-y-4 md:space-y-8">
      <Hero
        title="Favicon Generator / Generate from Text"
        description="Quickly generate your favicon from text by selecting the text, fonts, and colors. Download your favicon in the most up-to-date formats."
      />
      <div className="mx-auto w-full max-w-7xl">
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
                  onSubmit={form.handleSubmit(onSubmit)}
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
                            <Input placeholder="Text" {...field} />
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
                              max={100}
                              step={1}
                              value={[parseInt(field.value)]}
                              onValueChange={(value) => {
                                field.onChange(value[0].toString())
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
                  <Button type="submit">Download</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
