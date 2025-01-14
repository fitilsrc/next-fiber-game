"use client";

import { createContext, useContext, useRef } from "react";

import { type ActiveTileStore, createActiveTileStore, initActiveTileStore } from "@/stores/active-tile-store";
import { useStore } from "zustand";

export type ActiveTileStoreApi = ReturnType<typeof createActiveTileStore>

export const ActiveTileStoreContext = createContext<ActiveTileStoreApi | undefined>(
  undefined,
)

export const ActiveTileStoreProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const storeRef = useRef<ActiveTileStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createActiveTileStore(initActiveTileStore())
  }

  return (
    <ActiveTileStoreContext.Provider value={storeRef.current}>
      {children}
    </ActiveTileStoreContext.Provider>
  )
}

export const useActiveTileStore = <T,>(
  selector: (store: ActiveTileStore) => T,
): T => {
  const activeTileStoreContext = useContext(ActiveTileStoreContext)

  if (!activeTileStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(activeTileStoreContext, selector)
}
