import { TileType } from "@/types";
import { create } from "zustand";

export type ActiveTileState = {
  active: TileType | undefined | null;
}

export type ActiveTileActions = {
  setActiveTile: (tile: TileType) => void
  resetActiveTile: () => void
}

export type ActiveTileStore = ActiveTileState & ActiveTileActions;

export const useActiveTileStore = create<ActiveTileStore>()((set) => ({
  active: null,
  setActiveTile: (tile) => set({ active: tile }),
  resetActiveTile: () => set({ active: null }),
}));
