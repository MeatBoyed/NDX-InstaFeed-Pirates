import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pagesEnum = z.enum(["home", "contact", "about"])
export type Pages = z.infer<typeof pagesEnum>

export const payloadSchema = z.object({
  posts: z.string().url().array(),
  page: pagesEnum,
})
export const AddPostResponse = z.object({
  posts: z.string().url().array().optional(),
  message: z.string(),
})
export type InstaServicePayload = z.infer<typeof payloadSchema>
export type InstaServiceResponse = z.infer<typeof AddPostResponse>