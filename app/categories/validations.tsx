import * as z from "zod"

const id = z.number()
const name = z.string()

export const CreateCategory = z.object({
  name,
  parentId: id.optional(),
})
