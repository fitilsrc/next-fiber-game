import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { MeshProps } from "@react-three/fiber";
import GUI from "lil-gui";

interface BoxProps extends MeshProps{
  gui: MutableRefObject<GUI>;
}

export function Box({
  gui,
  ...props
}: BoxProps) {

  const mesh = useRef<THREE.Mesh>(null!);
  const material = useRef<THREE.MeshStandardMaterial>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // useFrame((state, delta) => (mesh.current.rotation.x += delta));

  useEffect(() => {
    const folder = gui.current.addFolder("Box");
    folder.add(mesh.current.position, "x", -3, 3, 0.1).name("X Position");
    folder.addColor(material.current, "color").name("Color");
  }, [])


  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        ref={material}
        color={"#268c12"}
      />
    </mesh>
  );
}
