import * as z from "zod"

const id = z.number()
const name = z.string().min(2).max(20)

export const CreateCategory = z.object({
  name,
  parentId: id.optional(),
})
