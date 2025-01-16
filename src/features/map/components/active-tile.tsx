import { memo, useMemo, useState } from "react";

import * as THREE from "three";
import {
  extend,
  ShaderMaterialProps,
  ThreeEvent,
} from "@react-three/fiber";

import { ActiveMaterial } from "@/features/map/components/materials/active.material";
import { hexagonFlat } from "@/features/map/components/geometry";

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
  const [opacity, setOpacity] = useState(0);

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setOpacity(0.4);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setOpacity(0.0);
  };

  return (
    <mesh
      uuid={!uuid ? undefined : uuid}
      geometry={hexagonFlat}
      onPointerEnter={handlePointerEnter}
      onPointerOut={handlePointerOut}
      position={position}
    >
      <activeMaterial transparent uOpacity={opacity} />
    </mesh>
  );
};

export default memo(ActiveTile);
