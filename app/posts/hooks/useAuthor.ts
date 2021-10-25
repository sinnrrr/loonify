import { useSession } from "blitz"

export const useAuthor = (ownerId: number): boolean => useSession().userId === ownerId
