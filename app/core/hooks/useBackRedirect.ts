import { useRouter } from "@blitzjs/core"

export const useBackRedirect = (): (() => void) => {
  const router = useRouter()

  return () => router.back()
}
