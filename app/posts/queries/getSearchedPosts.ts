import { resolver } from "blitz"
import db, { Post } from "db"
import * as z from "zod"
import { generateFtsQuery } from "./getRelatedPosts"

export const GetBoundedPosts = z.object({
  query: z.string(),
})

export default resolver.pipe(resolver.zod(GetBoundedPosts), async ({ query }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const posts = await db.post.findMany({
    where: { OR: generateFtsQuery<Post>({ title: query, description: query }) },
  })

  return posts
})
