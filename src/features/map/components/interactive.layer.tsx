import ActiveTile from "@/features/map/components/active-tile";
import { prepareHexagonalCoordinates } from "@/lib/utils";
import { useBounds } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { useMapStore } from "@/components/providers/map-provider";
import { BuildingsLayer } from "./buildings.layer";
import { useEnvironmentContext } from "@/components/providers/environment-provider";

export const InteractiveLayer = () => {
  const { state } = useEnvironmentContext();
  const { active, setActiveTile, setCameraTarget } = useMapStore((state) => state);
  const bounds = useBounds();

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    const tile = state.terrain.find((tile) => tile.id === e.object.uuid);
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

  return (
    <group
      onClick={handleClick}
      onPointerMissed={(e) => e.button === 0 && bounds.refresh().fit()}
    >
      <BuildingsLayer />
      {state.terrain.map((tile) => {
        const [x, y, z] = tile.position;
        const position = prepareHexagonalCoordinates(x, tile.height, z);

        return <ActiveTile key={tile.id} position={position} uuid={tile.id} />;
      })}
    </group>
  );
};
