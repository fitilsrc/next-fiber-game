import * as THREE from "three";
import { Instance } from "@react-three/drei";
import { createNoise2D } from "simplex-noise";

import { TileType } from "@/types";

type HeightMapType = {
  x: number;
  y: number;
  height: number;
};

export const TreesFormation = ({ tile }: { tile: TileType }) => {
  const [x, y, z] = tile.position;
  const position = new THREE.Vector3(
    (x + (z % 2) * 0.5) * 1.75,
    Math.abs(tile.height),
    z * 1.535
  );

  const treesMap: HeightMapType[] = [
    { x: 0, y: 0, height: 0.5 },
    { x: -0.65, y: 0.25, height: 0.5 },
    { x: -0.15, y: 0.65, height: 0.5 },
    { x: 0.65, y: 0.15, height: 0.5 },
    { x: 0.45, y: -0.15, height: 0.5 },
    { x: 0.15, y: -0.65, height: 0.5 },
  ];

  const noise2D = createNoise2D();
  const heightMap = treesMap.map((item) => {
    return {
      x: item.x,
      y: item.y,
      height: (noise2D(item.x * 0.6, item.y * 0.6) + 1) * 0.5,
    };
  });

  return (
    <group position={position}>
      {heightMap.map((tree, index) => {
        if (tree.height < 0.2) return null;
        return (
        <Instance
          key={index}
          position={[tree.x, 0, tree.y]}
          scale={tree.height}
          rotation={[0, Math.PI * Math.random(), 0]}
        />
      )})}
    </group>
  );
};
