import { createStore } from "zustand/vanilla";

import { PlayerResourceType, TaskType } from "@/types/game.type";

export type GameProgressState = {
  resources: PlayerResourceType[];
  tasks: TaskType[];
}

export type GameProgressActions = {
  addPlayerResource: (resource: PlayerResourceType) => void;
  addPlayerTask: (task: TaskType) => void;
}

export type GameProgressStore = GameProgressState & GameProgressActions;

export const initGameProgressState = (
  resources: PlayerResourceType[],
  tasks: TaskType[]
): GameProgressState => {
  return {
    resources,
    tasks,
  };
};

export const defaultGameProgressState: GameProgressState = {
  resources: [],
  tasks: [],
};

export const useGameProgressStore = (initialState: GameProgressState = defaultGameProgressState) => createStore<GameProgressStore>()((set) => ({
  ...initialState,
  addPlayerResource: (resource: PlayerResourceType) => set((state) => {
    const existingResource = state.resources.find((r) => r.id === resource.id);
    if (existingResource) {
      existingResource.amount += resource.amount;
    } else {
      state.resources.push(resource);
    }
    return state;
  }),
  addPlayerTask: (task: TaskType) => set((state) => ({ tasks: [...state.tasks, task] })),
}));
