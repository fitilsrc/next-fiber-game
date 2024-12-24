import { Environment, Lightformer, Sky, useEnvironment, useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";

export const LightEnvironment = () => {
  const dirLight = useRef<THREE.DirectionalLight>(null!);
  useHelper(dirLight, THREE.DirectionalLightHelper, 1, "cyan");

  return (
    <>
      <hemisphereLight
        color={"#0000ff"}
        groundColor={"#00ff00"}
        intensity={1.6}
      />
      <directionalLight
        ref={dirLight}
        color={"#ffffff"}
        position={[55, 55, 55]}
        intensity={1.5}
        castShadow
      />
    </>
  );
};
