import { ReactNode } from "react"
import create from "zustand"

export type PanelState = {
  isOpen: boolean
  setOpen: () => void
  setClose: () => void

  children?: ReactNode
  setChildren: (childen: ReactNode) => void

  isSearching: boolean
  setIsSearching: (isSearching: boolean) => void

  searchQuery: string
  setSearchQuery: (query: string) => void

  upperIsOpen: boolean
  upperToggleIsOpen: () => void
  upperSetIsOpen: (state: boolean) => void
}

export const usePanelStore = create<PanelState>((set) => ({
  isOpen: false,
  setClose: () => set(() => ({ isOpen: false })),
  setOpen: () => set(() => ({ isOpen: true })),

  children: null,
  setChildren: (children) => set(() => ({ children })),

  isSearching: false,
  setIsSearching: (isSearching) => set(() => ({ isSearching })),

  searchQuery: "",
  setSearchQuery: (searchQuery) => set(() => ({ searchQuery })),

  upperIsOpen: true,
  upperSetIsOpen: (upperIsOpen) => set(() => ({ upperIsOpen })),
  upperToggleIsOpen: () => set((state) => ({ upperIsOpen: !state.upperIsOpen })),
}))
