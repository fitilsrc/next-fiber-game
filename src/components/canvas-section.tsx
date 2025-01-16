"use client";

import { Suspense, useEffect, useRef } from "react";

import { Bounds, MapControls, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import { EnvironmentProvider } from "./providers/environment-provider";
import { WorldEnvironment } from "./world-environment";
import { MapTiles } from "@/features/map/components/map-tiles";
import OceanModel from "@/features/terrain/components/ocean-model";
import { ConiferForests } from "@/features/terrain/components/conifer-forests-model";
import { DeciduousForests } from "@/features/terrain/components/deciduous-forests-model";
import { InteractiveLayer } from "@/features/map/components/interactive-layer";

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
              <MapTiles />
              <ConiferForests />
              <DeciduousForests />
              <InteractiveLayer />
            </Bounds>
          </Suspense>
        </EnvironmentProvider>
        <axesHelper args={[40]} />
        <Perf position="top-left" matrixUpdate />
      </Canvas>
    </section>
  );
};
