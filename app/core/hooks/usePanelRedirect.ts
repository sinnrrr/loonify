import { useRouter } from "@blitzjs/core"

export type PanelRedirect = () => void

export const usePanelRedirect: () => PanelRedirect = () => {
  const router = useRouter()

  return () => router.push("/office")
}
