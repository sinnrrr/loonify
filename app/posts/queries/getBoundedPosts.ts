import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

export const GetBoundedPosts = z.object({
  east: z.number(),
  west: z.number(),
  north: z.number(),
  south: z.number(),
})

export default resolver.pipe(
  resolver.zod(GetBoundedPosts),
  async ({ east, west, north, south }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const posts = await db.post.findMany({
      where: {
        // locations: {
        // equals: {
        //       lat: { gt: Math.min(east, west), lt: Math.max(east, west) },
        //       lng: { gt: Math.min(south, north), lt: Math.max(south, north) },
        // },
        // },
      },
    })

    return posts
  }
)
