import { useRouter } from "blitz"

export type IndexRedirect = () => void

export const useIndexRedirect = (): IndexRedirect => {
  const router = useRouter()

  return () => router.push("/office")
}
