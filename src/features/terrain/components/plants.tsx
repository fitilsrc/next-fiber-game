import { TileType } from "@/types";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface PlantsProps {
  tile: TileType;
}

export const Plants = ({
  tile,
}: PlantsProps) => {
  const tree = useRef<THREE.ConeGeometry>(null!)

  useEffect(() => {
    tree.current.translate(0, tile.height * 0.5 - 0.1, 0);
  }, [])

  return (
    <mesh position={[ 0, 0.5 ,0]}>
      <coneGeometry
        ref={tree}
        args={[0.2, 1, 8]}
      />
      <meshStandardMaterial color="#305010" flatShading />
    </mesh>
  )
}
