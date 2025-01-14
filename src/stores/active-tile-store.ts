import { createStore } from "zustand/vanilla";

export type ActiveTileState = {
  id: string | undefined | null;
}

export type ActiveTileActions = {
  setActiveTile: (id: string) => void
  resetActiveTile: () => void
}

export type ActiveTileStore = ActiveTileState & ActiveTileActions

export const initActiveTileStore = (): ActiveTileState => {
  return { id: null }
}

export const createActiveTileStore = (initialState: ActiveTileState = {id: null}) => {
  return createStore<ActiveTileStore>()((set) => ({
    ...initialState,
    setActiveTile: (id) => set(() => ({id: id})),
    resetActiveTile: () => set(() => ({id: null}))
  }))
}
