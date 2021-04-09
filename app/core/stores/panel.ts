import { ReactNode } from "react"
import create from "zustand"
import HelloComponent from "../components/HelloComponent"
import SearchComponent from "../components/SearchComponent"

export type PanelState = {
  isOpen: boolean
  setOpen: () => void
  setClose: () => void

  children?: ReactNode
  setChildren: (childen: ReactNode) => void

  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const usePanelStore = create<PanelState>((set) => ({
  isOpen: false,
  setClose: () => set(() => ({ isOpen: false })),
  setOpen: () => set(() => ({ isOpen: true })),

  children: null,
  setChildren: (children) => set(() => ({ children })),

  searchQuery: "",
  setSearchQuery: (searchQuery) => set(() => ({ searchQuery })),
}))
