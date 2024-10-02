// src/stores/counter-store.ts
import { create } from "zustand";

export type SortByState = {
  filterSortBy: string | undefined;
  toggleSortBy: (value: string) => void;
  resetSortBy: () => void;
};

export const createSoryByStore = create<SortByState>((set, get) => ({
  filterSortBy: undefined,
  toggleSortBy: (value: string) => {
    set({ filterSortBy: value });
  },
  resetSortBy: () => {
    set({ filterSortBy: undefined });
  },
}));
