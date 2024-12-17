import { TerrainType } from "@/components/providers/environment-provider";

export type TileType = {
  id: string;
  position: PositionType;
  color: string;
  height: number;
  type: TerrainType;
}

export type PositionType = [number, number, number];
