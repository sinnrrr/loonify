import { useRouter } from "blitz"

export const useBackRedirect = (): (() => void) => {
  const router = useRouter()

  return () => router.back()
}
