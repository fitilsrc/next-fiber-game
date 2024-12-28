"use client";

import { useDatGUI } from "@/hooks/useDatGUI";
import { EnvironmentType, PlantType, TileType } from "@/types";
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
import Tile from "@/features/terrain/components/tile";
import { generateTerrain } from "@/lib/generator";
import { Forest } from "@/features/terrain/components/forest-model";
import { MathUtils } from "three";
import { Suspense } from "react";
import { LightEnvironment } from "./light-environment";
import {
  EnvironmentProvider,
  TerrainType,
} from "./providers/environment-provider";
import RockModel from "@/features/terrain/components/rock-model";

export const CanvasSection = () => {
  const gui = useDatGUI();

  const tiles: TileType[] = generateTerrain(15);

  const forestCheck = (tile: TileType) =>
    tile.type === TerrainType.GRASS_FOREST ||
    tile.plant === PlantType.TREE ||
    tile.plant === PlantType.PINE_TREE;

  console.log("start")

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
            <LightEnvironment />

            <Terrain />
            {tiles.map((tile) => {
              const isForest = forestCheck(tile);
              return (
                <Tile key={tile.id} tile={tile}>
                  {isForest && <Forest tile={tile} />}
                  {tile.environment === EnvironmentType.ROCK  && (
                    <RockModel tile={tile}/>
                  )}
                </Tile>
              );
            })}
            <PerspectiveCamera makeDefault position={[55, 35, 25]} />
            <MapControls
              target={[0, 0, 0]}
              dampingFactor={0.1}
              zoomSpeed={0.25}
              minPolarAngle={MathUtils.degToRad(30)}
              maxPolarAngle={MathUtils.degToRad(75)}
            />
          </Suspense>
        </EnvironmentProvider>
      </Canvas>

      <Stats />
    </section>
  );
};
