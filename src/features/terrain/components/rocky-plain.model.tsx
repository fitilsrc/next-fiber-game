import * as THREE from "three";
import { Instance, Instances } from "@react-three/drei";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { TerrainTypeEnum, TileResourcesType, TileType } from "@/types";
import { prepareHexagonalCoordinates } from "@/lib/utils";

export interface RockyPlainModelProps {
  tiles: TileType[];
}

export const RockyPlainModel = ({ tiles }: RockyPlainModelProps) => {
  const { state } = useEnvironmentContext();
  const { nodes, materials } = state.models[TerrainTypeEnum.ROCK];

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
  );
};
