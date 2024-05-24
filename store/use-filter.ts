import { usePathname, useRouter } from "next/navigation";
import { create } from "zustand";

interface filterProps {
  page: number | undefined;
  setPage: (page: number) => void;
  limit: number | undefined;
  setLimit: (limit: number) => void;
  search: string | undefined;
  setSearch: (s: string | undefined) => void;
  startDate: string | undefined;
  setStartDate: (startDate: string | undefined) => void;
  endDate: string | undefined;
  setEndDate: (endDate: string | undefined) => void;
}

export const UseFilterRouter = create<filterProps>((set) => ({
  page: 1,
  setPage: (page) => set({ page }),
  limit: 10,
  setLimit: (limit) => set({ limit }),
  search: undefined,
  setSearch: (search) => set({ search }),
  startDate: undefined,
  setStartDate: (startDate) => set({ startDate }),
  endDate: undefined,
  setEndDate: (endDate) => set({ endDate })
}));
