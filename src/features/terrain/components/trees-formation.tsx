import * as THREE from "three";
import { Instance } from "@react-three/drei";

import { HeightMapType, TileType } from "@/types";

interface TreesFormationProps {
  tile: TileType;
  heights: HeightMapType[];
}

export const TreesFormation = ({ tile, heights }: TreesFormationProps) => {
  const [x, y, z] = tile.position;
  const position = new THREE.Vector3(
    (x + (z % 2) * 0.5) * 1.75,
    Math.abs(tile.height),
    z * 1.535
  );

  return (
    <group position={position}>
      {heights.map((tree, index) => {
        return (
          <Instance
            key={index}
            position={[tree.x, 0, tree.y]}
            scale={tree.height}
            rotation={[0, Math.PI * Math.random(), 0]}
          />
        );
      })}
    </group>
  );
};
