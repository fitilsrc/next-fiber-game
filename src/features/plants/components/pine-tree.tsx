import { TileType } from '@/types';
import { useGLTF } from '@react-three/drei';
import { memo } from 'react';
import { Mesh } from 'three';

interface PineTreeProps {
  position: [number, number];
  height: number;
  tile: TileType;
}

export const PineTree = ({
  position,
  height,
  tile,
}: PineTreeProps) => {
  const { scene } = useGLTF("https://utfs.io/f/Z31hlkme8otS9890KzBn40Dx1lK3FN5bTWasQpBMOScrthLi");
  const [x, y] = position;

  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.material.flatShading = true
    }
  })

  console.log(height)
  const scale = height * 0.02 + 0.1

  return (
    <group>
      <primitive
        position={[ x, tile.height * 0.5 - 0.1 ,y]}
        object={scene.clone()}
        scale={[scale, scale, scale]}
      />
    </group>
  )
}

useGLTF.preload("https://utfs.io/f/Z31hlkme8otS9890KzBn40Dx1lK3FN5bTWasQpBMOScrthLi");

export default memo(PineTree);
