import {
  useEnvironmentContext,
} from "@/components/providers/environment-provider";
import { ModelEnum, TileType } from "@/types";
import { memo } from "react";
import { Mesh } from "three";

interface RockModelProps {
  tile: TileType;
}

const RockModel = ({
  tile
}: RockModelProps) => {
  const { state } = useEnvironmentContext();
  const { nodes, materials } = state.models[ModelEnum.STONE];

  const [x, y] = tile.position;

  return (
    <group
      dispose={null}
      position={[0, tile.height * 0.5 - 0.1, 0]}
      // rotation={[0, Math.random() * Math.PI, 0]}
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
  );
};

export default memo(RockModel);
