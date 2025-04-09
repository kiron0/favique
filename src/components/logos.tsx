"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { Hero } from "@/components/hero"

const logoFormSchema = z.object({
  logoText: z.string().min(1, "Logo text is required"),
  logoColor: z.string().min(1, "Logo color is required"),
  bannerText: z.string().min(1, "Banner text is required"),
  bannerColor: z.string().min(1, "Banner color is required"),
  logoBackgroundColor: z.string().min(1, "Logo background color is required"),
  bannerBackgroundColor: z
    .string()
    .min(1, "Banner background color is required"),
  logoFontFamily: z.string().min(1, "Logo font family is required"),
  logoFontSize: z.number().min(1, "Logo font size is required"),
  logoFontStyle: z.string().optional(),
  logoFontWeight: z.string().min(1, "Logo font weight is required"),
})
type LogoFormSchema = z.infer<typeof logoFormSchema>

const DEFAULT_VALUES: LogoFormSchema = {
  logoText: "F",
  logoColor: "#000000",
  bannerText: "Favique",
  bannerColor: "#ffffff",
  logoBackgroundColor: "#ffffff",
  bannerBackgroundColor: "#000000",
  logoFontFamily: "Arial",
  logoFontSize: 100,
  logoFontStyle: "normal",
  logoFontWeight: "400",
}

export function Logos() {
  const form = useForm<LogoFormSchema>({
    resolver: zodResolver(logoFormSchema),
    defaultValues: DEFAULT_VALUES,
  }) as UseFormReturn<LogoFormSchema>

  return (
    <div className="space-y-4 pb-2 md:space-y-8">
      <Hero
        title="Logo Generator"
        description="Generate a logo by configuring the settings below. Download your logo in a variety of layouts and formats."
      />
      <div className="flex h-96 flex-col items-center justify-center text-center">
        <p className="mb-4 text-lg text-balance">On the way...!</p>
      </div>
    </div>
  )
}
