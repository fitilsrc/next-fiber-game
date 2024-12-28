import { TerrainType } from "@/components/providers/environment-provider";

export type TileType = {
  id: string;
  position: PositionType;
  color: string;
  height: number;
  type: TerrainType;
  plant: PlantType | null;
  building: BuildingType | null;
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

export enum BuildingType {
  HOUSE = "HOUSE",
  CASTLE = "CASTLE",
  TOWER = "TOWER",
  WINDMILL = "WINDMILL",
}

export enum AnimalType {
  SHEEP = "SHEEP",
  DEER = "DEER",
  HORSE = "HORSE",

}

export type PositionType = [number, number, number];
