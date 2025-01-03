import { TerrainType, useEnvironmentContext } from "@/components/providers/environment-provider";
import { group } from "console";
import { memo, useMemo } from "react";
import * as THREE from "three";

interface HexagonProps {
  height: number;
  color: string;
  type: TerrainType;
}

const Hexagon = ({ height, color, type }: HexagonProps) => {
  const { state } = useEnvironmentContext();

  const geometry = useMemo(() => {
    const hexagon = new THREE.CylinderGeometry(1, 1, height - 0.05, 6);
    hexagon.translate(0, (height - 0.05) * 0.5 - 0.1, 0);
    return hexagon;
  }, []);

  const geometryTop = useMemo(() => {
    const hexagon = new THREE.CylinderGeometry(1, 1, 0.05, 6);
    hexagon.translate(0, height - 0.125, 0);
    return hexagon;
  }, []);

  const texture = state.textures[type];
  texture.repeat = new THREE.Vector2(1, 1);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return (
    <group>
      <mesh geometry={geometryTop} receiveShadow>
        <meshStandardMaterial
          map={texture}
          flatShading
        />
      </mesh>
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial
          color={color}
          flatShading
        />
      </mesh>
    </group>
  );
};

export default memo(Hexagon);
