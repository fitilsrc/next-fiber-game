import * as THREE from "three";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { ModelEnum, TileResourcesType } from "@/types";

export const AnimalModel = ({ tiles }: { tiles: TileResourcesType[] }) => {
  const { state } = useEnvironmentContext();
  const { nodes, materials } = state.models[ModelEnum.MEAT];

  return (
    <group dispose={null}>
      {tiles.map((tile) => (
        <group
          key={tile.id}
          dispose={null}
          position={tile.position}
          rotation={tile.rotation}
        >
          <group scale={0.079}>
            <primitive object={nodes.Bone001} />
            <primitive object={nodes.Bone022} />
            <primitive object={nodes.Bone023} />
            <primitive object={nodes.Bone031} />
            <primitive object={nodes.Bone033} />

            {
              Object.values(nodes).map((node: THREE.Object3D) => {
                if (node instanceof THREE.SkinnedMesh) {
                  return <skinnedMesh
                    key={node.uuid}
                    geometry={node.geometry}
                    material={materials[node.material.name]}
                    skeleton={node.skeleton}
                  />
                }
              })
            }
          </group>
        </group>
      ))}
    </group>
  );
};
