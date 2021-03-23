import * as z from "zod"

const title = z.string().min(4).max(64)
const description = z.string().min(10)

export const CreatePost = z.object({
  title,
  description,
  ownerId: z.number(),
})

export const UpdatePost = z
  .object({
    id: z.number(),
    title,
    description,
  })
  .nonstrict()

export const DeletePost = z.object({
  id: z.number(),
})
