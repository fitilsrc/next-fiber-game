import { useMemo } from "react";
import * as THREE from "three";
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

interface HexagonProps {
  height: number;
  color: string;
}

export const Hexagon = ({ height, color }: HexagonProps) => {

  const geometry = useMemo(() => {
    const hexagon = new THREE.CylinderGeometry(1, 1, height, 6);
    hexagon.translate(0, (height * 0.5) - 0.1, 0);
    return hexagon;
  }, []);

  return (
    <mesh geometry={geometry} receiveShadow castShadow>
      <meshStandardMaterial
        color={color}
        envMap={null}
        flatShading
      />
    </mesh>
  );
};
