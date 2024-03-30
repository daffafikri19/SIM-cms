import { create } from "zustand";

interface ThemeStore {
    isDarkMode: boolean,
    setIsDarkMode: (isDarkMode: boolean) => void;
}

export const useThemeContext = create<ThemeStore>((set) => ({
    isDarkMode: false,
    setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode })
}))