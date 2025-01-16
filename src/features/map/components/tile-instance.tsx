import * as THREE from "three";
import { Instance } from "@react-three/drei";

import { TileType } from "@/types";
import { prepareHexagonalCoordinates } from "@/lib/utils";

interface TileInstanceProps {
  tiles: TileType[];
  isMapped?: boolean;
}

export const TileInstance = ({ tiles, isMapped }: TileInstanceProps) => {
  return (
    <>
      {tiles.map((tile) => {
        const [x, y, z] = tile.position;
        const position = !isMapped
          ? prepareHexagonalCoordinates(x, tile.height * 0.5, z)
          : prepareHexagonalCoordinates(x, tile.height, z);
        const color = !isMapped ? tile.color : undefined;
        const scale = !isMapped
          ? new THREE.Vector3(1, Math.abs(tile.height), 1)
          : undefined;

        return (
          <Instance
            key={tile.id}
            position={position}
            uuid={tile.id}
            color={color}
            scale={scale}
          />
        );
      })}
    </>
  );
};
