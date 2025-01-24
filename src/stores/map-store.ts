import { createStore } from "zustand/vanilla";
import * as THREE from "three";
import { BuildingType, ResourceType, TileType } from "@/types";

export type MapState = {
  buildings: BuildingType[];
  resources: ResourceType[];
  active: TileType | undefined | null;
  hovered: string | undefined | null;
  cameraTarget: THREE.Vector3
}

export type MapActions = {
  addResource: (resource: ResourceType) => void
  constructBuilding: (building: BuildingType) => void
  demolishBuilding: (building: BuildingType) => void
  setActiveTile: (tile: TileType) => void
  setHoveredTile: (tile: TileType) => void
  setCameraTarget: (target: THREE.Vector3) => void
  removeResource: (resource: ResourceType) => void
  resetActiveTile: () => void
}

export type MapStore = MapState & MapActions

export const initMapStore = (): MapState => {
  return {
    buildings: [],
    resources: [],
    active: null,
    hovered: null,
    cameraTarget: new THREE.Vector3(0, 0, 0)
  }
}

export const defaultMapState: MapState = {
  buildings: [],
  resources: [],
  active: null,
  hovered: null,
  cameraTarget: new THREE.Vector3(0, 0, 0),
}


export const createMapStore = (initialState: MapState = defaultMapState) => {
  return createStore<MapStore>()((set) => ({
    ...initialState,
    addResource: (resource) => set((state) => ({ resources: [...state.resources, resource] })),
    constructBuilding: (building) => set((state) => ({ buildings: [...state.buildings, building] })),
    demolishBuilding: (building) => set((state) => ({ buildings: state.buildings.filter((b) => b.id !== building.id) })),
    setActiveTile: (tile) => set(() => ({ active: tile })),
    setHoveredTile: (tile) => set(() => ({ active: tile })),
    setCameraTarget: (target) => set(() => ({cameraTarget: target})),
    removeResource: (resource) => set((state) => ({ resources: state.resources.filter((r) => r.id !== resource.id) })),
    resetActiveTile: () => set(() => ({ active: null }))
  }))
}
