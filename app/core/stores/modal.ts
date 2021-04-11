import { ReactNode } from "react"
import create from "zustand"

export type ModalState = {
  isOpen: boolean
  onOpen: (children: ReactNode) => () => void
  onClose: () => void

  children?: ReactNode
  setChildren: (childen: ReactNode) => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  onOpen: (children) => () => set(() => ({ isOpen: true, children })),
  onClose: () => set(() => ({ isOpen: false, children: null })),

  children: null,
  setChildren: (children) => set(() => ({ children })),
}))
