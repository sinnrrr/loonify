import { ReactNode } from "react"
import { usePanelStore } from "../stores/panel"

export type PanelRedirect = (to: ReactNode) => void

export const usePanelRedirect: () => PanelRedirect = () => {
  const { setCurrentChildren, setPreviousChildren } = usePanelStore()

  return (children) => {
    setCurrentChildren(children)
    setPreviousChildren(children)
  }
}
