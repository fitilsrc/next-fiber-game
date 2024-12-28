import {
  Model,
  useEnvironmentContext,
} from "@/components/providers/environment-provider";
import { PlantType, TileType } from "@/types";
import { memo } from "react";
import { Mesh } from "three";

interface PineTreeProps {
  position: [number, number];
  height: number;
  tile: TileType;
}

export const TreeModel = ({ position, height, tile }: PineTreeProps) => {
  const { state } = useEnvironmentContext();

  const treeModel = tile.plant === PlantType.TREE ? Model.TREE : Model.PINE_TREE;

  const { nodes, materials } = state.models[treeModel];
  const [x, y] = position;

  const scale = height + 0.1;

  return (
    <group dispose={null}>
      <group
        position={[x, tile.height * 0.5 - 0.1, y]}
        scale={[scale, scale, scale]}
        rotation={[0, Math.random() * Math.PI, 0]}
      >
        {Object.values(nodes).map((node) => {
          if (node instanceof Mesh)
            return (
              <mesh
                key={node.uuid}
                geometry={node.geometry}
                position={node.position}
                scale={node.scale}
                material={materials[node.material.name]}
                castShadow
                receiveShadow
              />
            );
        })}
      </group>
    </group>
  );
};

export default memo(TreeModel);
