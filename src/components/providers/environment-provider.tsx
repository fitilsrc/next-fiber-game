import { useTexture } from "@react-three/drei";
import { createContext, useContext } from "react";
import * as THREE from "three";

enum TerrainType {
  AERIAL_BEACH = "AERIAL_BEACH",
  GRASS_ROCK = "GRASS_ROCK",
  ROCKY_TERRAIN = "ROCKY_TERRAIN",
  COAST_SAND = "COAST_SAND",
  ROCKY_SNOW = "ROCKY_SNOW",
  ROCK = "ROCK",
  AERIAL_ROCKS = "AERIAL_ROCKS",
}

type EnvironmentState = {
  textures: Record<string, THREE.Texture>;
};

const EnvironmentContext = createContext<{
  state: EnvironmentState;
}>({
  state: {
    textures: {},
  },
});

const useEnvironmentContext = () => useContext(EnvironmentContext);

function EnvironmentProvider({ children }: { children: React.ReactNode }) {
  const [
    sand,
    rocky_grass,
    forest,
    snow,
    rock,
    grass,
    aerial_rocks,
  ] = useTexture([
    "/assets/textures/sand.webp",
    "/assets/textures/rocky_grass.webp",
    "/assets/textures/forest.webp",
    "/assets/textures/rocky_snow.webp",
    "/assets/textures/rock.webp",
    "/assets/textures/grass.webp",
    "/assets/textures/leaves.webp"
  ]);

  const state: EnvironmentState = {
    textures: {
      "AERIAL_BEACH": sand,
      "GRASS_ROCK": grass,
      "ROCKY_TERRAIN": rocky_grass,
      "COAST_SAND": sand,
      "ROCKY_SNOW": snow,
      "ROCK": rock,
      "AERIAL_ROCKS": aerial_rocks,
    },
  };

  return (
    <EnvironmentContext.Provider value={{ state }}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export { useEnvironmentContext, EnvironmentProvider, TerrainType };
