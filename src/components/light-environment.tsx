import { Environment, Lightformer, Sky, useEnvironment, useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";

export const LightEnvironment = () => {
  const dirLight = useRef<THREE.DirectionalLight>(null!);
  useHelper(dirLight, THREE.DirectionalLightHelper, 1, "cyan");

  return (
    <>
      <hemisphereLight
        color={"#f2e6d8"}
        groundColor={"#ffffff"}
        intensity={1}
      />
      <directionalLight
        ref={dirLight}
        color={"#ffffff"}
        position={[55, 55, 0]}
        intensity={2.5}
        castShadow
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
      />
    </>
  );
};
