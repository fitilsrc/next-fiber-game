import { createStore } from "zustand/vanilla";
import * as THREE from "three";

export type ActiveTileState = {
  id: string | undefined | null;
  position: THREE.Vector3
}

export type ActiveTileActions = {
  setActiveTile: (id: string, position: THREE.Vector3) => void
  resetActiveTile: () => void
}

export type ActiveTileStore = ActiveTileState & ActiveTileActions

export const initActiveTileStore = (): ActiveTileState => {
  return { id: null, position: new THREE.Vector3(0, 0, 0) }
}

export const createActiveTileStore = (initialState: ActiveTileState = { id: null, position: new THREE.Vector3(0, 0, 0) }) => {
  return createStore<ActiveTileStore>()((set) => ({
    ...initialState,
    setActiveTile: (id, position) => set(() => ({ id: id, position: position })),
    resetActiveTile: () => set(() => ({ id: null, position: new THREE.Vector3(0, 0, 0)}))
  }))
}
