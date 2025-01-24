import { createStore } from "zustand/vanilla";
import * as THREE from "three";
import { BuildingType, TileType } from "@/types";

export type MapState = {
  buildings: BuildingType[];
  active: TileType | undefined | null;
  hovered: string | undefined | null;
  cameraTarget: THREE.Vector3
}

export type MapActions = {
  constructBuilding: (building: BuildingType) => void
  setActiveTile: (tile: TileType) => void
  setHoveredTile: (tile: TileType) => void
  setCameraTarget: (target: THREE.Vector3) => void
  resetActiveTile: () => void
}

export type MapStore = MapState & MapActions

export const initMapStore = (): MapState => {
  return {
    buildings: [],
    active: null,
    hovered: null,
    cameraTarget: new THREE.Vector3(0, 0, 0)
  }
}

export const defaultMapState: MapState = {
  buildings: [],
  active: null,
  hovered: null,
  cameraTarget: new THREE.Vector3(0, 0, 0),
}


export const createMapStore = (initialState: MapState = defaultMapState) => {
  return createStore<MapStore>()((set) => ({
    ...initialState,
    constructBuilding: (building) => set((state) => ({ buildings: [...state.buildings, building] })),
    setActiveTile: (tile) => set(() => ({ active: tile })),
    setHoveredTile: (tile) => set(() => ({ active: tile })),
    setCameraTarget: (target) => set(() => ({cameraTarget: target})),
    resetActiveTile: () => set(() => ({ active: null }))
  }))
}
