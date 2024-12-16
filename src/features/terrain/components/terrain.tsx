import { MutableRefObject, useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { MeshProps } from "@react-three/fiber";
import GUI from "lil-gui";
import { DoubleSide } from "three";

interface TerrainProps extends MeshProps{
  gui: MutableRefObject<GUI>;
}

export const Terrain = ({
  gui,
  ...props
}: TerrainProps) => {
  const [size, setSize] = useState({
    width: 30,
    height: 2.1,
  });
  const [material, setMaterial] = useState({
    color: 0x4da1ac
  })

  const plane = useRef<THREE.PlaneGeometry>(null!);

  useEffect(() => {
    const folder = gui.current.addFolder("Terrain");
    folder
      .addColor(material, "color")
      .name("Color")
      .onChange(() => setMaterial({...material}));
    folder
      .add(size, "width", 1, 20, 1)
      .name("Width")
      .onChange(() => setSize({ ...size }));
    folder
      .add(size, "height", 1, 20, 1)
      .name("Height")
      .onChange(() => setSize({ ...size }));
  }, [])


  return (
    <mesh
      position={[0, -0.1, 0]}
      receiveShadow
    >
      <cylinderGeometry
        args={[size.width, size.width, size.height]}
      />
      <meshStandardMaterial
        color={material.color}
        side={DoubleSide}
      />
    </mesh>
  );
};
