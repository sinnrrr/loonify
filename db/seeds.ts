import { PostType, Prisma, User } from ".prisma/client"
import { SecurePassword } from "@blitzjs/core/server"
import { ALLOWED_POST_TYPES } from "app/posts/constants"
import db from "db"
import * as faker from "faker"

const getRandomArrayValue = <T>(array: any[]): T => {
  return array[Math.floor(Math.random() * array.length)] as T
}

const seed = async () => {
  await db.user.create({
    data: {
      id: 1,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: "test@test.com",
      phone: faker.phone.phoneNumber(),
      hashedPassword: await SecurePassword.hash("123asd123"),
    },
  })

  await db.category.create({ data: { id: 1, name: faker.vehicle.type() } })
  await db.category.create({ data: { id: 2, name: faker.vehicle.type(), parentId: 1 } })

  await db.post.create({
    data: {
      title: faker.lorem.paragraph(),
      description: faker.lorem.paragraphs(10),
      type: getRandomArrayValue<PostType>(ALLOWED_POST_TYPES),
      ownerId: 1,
      categoryId: 1,
    },
  })
}

export default seed
