import { create } from 'zustand';

interface SidebarStore {
    collapsed: boolean
    onExpand: () => void
    onCollapse: (state: boolean) => void
}

export const useSidebar = create<SidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set((state) => ({ collapsed: false })),
    onCollapse: (collapsed: boolean) => set({ collapsed }),
}));