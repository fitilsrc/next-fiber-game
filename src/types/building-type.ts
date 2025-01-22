export enum BuildingsEnum {
  TOWN_HALL = "TOWN_HALL",
  TOWER = "TOWER",
}

export type BuildingType = {
  id: string;
  type: BuildingsEnum;
  condition: number;
  ruined?: boolean;
}