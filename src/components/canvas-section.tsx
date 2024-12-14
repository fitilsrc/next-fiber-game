"use client";

import { useDatGUI } from "@/hooks/useDatGUI";
import { TileType } from "@/types";
import { OrbitControls, PerspectiveCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Terrain } from "@/features/terrain/components/terrain";
import { Tile } from "@/features/terrain/components/tile";
import { Plants } from "@/features/terrain/components/plants";

export const CanvasSection = () => {
  const gui = useDatGUI();

  const tiles: TileType[] = [
    { id: 1, position: [0, 0, 0], color: "green", height: 0.4, type: "tree" },
    { id: 2, position: [1, 0, 0], color: "blue", height: 0.1, type: "sea" },
    {
      id: 3,
      position: [2, 0, 0],
      color: "yellow",
      height: 0.3,
      type: "tree",
    },
    { id: 4, position: [0, 0, 1], color: "blue", height: 0.1, type: "sea" },
    { id: 5, position: [1, 0, 1], color: "blue", height: 0.1, type: "sea" },
    { id: 6, position: [2, 0, 1], color: "blue", height: 0.1, type: "sea" },
  ];

  return (
    <section className="h-screen w-full">
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <directionalLight position={[1, 2, 3]} />
        <Terrain gui={gui} />
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile}>
            {(tile.type === "tree" && <Plants tile={tile} />)}
          </Tile>
        ))}
        <PerspectiveCamera makeDefault position={[0, 20, 25]} />
        <OrbitControls />
      </Canvas>
      <Stats />
    </section>
  );
};
