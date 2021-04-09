import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

export const GetBoundedPosts = z.object({
  title: z.string(),
  description: z.string(),
})

export interface FtsQuery {
  [key: string]: { contains: string; mode: string }
}

export const generateFtsQuery = (input: { [x: string]: string }): FtsQuery[] => {
  // The loop results in array of arrays, so here it is mapping into one array
  return [].concat.apply(
    [],
    // Foreach key provided
    Object.keys(input).map((key) => {
      return (
        input[key]
          // Spare all words
          .split(" ")
          // Loop the words and make the prisma query
          .map((value) => ({ [key]: { contains: value, mode: "insensitive" } }))
      )
    })
  )
}

export default resolver.pipe(resolver.zod(GetBoundedPosts), async ({ title, description }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const posts = await db.post.findMany({
    where: {
      OR: generateFtsQuery({ title, description }),
    },
  })

  return posts
})
