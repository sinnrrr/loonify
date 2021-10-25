import { useRouter } from "blitz"

export const QuickMode = "quick" as const
export const FullMode = "full" as const

export type PostMode = typeof QuickMode | typeof FullMode
export type PostRedirect = (postId?: number, mode?: PostMode) => void

export const usePostRedirect: () => PostRedirect = () => {
  const router = useRouter()

  return (postId, mode = "full") => {
    let redirectTo = "/office"

    if (!!!postId) redirectTo += "/posts/new"
    else {
      if (mode === FullMode) redirectTo += "/posts/" + postId
      if (mode === QuickMode) redirectTo += "/panel/" + postId
    }

    router.push(redirectTo)
  }
}
