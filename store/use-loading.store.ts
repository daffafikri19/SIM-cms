import { create } from "zustand";

interface LoadingState {
    loading: boolean,
    setLoading: (loading: boolean) => void;
}

export const useLoadingContext = create<LoadingState>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
}));