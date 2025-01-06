'use client';

import { memo, useRef } from "react";

import * as THREE from "three";
import { extend, useLoader, useThree, type ShaderMaterialProps } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

import fragmentShader from './terrain.frag'
import vertexShader from './terrain.vert'

type Uniforms = {
  uTime: number
  uAspectRatio: number
  uScrollOffset: number
  uLightColour: THREE.Color
  uDarkColour: THREE.Color
  uTexture: THREE.Texture | null
}

const INITIAL_UNIFORMS: Uniforms = {
  uTime: 0,
  uAspectRatio: 1,
  uScrollOffset: 0,
  uLightColour: new THREE.Color('#2E2A37').convertLinearToSRGB(),
  uDarkColour: new THREE.Color('#0A090C').convertLinearToSRGB(),
  uTexture: null,
}

const RippleShaderMaterial = shaderMaterial(
  // uniform
  INITIAL_UNIFORMS,
  vertexShader,
  fragmentShader
)

extend({ RippleShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveShaderMaterial: ShaderMaterialProps & Uniforms
    }
  }
}

export const Terrain = () => {
  const { viewport } = useThree();
  const texture = useLoader(THREE.TextureLoader, "/assets/textures/water.avif");
  const shader = useRef<THREE.ShaderMaterial & Partial<Uniforms>>(null);
  
  return (
    <mesh
      position={[0, -0.1, 0]}
      receiveShadow
    >
      <cylinderBufferGeometry
        args={[30, 30, 1.1]}
      />
      <waveShaderMaterial
        key={RippleShaderMaterial.key}
        ref={shader}
        uTime={0}
        uScrollOffset={0}
        uAspectRatio={viewport.aspect}
        uLightColour={INITIAL_UNIFORMS.uLightColour}
        uDarkColour={INITIAL_UNIFORMS.uDarkColour}
        uTexture={texture}
      />
    </mesh>
  );
};

export default memo(Terrain);
