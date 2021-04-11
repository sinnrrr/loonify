import { useSession } from "@blitzjs/core"

export const useAuthor = (ownerId: number): boolean => useSession().userId === ownerId
