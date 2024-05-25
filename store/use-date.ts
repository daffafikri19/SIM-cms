import { create } from "zustand";

interface props {
    currentDate: Date;
    setCurrentDate: (currentDate: Date) => void;
}

export const useCurrentDate = create<props>((set) => ({
    currentDate: new Date(Date.now()),
    setCurrentDate: (currentDate) => set({ currentDate }),
}));