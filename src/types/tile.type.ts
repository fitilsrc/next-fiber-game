import * as THREE from "three";
import { ResourcesEnum } from "./resource.type";

export enum TerrainTypeEnum {
  SAND_COAST = "SAND_COAST",
  SAND = "SAND",
  GRASS = "GRASS",
  GRASS_FOREST = "GRASS_FOREST",
  GRASS_ROCKY = "GRASS_ROCKY",
  GRASS_BROWN = "GRASS_BROWN",
  ROCK = "ROCK",
  SNOW = "SNOW",
};

export type ResourceMapType = Record<TerrainTypeEnum, Array<{type: ResourcesEnum, probability: number}>>;

export type TileType = {
  id: string;
  position: PositionType;
  color: string;
  height: number;
  rotation: THREE.Euler;
  type: TerrainTypeEnum;
}

export enum PlantType {
  TREE = "TREE",
  PINE_TREE = "PINE_TREE",
  BUSH = "BUSH",
}

export enum EnvironmentType {
  ROCK = "ROCK",
  WATER = "WATER",
}

export enum AnimalType {
  SHEEP = "SHEEP",
  DEER = "DEER",
  HORSE = "HORSE",

}

export type PositionType = [number, number, number];
