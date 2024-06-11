import { create } from "zustand";

interface props {
    name: string;
    setName: (name: string) => void;
    shift: string;
    setShift: (shift: string) => void;
    role: string;
    setRole: (role: string) => void;
}

export const useReporter = create<props>((set) => ({
    name: "",
    shift: "",
    role: "",
    setName: (name) => set({ name }),
    setRole: (role) => set({ role }),
    setShift: (shift) => set({ shift })
}))