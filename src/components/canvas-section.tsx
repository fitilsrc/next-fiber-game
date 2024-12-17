"use client";

import { useDatGUI } from "@/hooks/useDatGUI";
import { TileType } from "@/types";
import {
  Environment,
  MapControls,
  OrbitControls,
  PerspectiveCamera,
  Stats,
  useHelper,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Terrain } from "@/features/terrain/components/terrain";
import { Tile } from "@/features/terrain/components/tile";
import { generateTerrain } from "@/lib/generator";
import { Forest } from "@/features/terrain/components/forest-model";
import { MathUtils } from "three";
import { Suspense } from "react";
import { LightEnvironment } from "./light-environment";
import { EnvironmentProvider, TerrainType } from "./providers/environment-provider";

export const CanvasSection = () => {
  const gui = useDatGUI();

  const tiles: TileType[] = generateTerrain(15);

  return (
    <section className="h-screen w-full">
      <Canvas
        shadows="soft"
        dpr={[1, 2]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <EnvironmentProvider>
          <Suspense fallback={null}>
            <fog attach="fog" args={["#f0f0f0", 0, 250]} />
            <LightEnvironment />

            <Terrain />
            {tiles.map((tile) => (
              <Tile key={tile.id} tile={tile}>
                {tile.type === TerrainType.ROCKY_TERRAIN && Math.random() < 0.4 && (
                  <Forest tile={tile} />
                )}
              </Tile>
            ))}
            <PerspectiveCamera makeDefault position={[95, 35, 25]} />
            <MapControls
              target={[0, 0, 0]}
              dampingFactor={0.1}
              zoomSpeed={0.25}
              minPolarAngle={MathUtils.degToRad(0)}
              maxPolarAngle={MathUtils.degToRad(90)}
            />
          </Suspense>
        </EnvironmentProvider>
      </Canvas>

      <Stats />
    </section>
  );
};
