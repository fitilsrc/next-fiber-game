import * as THREE from "three";

export enum ResourcesEnum {
  COAL = "COAL",
  IRON = "IRON",
  STONE = "STONE",
  WOOD = "WOOD",
  MEAT = "MEAT",
  CLAY = "CLAY",
}

export type ResourceType = {
  id: string;
  tileId: string;
  position: THREE.Vector3;
  type: ResourcesEnum;
  amount: number;
  depleted?: boolean;
}
