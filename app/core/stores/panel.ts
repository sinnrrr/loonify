import { ReactNode } from "react"
import create from "zustand"

export type PanelState = {
  isOpen: boolean
  setOpen: () => void
  setClose: () => void

  previousChildren?: ReactNode
  setPreviousChildren: (childen: ReactNode) => void

  currentChildren?: ReactNode
  setCurrentChildren: (childen: ReactNode) => void

  isSearching: boolean
  setIsSearching: (isSearching: boolean) => void

  searchQuery: string
  setSearchQuery: (query: string) => void

  selectedPost?: number
  setSelectedPost: (selectedPost: number) => void

  upperIsOpen: boolean
  upperToggleIsOpen: () => void
  upperSetIsOpen: (state: boolean) => void
}

export const usePanelStore = create<PanelState>((set) => ({
  isOpen: false,
  setClose: () => set(() => ({ isOpen: false })),
  setOpen: () => set(() => ({ isOpen: true })),

  previousChildren: null,
  setPreviousChildren: (previousChildren) => set(() => ({ previousChildren })),

  currentChildren: null,
  setCurrentChildren: (currentChildren) => set(() => ({ currentChildren })),

  isSearching: false,
  setIsSearching: (isSearching) => set(() => ({ isSearching })),

  searchQuery: "",
  setSearchQuery: (searchQuery) => set(() => ({ searchQuery })),

  selectedPost: undefined,
  setSelectedPost: (selectedPost) => set(() => ({ selectedPost })),

  upperIsOpen: true,
  upperSetIsOpen: (upperIsOpen) => set(() => ({ upperIsOpen })),
  upperToggleIsOpen: () => set((state) => ({ upperIsOpen: !state.upperIsOpen })),
}))
