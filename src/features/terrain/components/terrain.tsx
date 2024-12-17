import { memo } from "react";

import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { useEnvironment } from "@react-three/drei";

export const Terrain = () => {
  const water = useLoader(THREE.TextureLoader, "/assets/textures/water.jpg");

  water.repeat = new THREE.Vector2(0.5, 0.5);
  water.wrapS = THREE.RepeatWrapping;
  water.wrapT = THREE.RepeatWrapping;

  return (
    <mesh
      position={[0, -0.1, 0]}
      receiveShadow
    >
      <cylinderGeometry
        args={[30, 30, 2.1]}
      />
      <meshPhysicalMaterial
        color={new THREE.Color("#537cc2").convertSRGBToLinear().multiplyScalar(3)}
        ior={1.4}
        transparent={true}
        // transmission={1}
        thickness={1.5}
        envMapIntensity={0.4}
        roughness={1}
        metalness={0.025}
        roughnessMap={water}
        metalnessMap={water}
      />
    </mesh>
  );
};

export default memo(Terrain);
