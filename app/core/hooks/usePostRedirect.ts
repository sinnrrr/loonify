import { useRouter } from "@blitzjs/core"

export type PostRedirect = (postId: number, quick?: boolean) => void

export const usePostRedirect: () => PostRedirect = () => {
  const router = useRouter()

  return (postId, quick) => router.push("/office/posts/" + postId + (quick ? "/quick" : ""))
}
