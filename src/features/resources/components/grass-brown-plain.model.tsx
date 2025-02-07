import * as THREE from "three";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { TerrainTypeEnum, TileType } from "@/types";
import { Instance, Instances } from "@react-three/drei";
import { prepareHexagonalCoordinates } from "@/lib/utils";

export interface GrassBrownPlainModelProps {
  tiles: TileType[];
}

export const GrassBrownPlainModel = ({
  tiles,
}: GrassBrownPlainModelProps) => {
  const { state } = useEnvironmentContext();
  const { nodes, materials } =
    state.models[TerrainTypeEnum.GRASS_BROWN];

  return (
    <>
      {nodes.plane instanceof THREE.Mesh && (
        <Instances geometry={nodes.plane.geometry}>
          <meshToonMaterial {...materials[nodes.plane.material.name]} />
          {tiles.map((tile: TileType) => {
            const [x, y, z] = tile.position;
            const position = prepareHexagonalCoordinates(
              x,
              tile.height + 0.005,
              z
            );
            return (
              <Instance
                key={tile.id}
                position={position}
                rotation={tile.rotation}
              />
            );
          })}
        </Instances>
      )}
    </>
  )
}