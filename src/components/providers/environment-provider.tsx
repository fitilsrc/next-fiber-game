import { useTexture } from "@react-three/drei";
import { createContext, useContext } from "react";
import * as THREE from "three";

enum TerrainType {
  SAND= "SAND",
  SAND_COAST = "SAND_COAST",
  GRASS = "GRASS",
  GRASS_FOREST = "GRASS_FOREST",
  GRASS_ROCKY = "GRASS_ROCKY",
  GRASS_BROWN = "GRASS_BROWN",
  ROCK = "ROCK",
  SNOW = "SNOW",
  // AERIAL_BEACH = "AERIAL_BEACH",

  // ROCKY_TERRAIN = "ROCKY_TERRAIN",
  //

  // AERIAL_ROCKS = "AERIAL_ROCKS",
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
    sand_coast,
    grass,
    grass_forest,
    grass_rocky,
    grass_brown,
    rock,
    snow,
  ] = useTexture([
    "/assets/textures/sand.webp",
    "/assets/textures/sand_coast.webp",
    "/assets/textures/grass.webp",
    "/assets/textures/grass_forest.webp",
    "/assets/textures/grass_rocky.webp",
    "/assets/textures/grass_brown.webp",
    "/assets/textures/rock.webp",
    "/assets/textures/snow.webp",
  ]);

  const state: EnvironmentState = {
    textures: {
      "SAND": sand,
      "SAND_COAST": sand_coast,
      "GRASS": grass,
      "GRASS_FOREST": grass_forest,
      "GRASS_ROCKY": grass_rocky,
      "GRASS_BROWN": grass_brown,
      "ROCK": rock,
      "SNOW": snow,
    },
  };

  return (
    <EnvironmentContext.Provider value={{ state }}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export { useEnvironmentContext, EnvironmentProvider, TerrainType };
