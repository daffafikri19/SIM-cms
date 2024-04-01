import { create } from "zustand";

interface TokenProps {
    token: string,
    setToken: (token: string) => void;
}

export const useToken = create<TokenProps>((set) => ({
    token: "",
    setToken: (token) => set({ token })
}))