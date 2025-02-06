import { prepareHexagonalCoordinates } from "@/lib/utils";
import { useBounds } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useMapStore } from "@/components/providers/map-provider";
import { BuildingsLayer } from "./buildings.layer";
import { ActiveTile } from "./active-tile.mesh";
import { useShallow } from "zustand/shallow";
import { useActiveTileStore } from "@/stores/active-tile.store";
import { useCameraStore } from "@/stores/camera.store";
import { TileType } from "@/types";

export const InteractiveLayer = () => {
  const { terrain } = useMapStore(useShallow((state) => state));
  const { setActiveTile } = useActiveTileStore((state) => state);
  const { setCameraTarget } = useCameraStore((state) => state);

  const bounds = useBounds();

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    const tile = terrain.find((tile: TileType) => tile.id === e.object.uuid);
    if (!tile) return;
    const [x, y, z] = tile.position;
    const position = prepareHexagonalCoordinates(x, tile.height, z);

    setCameraTarget(position);

    setActiveTile(tile);
    if (bounds) {
      e.delta <= 2 && bounds.refresh(e.object).clip().fit();
      bounds.lookAt({ target: position });
    }
  };

  console.log("interactive layer");

  return (
    <group
      onClick={handleClick}
      onPointerMissed={(e) => e.button === 0 && bounds.refresh().fit()}
    >
      <BuildingsLayer />
      {terrain.map((tile: TileType) => {
        const [x, y, z] = tile.position;
        const position = prepareHexagonalCoordinates(x, tile.height, z);

        return <ActiveTile key={tile.id} position={position} uuid={tile.id} />;
      })}
    </group>
  );
};
