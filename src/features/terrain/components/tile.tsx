import * as THREE from "three";

import { Hexagon } from "@/features/primitives/components/hexagon-geometry";
import { TileType } from "@/types";

interface TileProps {
  tile: TileType;
  children: React.ReactNode;
}

export const Tile = ({ tile, children }: TileProps) => {
  return (
    <group position={[tile.x, tile.y, tile.z]} >
      <Hexagon height={tile.height} color={tile.color} />
      <group position={[0, tile.height / 2, 0]}>
        {children}
      </group>
    </group>
  )
}
