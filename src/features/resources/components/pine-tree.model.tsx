import * as THREE from "three";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { ModelEnum, TileResourcesType } from "@/types";
import { Instance, Instances } from "@react-three/drei";

export const PineTreeModel = ({ tiles }: { tiles: TileResourcesType[] }) => {
  const { state } = useEnvironmentContext();
  const { nodes, materials } = state.models[ModelEnum.PINE_TREE];

  return (
    <group dispose={null}>
      {nodes.pine_tree instanceof THREE.Mesh && (
        <Instances geometry={nodes.pine_tree.geometry}>
          <meshToonMaterial {...materials[nodes.pine_tree.material.name]} />
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
  );
};
