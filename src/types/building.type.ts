import * as THREE from "three";

export enum BuildingsEnum {
  TOWN_HALL = "TOWN_HALL",
  TOWER = "TOWER",
}

export type BuildingType = {
  id: string;
  tileId: string;
  position: THREE.Vector3;
  type: BuildingsEnum;
  condition: number;
  isUnderConstruction?: boolean;
  ruined?: boolean;
}
