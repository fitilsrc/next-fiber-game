import * as THREE from "three";

interface HexagonProps {
  height: number;
  color: string;
}

export const Hexagon = ({ height, color }: HexagonProps) => {
  return (
    <mesh>
      <cylinderGeometry args={[0.6, 0.6, height, 6]} />
      <meshStandardMaterial color={color} wireframe/>
    </mesh>
  );
};
