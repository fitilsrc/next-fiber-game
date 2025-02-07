import { ModelEnum, TerrainTypeEnum } from "@/types";
import { useGLTF, useTexture } from "@react-three/drei";
import { createContext, useContext, useMemo } from "react";
import * as THREE from "three";

enum Model {
  TREE = "TREE",
  PINE_TREE = "PINE_TREE",
  ROCK_FORMATION = "ROCK_FORMATION",
  ROCK = "ROCK",
  BUSH = "BUSH",
}

interface EnvironmentState {
  textures: Record<string, THREE.Texture>;
  models: Record<
    string,
    {
      nodes: { [name: string]: THREE.Object3D<THREE.Object3DEventMap> };
      materials: { [name: string]: THREE.Material };
      animations: THREE.AnimationClip[];
    }
  >;
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
    coalPineTree,
    pineTreeStone,
    meat,
    woodGrassBrownPlane,
    woodGrassForestPlane,
    woodGrassRockyPlane,
    snowPlain,
  ] = useGLTF([
    "/assets/models/tree.glb",
    "/assets/models/pine-tree.glb",
    "/assets/models/coal-pine-tree.glb",
    "/assets/models/pine-tree-stone.glb",
    "/assets/models/deer.glb",
    "/assets/models/wood-grass-brown-plane.glb",
    "/assets/models/wood-grass-forest-plane.glb",
    "/assets/models/wood-grass-rocky-plane.glb",
    "/assets/models/snow-plain.glb",
  ]);

  const models = useMemo(
    () => ({
      [TerrainTypeEnum.SNOW]: {
        nodes: snowPlain.nodes,
        materials: snowPlain.materials,
        animations: snowPlain.animations,
      },
      [TerrainTypeEnum.GRASS_BROWN]: {
        nodes: woodGrassBrownPlane.nodes,
        materials: woodGrassBrownPlane.materials,
        animations: woodGrassBrownPlane.animations,
      },
      [TerrainTypeEnum.GRASS_FOREST]: {
        nodes: woodGrassForestPlane.nodes,
        materials: woodGrassForestPlane.materials,
        animations: woodGrassForestPlane.animations,
      },
      [TerrainTypeEnum.GRASS_ROCKY]: {
        nodes: woodGrassRockyPlane.nodes,
        materials: woodGrassRockyPlane.materials,
        animations: woodGrassRockyPlane.animations,
      },
      [ModelEnum.MEAT]: {
        nodes: meat.nodes,
        materials: meat.materials,
        animations: meat.animations,
      },
      [ModelEnum.TREE]: {
        nodes: tree.nodes,
        materials: tree.materials,
        animations: tree.animations,
      },
      [ModelEnum.PINE_TREE]: {
        nodes: pineTree.nodes,
        materials: pineTree.materials,
        animations: pineTree.animations,
      },
      [ModelEnum.COAL_PINE_TREE]: {
        nodes: coalPineTree.nodes,
        materials: coalPineTree.materials,
        animations: coalPineTree.animations,
      },
      [ModelEnum.PINE_TREE_STONE]: {
        nodes: pineTreeStone.nodes,
        materials: pineTreeStone.materials,
        animations: pineTreeStone.animations,
      },
    }),
    []
  );

  const textures = useMemo(
    () => ({
      [TerrainTypeEnum.SAND]: sand,
      [TerrainTypeEnum.SAND_COAST]: sand_coast,
      [TerrainTypeEnum.GRASS]: grass,
      [TerrainTypeEnum.GRASS_FOREST]: grass_forest,
      [TerrainTypeEnum.GRASS_ROCKY]: grass_rocky,
      [TerrainTypeEnum.GRASS_BROWN]: grass_brown,
      [TerrainTypeEnum.ROCK]: rock,
      [TerrainTypeEnum.SNOW]: snow,
    }),
    []
  );

  const state: EnvironmentState = {
    textures,
    models,
  };

  return (
    <EnvironmentContext.Provider value={{ state }}>
      {children}
    </EnvironmentContext.Provider>
  );
}

useGLTF.preload([
  "/assets/models/tree.glb",
  "/assets/models/pine-tree.glb",
  "/assets/models/coal-pine-tree.glb",
  "/assets/models/pine-tree-stone.glb",
  "/assets/models/deer.glb",
]);

export { useEnvironmentContext, EnvironmentProvider };
