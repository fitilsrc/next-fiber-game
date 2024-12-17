import { TileType } from '@/types';
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { memo } from 'react';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
  const { nodes, materials } = useGLTF("/assets/models/pine-tree.glb");

  const [x, y] = position;

  const mesh1 = nodes.Cylinder as Mesh;
  const mesh2 = nodes.Cone002 as Mesh;
  const mesh3 = nodes.Cone001 as Mesh;
  const mesh4 = nodes.Cone as Mesh;
  const scale = height * 0.04 + 0.1;

  return (
    <group dispose={null}>
      <group
        position={[x, tile.height * 0.5 - 0.1, y]}
        scale={[scale, scale, scale]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={mesh1.geometry}
          material={materials["Material.001"]}
          position={[-0.003, 0.21, 0.022]}
          scale={[0.48, 1, 0.48]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={mesh2.geometry}
          material={materials["Material.004"]}
          position={[0, 2.118, 0.025]}
          rotation={[-0.085, 0.448, 0]}
          scale={[0.261, 0.284, 0.244]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={mesh3.geometry}
          material={materials["Material.003"]}
          position={[0.008, 1.638, 0.03]}
          rotation={[0.1, -0.143, 0]}
          scale={[0.507, 0.363, 0.481]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={mesh4.geometry}
          material={materials["Material.002"]}
          position={[0.012, 1.007, -0.015]}
          rotation={[0.05, 0.258, 0.053]}
          scale={[0.879, 0.63, 0.959]}
        />
      </group>
    </group>
  );
}

export default memo(PineTree);
