import { Size } from "@prisma/client";
import { create } from "zustand";

export type SelectSizeState = {
  selectedSize: Size | null;
  toggleSelectedSize: (value: Size | null) => void;
};

export const createSelectSize = create<SelectSizeState>((set, get) => ({
  selectedSize: null,
  toggleSelectedSize: (value: Size | null) => {
    set({ selectedSize: value });
  },
}));
