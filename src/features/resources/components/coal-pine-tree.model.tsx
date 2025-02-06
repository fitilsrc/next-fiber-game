import * as THREE from "three";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { ModelEnum, TileResourcesType } from "@/types";

export const CoalPineTreeModel = ({
  tiles,
}: {
  tiles: TileResourcesType[];
}) => {
  const { state } = useEnvironmentContext();
  const { nodes, materials } = state.models[ModelEnum.COAL_PINE_TREE];

  console.log(tiles);

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
                  <meshStandardMaterial
                    {...materials[node.material.name]}
                    flatShading
                  />
                </mesh>
              );
            }
          })}
        </group>
      ))}
    </group>
  );
};
