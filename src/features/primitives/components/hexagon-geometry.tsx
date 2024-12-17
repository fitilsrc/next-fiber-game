import { TerrainType, useEnvironmentContext } from "@/components/providers/environment-provider";
import { memo, useMemo } from "react";
import * as THREE from "three";

interface HexagonProps {
  height: number;
  type: TerrainType;
}

const Hexagon = ({ height, type }: HexagonProps) => {
  const { state } = useEnvironmentContext();

  const geometry = useMemo(() => {
    const hexagon = new THREE.CylinderGeometry(1, 1, height, 6);
    hexagon.translate(0, height * 0.5 - 0.1, 0);
    return hexagon;
  }, []);

  const texture = state.textures[type];
  texture.repeat = new THREE.Vector2(1.5, 1.5);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return (
    <mesh geometry={geometry} receiveShadow castShadow>
      <meshStandardMaterial
        map={state.textures[type]}
        flatShading
      />
    </mesh>
  );
};

export default memo(Hexagon);
