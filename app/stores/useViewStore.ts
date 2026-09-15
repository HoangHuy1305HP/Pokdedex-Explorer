import {create} from "zustand"

interface ViewMode {
    viewMode: "grid"|"list"
    setViewMode: (mode:"grid"|"list") => void
}

export const useViewStore  = create<ViewMode>((set) => ({
    viewMode: "grid",
    setViewMode: (mode) => set({viewMode:mode})
}))