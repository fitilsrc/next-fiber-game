import { memo, useMemo, useState } from "react";

import * as THREE from "three";
import { extend, ShaderMaterialProps, ThreeEvent } from "@react-three/fiber";

import { ActiveMaterial } from "@/features/map/components/materials/active.material";
import { useActiveTileStore } from "@/components/providers/active-tile-provider";

type Uniforms = {
  uTime: number;
  uOpacity: number;
  uColor: THREE.Color;
};

extend({ ActiveMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      activeMaterial: ShaderMaterialProps & Partial<Uniforms>;
    }
  }
}

interface ActiveTileProps {
  position: THREE.Vector3;
  uuid: string | null | undefined;
}

const ActiveTile = ({ position, uuid }: ActiveTileProps) => {
  const { id, setActiveTile } = useActiveTileStore((state) => state);
  const [opacity, setOpacity] = useState(0);

  const hexagon = useMemo(() => {
    return new THREE.CylinderGeometry(1, 1, 0, 6);
  }, []);

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setOpacity(0.4);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setOpacity(0.0);
  };

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setActiveTile(e.object.uuid);
  };

  return (
    <group
      position={position}
    >
      <mesh
        geometry={hexagon}
        onPointerEnter={handlePointerEnter}
        onPointerOut={handlePointerOut}
        onClick={onClick}
      >
        <activeMaterial transparent uOpacity={opacity} />
      </mesh>
    </group>
  );
};

export default memo(ActiveTile);
