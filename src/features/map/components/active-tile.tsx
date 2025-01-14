import { memo, useMemo } from 'react';

import * as THREE from "three";
import { useActiveTileStore } from '@/components/providers/active-tile-provider';
import { useEnvironmentContext } from '@/components/providers/environment-provider';
import { prepareHexagonalCoordinates } from '@/lib/utils';

const ActiveTile = () => {
  const { id } = useActiveTileStore((state) => state);
  const { state } = useEnvironmentContext();

  const hexagonTop = useMemo(() => {
    return new THREE.CylinderGeometry(1, 1, 0, 6);
  }, []);

  const tile = state.tiles.find((tile) => tile.id === id);

  if (!id || !tile) return null;

  const [x, y, z] = tile.position;
  const height = tile.height + 0.05;

  return (
    <group position={prepareHexagonalCoordinates(x, height, z)}>
      <mesh
        geometry={hexagonTop}
      >
        <meshStandardMaterial color={"red"} />
      </mesh>
    </group>
  )
}

export default memo(ActiveTile);
