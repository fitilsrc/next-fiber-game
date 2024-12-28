import { memo } from "react";

import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export const Terrain = () => {
  const water = useLoader(THREE.TextureLoader, "/assets/textures/water.avif");

  water.repeat = new THREE.Vector2(1, 1);
  water.wrapS = THREE.RepeatWrapping;
  water.wrapT = THREE.RepeatWrapping;

  return (
    <mesh
      position={[0, -0.1, 0]}
      receiveShadow
    >
      <cylinderGeometry
        args={[30, 30, 1.1]}
      />
      <meshStandardMaterial
        color={"#4477ff"}
        flatShading
      />
    </mesh>
  );
};

export default memo(Terrain);
