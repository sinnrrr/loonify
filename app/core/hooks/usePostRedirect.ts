import { useRouter } from "@blitzjs/core"

export type PostRedirect = (postId: number) => void

export const usePostRedirect: () => PostRedirect = () => {
  const router = useRouter()

  return (postId) => router.push("/posts/" + postId)
}
