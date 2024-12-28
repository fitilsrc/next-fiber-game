import { useGLTF, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { createContext, useContext } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

enum TerrainType {
  SAND= "SAND",
  SAND_COAST = "SAND_COAST",
  GRASS = "GRASS",
  GRASS_FOREST = "GRASS_FOREST",
  GRASS_ROCKY = "GRASS_ROCKY",
  GRASS_BROWN = "GRASS_BROWN",
  ROCK = "ROCK",
  SNOW = "SNOW",
}

enum Model {
  TREE = "TREE",
  PINE_TREE = "PINE_TREE",
  ROCK_FORMATION = "ROCK_FORMATION",
  ROCK = "ROCK",
  BUSH = "BUSH",
}

interface EnvironmentState {
  textures: Record<string, THREE.Texture>
  models: Record<string, {
    nodes: {[name: string]: THREE.Object3D<THREE.Object3DEventMap>};
    materials: {[name: string]: THREE.Material};
    animations: THREE.AnimationClip[];
  }>
}

const EnvironmentContext = createContext<{
  state: EnvironmentState;
}>({
  state: {
    textures: {},
    models: {},
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

  const [
    tree,
    pineTree,
    rockFormation,
  ] = useGLTF([
    "/assets/models/tree.glb",
    "/assets/models/pine-tree.glb",
    "/assets/models/rock-formation.glb",
  ]);

  const state: EnvironmentState = {
    textures: {
      [TerrainType.SAND]: sand,
      [TerrainType.SAND_COAST]: sand_coast,
      [TerrainType.GRASS]: grass,
      [TerrainType.GRASS_FOREST]: grass_forest,
      [TerrainType.GRASS_ROCKY]: grass_rocky,
      [TerrainType.GRASS_BROWN]: grass_brown,
      [TerrainType.ROCK]: rock,
      [TerrainType.SNOW]: snow,
    },
    models: {
      [Model.TREE]: {
        nodes: tree.nodes,
        materials: tree.materials,
        animations: tree.animations,
      },
      [Model.PINE_TREE]: {
        nodes: pineTree.nodes,
        materials: pineTree.materials,
        animations: pineTree.animations,
      },
      [Model.ROCK_FORMATION]: {
        nodes: rockFormation.nodes,
        materials: rockFormation.materials,
        animations: rockFormation.animations,
      },
    },
  };

  return (
    <EnvironmentContext.Provider value={{ state }}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export { useEnvironmentContext, EnvironmentProvider, TerrainType, Model };
