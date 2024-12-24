import { memo, useMemo } from "react";

import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export const Terrain = () => {
  const water = useLoader(THREE.TextureLoader, "/assets/textures/water.avif");

  water.repeat = new THREE.Vector2(1, 1);
  water.wrapS = THREE.RepeatWrapping;
  water.wrapT = THREE.RepeatWrapping;

  // const waterMaterial = useMemo(() => {
  //   return new THREE.MeshPhysicalMaterial({
  //       color: new THREE.Color("#6079AA").convertSRGBToLinear().multiplyScalar(3),
  //       ior:1.4,
  //       transparent: true,
  //       transmission: 1,
  //       thickness: 1.5,
  //       envMapIntensity: 0.4,
  //       roughness: 1,
  //       metalness: 0.025,
  //       roughnessMap: water,
  //       metalnessMap: water,
  //       bumpMap: water,
  //       bumpScale: 0.5,
  //   })



  //     // <meshReflectorMaterial
  //     //   transparent={true}
  //     //   opacity={0.6}
  //     //   color={"#23281b"}
  //     //   roughness={0}

  //     //   mixBlur={1}
  //     //   mixStrength={20} // Strength of the reflections
  //     //   mixContrast={1.2} // Contrast of the reflections

  //     //   mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
  //     //   depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
  //     //   minDepthThreshold={0} // Lower edge for the depthTexture interpolation (default = 0)
  //     //   maxDepthThreshold={0.1} // Upper edge for the depthTexture interpolation (default = 0)
  //     //   depthToBlurRatioBias={0.0025} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture

  //     //   textureMatrix={new THREE.Matrix4()}
  //     //   tDiffuse={water}
  //     //   tDiffuseBlur={water}
  //     //   hasBlur={true}
  //     //   distortion={0}
  //     // />

  // }, []);

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
        // ior={1.4}
        // transparent={true}
        // // transmission={1}
        // thickness={1.5}
        // envMapIntensity={0.4}
        // roughness={1}
        // metalness={0.1}
        // roughnessMap={water}
        // metalnessMap={water}
      />
    </mesh>
  );
};

export default memo(Terrain);
