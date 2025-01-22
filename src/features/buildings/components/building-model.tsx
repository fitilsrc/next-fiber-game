import React from "react";

import { TileType } from "@/types";
import { prepareHexagonalCoordinates } from "@/lib/utils";

interface BuildingModelProps {
  tile: TileType;
}

export const BuildingModel = ({ tile }: BuildingModelProps) => {
  const [x, y, z] = tile.position;
  const position = prepareHexagonalCoordinates(x, tile.height, z);

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="red" flatShading />
      </mesh>
    </group>
  );
};
