import { resolver } from "blitz"
import db, { PostType } from "db"
import { UpdatePost } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdatePost),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const post = await db.post.update({
      where: { id },
      data: { ...data, type: data.type as PostType },
    })

    return post
  }
)
