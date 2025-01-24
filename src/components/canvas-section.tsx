"use client";

import { Suspense } from "react";

import { Bounds } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import { EnvironmentProvider } from "./providers/environment-provider";
import { WorldEnvironment } from "./world-environment";
import { OceanModel } from "@/features/terrain/components/ocean-model";
import { HexagonalRadialMenu } from "./ui/hexa-radial-menu";
import { InteractiveLayer } from "@/features/map/components/interactive.layer";
import { ForestsLayer } from "@/features/map/components/forests.layer";
import { TerrainLayer } from "@/features/map/components/terrain.layer";

export const CanvasSection = () => {
  console.log("start");

  return (
    <section className="h-screen w-full">
      <Canvas
        shadows="soft"
        dpr={[1, 2]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [55, 55, 35], fov: 40 }}
      >
        <WorldEnvironment />
        <EnvironmentProvider>
          <Suspense fallback={null}>
            <Bounds
              margin={4.5}
            >
              <OceanModel />
              <TerrainLayer />
              <ForestsLayer />
              <InteractiveLayer />
            </Bounds>
          </Suspense>
        </EnvironmentProvider>
        <axesHelper args={[40]} />
        <Perf position="top-left" matrixUpdate />
      </Canvas>
      <HexagonalRadialMenu />
    </section>
  );
};
