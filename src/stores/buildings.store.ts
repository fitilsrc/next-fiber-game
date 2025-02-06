import { BuildingType } from "@/types";
import { create } from "zustand";

export type BuildingsState = {
  buildings: BuildingType[];
}

export type BuildingsActions = {
  constructBuilding: (building: BuildingType) => void
  updateBuilding: (building: BuildingType) => void
}

export type BuildingsStore = BuildingsState & BuildingsActions;

export const useBuildingsStore = create<BuildingsStore>()((set) => ({
  buildings: [],
  constructBuilding: (building: BuildingType) => set((state) => ({ buildings: [...state.buildings, building] })),
  updateBuilding: (building: BuildingType) => set((state) => ({ buildings: state.buildings.map(b => b.id === building.id ? building : b) })),
}));
