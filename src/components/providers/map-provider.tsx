"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import { createMapStore, initMapStore, type MapStore } from "@/stores/map.store";
import { generateTerrain } from "@/lib/generator";

const MAP_SIZE = 15;

export type MapStoreApi = ReturnType<typeof createMapStore>

export const MapStoreContext = createContext<MapStoreApi | undefined>(
  undefined,
)

export const MapStoreProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const storeRef = useRef<MapStoreApi>(null!)

  const {terrain, resources} = generateTerrain(MAP_SIZE);

  if (!storeRef.current) {
    storeRef.current = createMapStore(initMapStore(
      terrain,
      resources
    ))
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
    throw new Error(`useMapStore must be used within MapStoreProvider`)
  }

  return useStore(mapStoreContext, selector)
}
