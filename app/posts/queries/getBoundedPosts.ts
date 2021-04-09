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
    // const posts = await db.$queryRaw<CircleLocation[]>(
    //   `
    //   DO $$
    //   DECLARE
    //     location record;
    //     result json[];
    //   BEGIN
    //     FOR location in SELECT locations from "Post"
    //     LOOP
    //       RETURN;
    //     END LOOP;
    //   END;
    //   $$
    //   `
    // )

    const posts = db.post.findMany()

    return posts
  }
)
