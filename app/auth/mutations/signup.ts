import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, firstName, password, phone }, ctx) => {
    const user = await db.user.create({
      data: {
        firstName,
        email: email.toLowerCase(),
        phone,
        hashedPassword: await SecurePassword.hash(password),
        role: "USER",
      },
      select: { id: true, firstName: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
