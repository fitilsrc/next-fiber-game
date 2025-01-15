import { useEffect, useRef } from "react";

import * as THREE from "three";
import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { useActiveTileStore } from "@/components/providers/active-tile-provider";
import ActiveTile from "@/features/map/components/active-tile";
import { prepareHexagonalCoordinates } from "@/lib/utils";

export const InteractiveLayer = () => {
  const { id } = useActiveTileStore((state) => state);
  const { state } = useEnvironmentContext();

  const tiles = state.tiles;

  useEffect(() => {
    console.log(id)
  }, [id])

  return (
    <group>
      {tiles.map((tile) => {
        const [x, y, z] = tile.position;
        const position = prepareHexagonalCoordinates(x, tile.height, z);

        return <ActiveTile key={tile.id} position={position} uuid={tile.id} />;
      })}
    </group>
  );
};
