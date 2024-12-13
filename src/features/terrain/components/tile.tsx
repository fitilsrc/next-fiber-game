import * as THREE from "three";

import { Hexagon } from "@/features/primitives/components/hexagon-geometry";
import { TileType } from "@/types";

interface TileProps {
  tile: TileType;
  children?: React.ReactNode;
}

export const Tile = ({ tile, children }: TileProps) => {
  return (
    <group position={new THREE.Vector3(...tile.position)} >
      <Hexagon height={tile.height} color={tile.color} />
      <group position={[0, tile.height / 2, 0]}>
        {children}
      </group>
    </group>
  )
}
