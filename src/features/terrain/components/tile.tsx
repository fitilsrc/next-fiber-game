import * as THREE from "three";

import Hexagon from "@/features/primitives/components/hexagon-geometry";
import { TileType } from "@/types";
import { memo } from "react";

interface TileProps {
  tile: TileType;
  children?: React.ReactNode;
}

const Tile = ({ tile, children }: TileProps) => {
  const [x, y, z] = tile.position;
  const position = new THREE.Vector3((x + (z % 2) * 0.5) * 1.75, y, z * 1.535);

  return (
    <group position={position} >
      <Hexagon height={tile.height} color={tile.color} type={tile.type} />
      <group position={[0, tile.height / 2, 0]}>
        {children}
      </group>
    </group>
  )
}

export default memo(Tile);
