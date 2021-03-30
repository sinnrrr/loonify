import * as z from "zod"

const title = z.string().min(4).max(64)
const description = z.string().min(10)
const images = z.array(z.string()).optional()
const locations = z.array(
  z.object({
    lat: z.number(),
    lng: z.number(),
    radius: z.number(),
  })
)

export const CreatePost = z.object({
  title,
  description,
  images,
  locations,
  ownerId: z.number(),
})

export const UpdatePost = z
  .object({
    id: z.number(),
    title,
    images,
    description,
    locations: locations.optional(),
  })
  .nonstrict()

export const DeletePost = z.object({
  id: z.number(),
})
