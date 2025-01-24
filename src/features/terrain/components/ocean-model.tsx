'use client';

import { memo, useRef } from "react";

import * as THREE from "three";
import { extend, useFrame, useLoader, type ShaderMaterialProps } from "@react-three/fiber";

import { WaterMaterial } from './materials/water.material';

type Uniforms = {
  uTime: number
  uOpacity: number
  uColor: THREE.Color
  uTexture: THREE.Texture | null
}

extend({ WaterMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      rippleShaderMaterial: ShaderMaterialProps & Uniforms;
      waterMaterial: ShaderMaterialProps & Partial<Uniforms>;
    }
  }
}

export const OceanModel = memo(() => {
  const texture = useLoader(THREE.TextureLoader, "/assets/textures/water.avif");
  const shader = useRef<THREE.ShaderMaterial & Partial<Uniforms>>(null);

  useFrame(({ clock }) => {
    if (shader.current) {
      shader.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <mesh
      position={[0, -0.1, 0]}
    >
      <cylinderGeometry args={[30, 30, 1, 32]} />
      <waterMaterial
        ref={shader}
        uColor={new THREE.Color('#258bba').convertLinearToSRGB()}
        uTime={0}
        uOpacity={0.8}
        transparent
      />
    </mesh>
  );
});
