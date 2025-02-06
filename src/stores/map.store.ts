import { createStore } from "zustand/vanilla";
import { TileResourcesType, TileType } from "@/types";

export type MapState = {
  terrain: TileType[];
  resources: TileResourcesType[];
}

export type MapActions = {}

export type MapStore = MapState & MapActions

export const initMapStore = (
  terrain: TileType[],
  resources: TileResourcesType[]
): MapState => {
  return {
    terrain,
    resources,
  }
}

export const defaultMapState: MapState = {
  terrain: [],
  resources: [],
}

export const createMapStore = (initialState: MapState = defaultMapState) => {
  return createStore<MapStore>()((set) => ({
    ...initialState,
  }))
}
