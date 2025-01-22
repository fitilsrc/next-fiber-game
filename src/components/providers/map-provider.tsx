"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import { createMapStore, initMapStore, type MapStore } from "@/stores/map-store";

export type MapStoreApi = ReturnType<typeof createMapStore>

export const MapStoreContext = createContext<MapStoreApi | undefined>(
  undefined,
)

export const MapStoreProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const storeRef = useRef<MapStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createMapStore(initMapStore())
  }

  return (
    <MapStoreContext.Provider value={storeRef.current}>
      {children}
    </MapStoreContext.Provider>
  )
}

export const useMapStore = <T,>(
  selector: (store: MapStore) => T,
): T => {
  const mapStoreContext = useContext(MapStoreContext)

  if (!mapStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(mapStoreContext, selector)
}
