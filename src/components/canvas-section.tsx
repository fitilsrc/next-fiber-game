"use client";

import { Suspense } from "react";

import {
  MapControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from 'r3f-perf';

import {
  EnvironmentProvider,
} from "./providers/environment-provider";
import { WorldEnvironment } from './world-environment';
import { MapTiles } from '@/features/map/components/map-tiles';
import OceanModel from "@/features/terrain/components/ocean-model";
import { ConiferForests } from '@/features/terrain/components/conifer-forests-model';
import { DeciduousForests } from "@/features/terrain/components/deciduous-forests-model";
import { InteractiveLayer } from "@/features/map/components/interactive-layer";

export const CanvasSection = () => {
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
            <WorldEnvironment />
            <OceanModel />
            <MapTiles />
            <ConiferForests />
            <DeciduousForests />
            <InteractiveLayer />
            <PerspectiveCamera makeDefault position={[45, 20, 25]} />
            <MapControls
              target={[0, 0, 0]}
              dampingFactor={0.1}
              zoomSpeed={0.25}
            />
          </Suspense>
        </EnvironmentProvider>
        <axesHelper args={[40]} />
        <Perf
          position="top-left"
          matrixUpdate
        />
      </Canvas>
    </section>
  );
};
