import { PostType } from ".prisma/client"
import { ALLOWED_POST_TYPES } from "app/posts/constants"
import { SecurePassword } from "blitz"
import db from "db"
import * as faker from "faker"

const getRandomArrayValue = <T>(array: any[]): T => {
  return array[Math.floor(Math.random() * array.length)] as T
}

const seed = async () => {
  await db.user.create({
    data: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      hashedPassword: await SecurePassword.hash(faker.internet.password()),
    },
  })

  await db.category.create({ data: { name: faker.vehicle.type() } })
  await db.category.create({
    data: {
      name: faker.vehicle.type(),
      parentId: (await db.category.findFirst({ where: { parentId: null } }))!.id,
    },
  })

  await db.post.create({
    data: {
      title: faker.lorem.paragraph(),
      description: faker.lorem.paragraphs(10),
      type: getRandomArrayValue<PostType>(ALLOWED_POST_TYPES),
      ownerId: (await db.user.findFirst())!.id,
      categoryId: (await db.category.findFirst())!.id,
    },
  })
}

export default seed
