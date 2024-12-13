import * as THREE from "three";

interface HexagonProps {
  height: number;
  color: string;
}

export const Hexagon = ({ height, color }: HexagonProps) => {
  return (
    <mesh>
      <cylinderGeometry args={[1, 1, height, 6]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
