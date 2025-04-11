import { z } from "zod"

export const textIconFormSchema = z.object({
  text: z.string().min(1, { message: "Logo text is required" }),
  width: z.number().min(0, { message: "Width is required" }),
  height: z.number().min(0, { message: "Height is required" }),
  fontColor: z.string().min(1, { message: "Font color is required" }),
  backgroundColor: z
    .string()
    .min(1, { message: "Background color is required" }),
  fontFamily: z.string().min(1, { message: "Font family is required" }),
  fontStyle: z.string().optional(),
  fontSize: z.number().min(16, { message: "Font size is required" }).max(512, {
    message: "Font size must be between 16 and 512",
  }),
  fontWeight: z.string().min(1, { message: "Font weight is required" }),
  cornerRadius: z.number().min(0, { message: "Corner radius is required" }),
  manifest: z
    .object({
      name: z.string().min(1, { message: "Name is required" }),
      short_name: z.string().min(1, { message: "Short name is required" }),
    })
    .optional(),
})
export type TextIconFormSchema = z.infer<typeof textIconFormSchema>

export const logoFormSchema = z.object({
  logoText: z.string().min(1, "Logo text is required"),
  logoColor: z.string().min(1, "Logo color is required"),
  bannerText: z.string().min(1, "Banner text is required"),
  bannerColor: z.string().min(1, "Banner color is required"),
  logoBackgroundColor: z.string().min(1, "Logo background color is required"),
  bannerBackgroundColor: z
    .string()
    .min(1, "Banner background color is required"),
  fontFamily: z.string().min(1, "Logo font family is required"),
  fontWeight: z.string().min(1, "Logo font weight is required"),
  logoRoundness: z
    .number()
    .min(0, "Logo roundness must be a positive number")
    .max(100, "Logo roundness must be less than 100"),
})
export type LogoFormSchema = z.infer<typeof logoFormSchema>
