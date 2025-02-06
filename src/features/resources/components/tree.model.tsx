import * as THREE from "three";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { ModelEnum, TileResourcesType } from "@/types";

export const TreeModel = ({ tiles }: { tiles: TileResourcesType[] }) => {
  const { state } = useEnvironmentContext();
  const { nodes, materials } = state.models[ModelEnum.TREE];

  return (
    <group dispose={null}>
      {tiles.map((tile) => (
        <group
          key={tile.id}
          dispose={null}
          position={tile.position}
          rotation={tile.rotation}
        >
          {Object.values(nodes).map((node) => {
            if (node instanceof THREE.Mesh) {
              return (
                <mesh
                  key={node.uuid}
                  geometry={node.geometry}
                  position={node.position}
                  scale={node.scale}
                >
                  <meshToonMaterial {...materials[node.material.name]} />
                </mesh>
              );
            }
          })}
        </group>
      ))}
    </group>
  );
};
