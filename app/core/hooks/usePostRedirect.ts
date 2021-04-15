import { useRouter } from "@blitzjs/core"

export const QuickMode = "quick" as const
export const FullMode = "full" as const

export type PostMode = typeof QuickMode | typeof FullMode
export type PostRedirect = (postId?: number, mode?: PostMode) => void

export const usePostRedirect: () => PostRedirect = () => {
  const router = useRouter()

  return (postId, mode = "full") => {
    let redirectTo = "/office/posts/"

    if (!!!postId) redirectTo += "new"
    else {
      if (mode === FullMode) redirectTo += postId
      if (mode === QuickMode) redirectTo += postId + "/quick"
    }

    router.push(redirectTo)
  }
}
