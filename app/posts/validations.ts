import * as z from "zod"

const title = z.string().min(4).max(64)
const description = z.string().min(10)
const images = z.array(z.string())

export const CreatePost = z.object({
  title,
  description,
  images: images.optional(),
  ownerId: z.number(),
})

export const UpdatePost = z
  .object({
    id: z.number(),
    title,
    images,
    description,
  })
  .nonstrict()

export const DeletePost = z.object({
  id: z.number(),
})
