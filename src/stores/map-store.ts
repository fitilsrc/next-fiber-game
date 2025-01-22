import { createStore } from "zustand/vanilla";
import * as THREE from "three";
import { BuildingType, TileType } from "@/types";
import { generateTerrain } from "@/lib/generator";

export type MapState = {
  map: TileType[];
  active: TileType | undefined | null;
  hovered: string | undefined | null;
  cameraTarget: THREE.Vector3
}

export type MapActions = {
  constructBuilding: (tile: TileType, building: BuildingType) => void
  setActiveTile: (tile: TileType) => void
  setHoveredTile: (tile: TileType) => void
  setCameraTarget: (target: THREE.Vector3) => void
  resetActiveTile: () => void
}

export type MapStore = MapState & MapActions

export const initMapStore = (): MapState => {
  return {
    map: generateTerrain(15),
    active: null,
    hovered: null,
    cameraTarget: new THREE.Vector3(0, 0, 0)
  }
}

export const defaultMapState: MapState = {
  map: [],
  active: null,
  hovered: null,
  cameraTarget: new THREE.Vector3(0, 0, 0),
}


export const createMapStore = (initialState: MapState = defaultMapState) => {
  return createStore<MapStore>()((set) => ({
    ...initialState,
    constructBuilding: (tile, building) => set((state) => {
      const tiles = state.map.filter((t) => t.id !== tile.id);
      const result: TileType = {...tile, building: building}
      return {
        map: [...tiles, result]
      }
    }),
    setActiveTile: (tile) => set(() => ({ active: tile })),
    setHoveredTile: (tile) => set(() => ({ active: tile })),
    setCameraTarget: (target) => set(() => ({cameraTarget: target})),
    resetActiveTile: () => set(() => ({ active: null }))
  }))
}
