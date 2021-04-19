import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

export const GetBoundedPosts = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
})

export interface FtsQuery {
  [key: string]: { contains: string; mode: string }
}

export const generateFtsQuery = <T>(input: Partial<T>): FtsQuery[] => {
  // Mapping unique results from set to array
  return Array.from(
    // Making the result unique
    new Set(
      // The loop results in array of arrays, so here it is mapping into one array
      [].concat.apply(
        [],
        // Foreach key provided
        Object.keys(input).map((key) => {
          return (
            input[key]
              // Spare all words
              .split(" ")
              // Loop the words and make the prisma query
              .map((value: string) => ({ [key]: { contains: value, mode: "insensitive" } }))
          )
        })
      )
    )
  )
}

export default resolver.pipe(resolver.zod(GetBoundedPosts), async ({ id, title, description }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const posts = await db.post.findMany({
    where: {
      NOT: [{ id }],
      OR: generateFtsQuery({ title, description }),
    },
    include: { category: true },
  })

  return posts
})
