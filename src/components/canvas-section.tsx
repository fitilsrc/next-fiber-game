"use client";

import { Box } from "@/features/primitives/components/box";
import { Terrain } from "@/features/terrain/components/terrain";
import { Tile } from "@/features/terrain/components/tile";
import { Tree } from "@/features/terrain/components/tree";
import { useDatGUI } from "@/hooks/useDatGUI";
import { TileType } from "@/types";
import { OrbitControls, PerspectiveCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const CanvasSection = () => {
  const gui = useDatGUI();

  const tiles: TileType[] = [
    { id: 1, position: [0, 0, 0], color: "green", height: 1, type: "tree" },
    { id: 2, position: [0.5, 0, 1], color: "blue", height: 0.5, type: "sea" },
    {
      id: 3,
      position: [-0.5, 0, 1.0],
      color: "yellow",
      height: 0.5,
      type: "tree",
    },
  ];

  return (
    <section className="h-screen w-full">
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <directionalLight position={[1, 2, 3]} />
        <Terrain gui={gui} />
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile}>
            {(tile.type === "tree" && <Tree />)}
          </Tile>
        ))}
        <PerspectiveCamera makeDefault position={[0, 20, 25]} />
        <OrbitControls />
      </Canvas>
      <Stats />
    </section>
  );
};
