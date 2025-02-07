import { ResourcesEnum } from "./resource.type";

export enum GoodsEnum {
  PLANK = "PLANK",
  FABRIC = "FABRIC",
  FOOD = "FOOD",
  LEATHER = "LEATHER",
}

export type PlayerResourceType = {
  id: string;
  resourceType: ResourcesEnum | GoodsEnum;
  amount: number;
};

export enum TaskTypeEnum {
  BUILDING = "BUILDING",
  RESEARCH = "RESEARCH",
  TRADE = "TRADE",
  COLLECT = "COLLECT",
}

export type TaskType = {
  id: string;
  progress: number;
  status: TaskStatusEnum;
};

export enum TaskStatusEnum {
  PENDING = "PENDING",
  PAUSED = "PAUSED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
};
