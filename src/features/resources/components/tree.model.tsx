import * as THREE from "three";
import { Instance, Instances } from "@react-three/drei";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { ModelEnum, TileResourcesType } from "@/types";

export const TreeModel = ({ tiles }: { tiles: TileResourcesType[] }) => {
  const { state } = useEnvironmentContext();
  const { nodes, materials } = state.models[ModelEnum.TREE];

  return (
    <group dispose={null}>
      <group dispose={null}>
        {nodes.tree instanceof THREE.Mesh && (
          <Instances geometry={nodes.tree.geometry}>
            <meshToonMaterial {...materials[nodes.tree.material.name]} />
            {tiles.map((tile) => (
              <Instance
                key={tile.id}
                position={tile.position}
                rotation={tile.rotation}
              />
            ))}
          </Instances>
        )}
      </group>
    </group>
  );
};
