"use client";

import { useDatGUI } from "@/hooks/useDatGUI";
import { TileType } from "@/types";
import {
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
import { DirectionalLight, DirectionalLightHelper, MathUtils } from "three";
import { MutableRefObject, useRef } from "react";

const LightWithHelper = () => {
  const light = useRef<DirectionalLight>(null!);

  useHelper(
    light as MutableRefObject<DirectionalLight>,
    DirectionalLightHelper,
    3,
    "red"
  );

  return (
    <>
      <hemisphereLight
        color={"#ffff33"}
        groundColor={"#ffffff"}
        position={[55, 55, 0]}
      />
      <directionalLight
        color={"#ffeae5"}
        ref={light}
        position={[55, 45, 45]}
        intensity={1}
        // shadow-mapSize={{ width: 2048, height: 2048 }}
        // shadow-camera-top={50}
        // shadow-camera-bottom={-50}
        // shadow-camera-left={-50}
        // shadow-camera-right={50}
        // shadow-camera-far={3500}
        // shadow-bias={-0.0001}
        castShadow
      />
    </>
  );
};

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
          powerPreference: "high-performance"
        }}
      >
        {/* <ambientLight intensity={Math.PI / 2} /> */}
        <LightWithHelper />

        <Terrain gui={gui} />
        {tiles.map((tile) => (
          <Tile key={tile.id} tile={tile}>
            {tile.type === "tree" && Math.random() < 0.2 && (
              <Forest tile={tile} />
            )}
          </Tile>
        ))}
        <PerspectiveCamera makeDefault position={[95, 35, 25]} />
        <OrbitControls
          minPolarAngle={MathUtils.degToRad(35)}
          maxPolarAngle={MathUtils.degToRad(75)}
          rotateSpeed={0.5}
        />
      </Canvas>
      <Stats />
    </section>
  );
};
