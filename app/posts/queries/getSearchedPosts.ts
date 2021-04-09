import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

export const GetBoundedPosts = z.object({
  query: z.string(),
})

export default resolver.pipe(resolver.zod(GetBoundedPosts), async ({ query }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const posts = await db.post.findMany({
    where: { OR: [{ title: { contains: query } }, { description: { contains: query } }] },
  })

  return posts
})
