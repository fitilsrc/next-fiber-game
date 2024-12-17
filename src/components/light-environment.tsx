import { Environment, Lightformer, Sky, useEnvironment } from "@react-three/drei";
import React from "react";

export const LightEnvironment = () => {
  const envMap = useEnvironment({
    files: "/assets/textures/envMap/envmap.hdr",
  });

  return (
    <>
      <Environment map={envMap} environmentIntensity={1.1}>
        <Lightformer
          type="ring"
          scale={50}
          position={[55, 55, 0]}
          color={"#ffff33"}
          intensity={2.2}
          castShadow
        />
        <Lightformer
          type="rect"
          scale={50}
          position={[55, 45, 45]}
          color={"#ffeae5"}
          intensity={5.5}
          castShadow
        />
      </Environment>
      <Sky
        distance={450000}
        sunPosition={[55, 45, 45]}
      />
    </>
  );
};
