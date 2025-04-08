import { z } from "zod"

export const textIconFormSchema = z.object({
  text: z.string().min(1, { message: "Logo text is required" }),
  textColor: z.string().min(1, { message: "Text color is required" }),
  backgroundColor: z
    .string()
    .min(1, { message: "Background color is required" }),
  fontFamily: z.string().min(1, { message: "Font family is required" }),
  fontStyle: z.string().optional(),
  fontSize: z.number().min(16, { message: "Font size is required" }).max(512, {
    message: "Font size must be between 16 and 512",
  }),
  fontWeight: z.string().min(1, { message: "Font weight is required" }),
  roundness: z.string().min(1, { message: "Roundness is required" }),
})
export type TextIconFormSchema = z.infer<typeof textIconFormSchema>
