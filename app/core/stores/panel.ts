import { ReactNode } from "react"
import create from "zustand"

export type PanelState = {
  isOpen: boolean
  setOpen: () => void
  setClose: () => void

  child: ReactNode
}

export const usePanelStore = create<PanelState>((set) => ({
  isOpen: false,
  setClose: () => set(() => ({ isOpen: false })),
  setOpen: () => set(() => ({ isOpen: true })),

  child: null,
}))
