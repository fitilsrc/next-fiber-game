import { TerrainType } from "@/components/providers/environment-provider";

export type HeightMapType = {
  x: number;
  y: number;
  height: number;
};


export type TileType = {
  id: string;
  position: PositionType;
  color: string;
  height: number;
  type: TerrainType;
  plant: PlantType | null;
  animal: AnimalType | null;
  environment: EnvironmentType | null;
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
