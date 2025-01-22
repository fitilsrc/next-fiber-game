import { createStore } from "zustand/vanilla";
import * as THREE from "three";
import { Size } from "@react-three/fiber";

export type ActiveTileState = {
  id: string | undefined | null;
  hovered: string | undefined | null;
  position: THREE.Vector3
}

export type ActiveTileActions = {
  setActiveTile: (id: string, position: THREE.Vector3) => void
  setHoveredTile: (id: string) => void
  resetActiveTile: () => void
}

export type ActiveTileStore = ActiveTileState & ActiveTileActions

export const initActiveTileStore = (): ActiveTileState => {
  return {
    id: null,
    hovered: null,
    position: new THREE.Vector3(0, 0, 0)
  }
}

export const defaultActiveTileState: ActiveTileState = {
  id: null,
  hovered: null,
  position: new THREE.Vector3(0, 0, 0),
}


export const createActiveTileStore = (initialState: ActiveTileState = defaultActiveTileState) => {
  return createStore<ActiveTileStore>()((set) => ({
    ...initialState,
    setActiveTile: (id, position) => set(() => ({ id: id, position: position })),
    setHoveredTile: (id) => set(() => ({ id: id })),
    resetActiveTile: () => set(() => ({ id: null }))
  }))
}
