import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const Construction = () => {
  const icon = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (icon.current) {
      icon.current.rotation.y = clock.getElapsedTime();
      icon.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.1 + 1;
    }
  });

  return (
    <group position={[0, 1, 0]} ref={icon}>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh rotation={[-Math.PI / 4, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 6]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </group>
  );
};

export { Construction };
