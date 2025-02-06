import * as THREE from "three";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { TerrainTypeEnum } from "@/types";

export const GrassBrownPlainModel = () => {
  const { state } = useEnvironmentContext();
  const { nodes, materials } =
    state.models[TerrainTypeEnum.GRASS_BROWN];

  return (
    <>
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
          )
        }
      })}
    </>
  )
}