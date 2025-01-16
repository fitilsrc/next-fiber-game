import { useEffect } from "react";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { useActiveTileStore } from "@/components/providers/active-tile-provider";
import ActiveTile from "@/features/map/components/active-tile";
import { prepareHexagonalCoordinates } from "@/lib/utils";
import { useBounds } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

export const InteractiveLayer = () => {
  const { id, setActiveTile } = useActiveTileStore((state) => state);
  const { state } = useEnvironmentContext();
  const bounds = useBounds();

  const tiles = state.tiles;

  useEffect(() => {
    console.log(id);
  }, [id]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    console.log(e);
    const tile = tiles.find((tile) => tile.id === e.object.uuid);
    if (!tile) return;
    const [x, y, z] = tile.position;
    const position = prepareHexagonalCoordinates(x, tile.height, z);

    setActiveTile(e.object.uuid, position);
    if (bounds) {
      e.delta <= 2 && bounds.refresh(e.object).clip().fit();
      bounds.lookAt({ target: position });
    }
  };

  return (
    <group
      onClick={handleClick}
      onPointerMissed={(e) => e.button === 0 && bounds.refresh().fit()}
    >
      {tiles.map((tile) => {
        const [x, y, z] = tile.position;
        const position = prepareHexagonalCoordinates(x, tile.height, z);

        return <ActiveTile key={tile.id} position={position} uuid={tile.id} />;
      })}
    </group>
  );
};
