"use client";

import { Box } from "@/features/primitives/components/box";
import { Terrain } from "@/features/terrain/components/terrain";
import { Tile } from "@/features/terrain/components/tile";
import { useDatGUI } from "@/hooks/useDatGUI";
import { TileType } from "@/types";
import { OrbitControls, PerspectiveCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const CanvasSection = () => {
  const gui = useDatGUI();

  const tiles: TileType[] = [
    { x: 0, y: 0, z: 0, color: "green", height: 1, type: "grass" },
    { x: 1.73, y: 0, z: 0, color: "blue", height: 0.5, type: "sea" },
  ];

  return (
    <section className="h-screen w-full">
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <directionalLight position={[1, 2, 3]} />
        <Terrain gui={gui} />
        {tiles.map((tile) => (
          <Tile key={`${tile.x}-${tile.y}-${tile.z}`} tile={tile}>
            <Box gui={gui} position={[0, 0.15, 0]} />
          </Tile>
        ))}
        <PerspectiveCamera makeDefault position={[0, 20, 25]} />
        <OrbitControls />
      </Canvas>
      <Stats />
    </section>
  );
};
