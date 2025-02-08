import * as THREE from "three";
import { TerrainTypeEnum } from "./tile.type";

export enum ResourcesEnum {
  COAL = "COAL",
  IRON = "IRON",
  STONE = "STONE",
  WOOD = "WOOD",
  MEAT = "MEAT",
  CLAY = "CLAY",
}

export type ResourceType = {
  type: ResourcesEnum;
  amount: number;
  depleted?: boolean;
}

export type TileResourcesType = {
  id: string;
  tileId: string;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  resources: ResourceType[];
  terrainType: TerrainTypeEnum;
  model: ModelEnum | null;
}

export enum ModelEnum {
  COAL = "COAL",
  IRON = "IRON",
  STONE = "STONE",
  TREE = "TREE",
  PINE_TREE = "PINE_TREE",
  MEAT = "MEAT",
  CLAY = "CLAY",
  COAL_IRON = "COAL_IRON",
  IRON_STONE = "IRON_STONE",
  MEAT_TREE = "MEAT_TREE",
  MEAT_PINE_TREE = "MEAT_PINE_TREE",
  MEAT_PINE_TREE_STONE = "MEAT_PINE_TREE_STONE",
  PINE_TREE_STONE = "PINE_TREE_STONE",
  STONE_TREE = "STONE_TREE",
  COAL_PINE_TREE = "COAL_PINE_TREE",
  MEAT_STONE_TREE = "MEAT_STONE_TREE",
}
