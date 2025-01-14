import { Fragment, useRef } from "react";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { Instance } from "@react-three/drei";

import { TileType } from "@/types";

interface TileProps {
  tiles: TileType[]
  isMapped?: boolean
}

export const Tile = ({
  tiles,
  isMapped
}: TileProps) => {

  const onPointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const tile = tiles.find((tile) => tile.id === e.object.uuid);
  }

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const tile = tiles.find((tile) => tile.id === e.object.uuid);
  }

  return (
    <>
      {tiles.map((tile) => {
        const [x, y, z] = tile.position;
        const position = !isMapped
          ? new THREE.Vector3(
              (x + (z % 2) * 0.5) * 1.75,
              Math.abs(tile.height * 0.5),
              z * 1.535
            )
          : new THREE.Vector3(
              (x + (z % 2) * 0.5) * 1.75,
              Math.abs(tile.height),
              z * 1.535
            );
        const color = !isMapped ? tile.color : undefined
        const scale = !isMapped
          ? new THREE.Vector3(1, Math.abs(tile.height), 1)
          : undefined

        return (
          <Fragment key={tile.id}>
            <Instance
              position={position}
              uuid={tile.id}
              color={color}
              scale={scale}
              onPointerEnter={onPointerEnter}
              onClick={onClick}
            />
          </Fragment>
        );
      })}
    </>
  );
}
