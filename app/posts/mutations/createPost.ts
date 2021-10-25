import { resolver } from "blitz"
import db, { PostType } from "db"
import { CreatePost } from "../validations"

export default resolver.pipe(resolver.zod(CreatePost), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const post = await db.post.create({ data: { ...input, type: input.type as PostType } })

  return post
})
