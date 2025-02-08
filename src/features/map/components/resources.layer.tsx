import { extend, type ShaderMaterialProps } from "@react-three/fiber";

import {
  TreeMaterial,
  TreeUniforms,
} from "@/features/terrain/components/materials/tree.material";
import { ModelEnum } from "@/types";
import {
  AnimalModel,
  CoalModel,
  CoalPineTreeModel,
  DummyModel,
  PineTreeModel,
  PineTreeStoneModel,
  TreeModel,
} from "@/features/resources/components";
import { useMapStore } from "@/components/providers/map-provider";
import React from "react";

extend({ TreeMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      treeMaterial: ShaderMaterialProps & Partial<TreeUniforms>;
    }
  }
}

const ModelMap = {
  [ModelEnum.COAL]: CoalModel,
  [ModelEnum.CLAY]: DummyModel,
  [ModelEnum.IRON]: DummyModel,
  [ModelEnum.STONE]: DummyModel,
  [ModelEnum.TREE]: TreeModel,
  [ModelEnum.PINE_TREE]: PineTreeModel,
  [ModelEnum.MEAT]: AnimalModel,
  [ModelEnum.COAL_IRON]: DummyModel,
  [ModelEnum.IRON_STONE]: DummyModel,
  [ModelEnum.MEAT_TREE]: DummyModel,
  [ModelEnum.MEAT_PINE_TREE]: DummyModel,
  [ModelEnum.MEAT_PINE_TREE_STONE]: DummyModel,
  [ModelEnum.PINE_TREE_STONE]: PineTreeStoneModel,
  [ModelEnum.STONE_TREE]: DummyModel,
  [ModelEnum.COAL_PINE_TREE]: CoalPineTreeModel,
  [ModelEnum.MEAT_STONE_TREE]: DummyModel,
};

export const ResourceLayer = () => {
  const resources = useMapStore((state) => state.resources);

  return (
    <group>
      {Object.values(ModelEnum).map((model) => {
        const ModelComponent = ModelMap[model];
        const tiles = resources.filter((resource) => resource.model === model);

        console.log(model, tiles.length)

        return <ModelComponent key={model} model={model} tiles={tiles} />;
      })}
    </group>
  );
};
