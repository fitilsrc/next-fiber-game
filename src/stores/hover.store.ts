import { create } from "zustand";

export type HoverState = {
  hover: string | null | undefined;
};

export type HoverActions = {
  setHover: (uuid: string | null | undefined) => void;
};

export type HoverStore = HoverState & HoverActions;

export const useHoverStore = create<HoverStore>()((set) => ({
  hover: null,
  setHover: (uuid) => set({ hover: uuid }),
}));
