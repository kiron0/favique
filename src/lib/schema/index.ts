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
