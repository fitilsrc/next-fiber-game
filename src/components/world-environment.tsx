import React, { useMemo, useRef } from "react";
import * as THREE from "three";

import { MapControls, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { useCameraStore } from "@/stores/camera.store";

export const WorldEnvironment = () => {
  const { cameraTarget } = useCameraStore((state) => state)
  const dirLight = useRef<THREE.DirectionalLight>(null!);

  // const options = useMemo(() => {
  //   return {
  //     dayLight: { value: "#ebe7bf" },
  //     nightLight: { value: "lime" },
  //     lightX: { value: 55 },
  //     lightY: { value: 55 },
  //     lightZ: { value: 0 },
  //   };
  // }, []);
  // const environment = useControls("Environment", options);

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
        color={"#ebe7bf"}
        position={[55, 55, 0]}
        intensity={1.5}
        castShadow
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
      />
      <MapControls
        minDistance={5}
        maxDistance={80}
        maxPolarAngle={90}
        target={cameraTarget}
      />
    </>
  );
};
