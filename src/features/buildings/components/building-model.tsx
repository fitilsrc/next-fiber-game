import { BuildingType } from "@/types";

interface BuildingModelProps {
  building: BuildingType;
}

export const BuildingModel = ({ building }: BuildingModelProps) => {
  return (
    <group position={building.position}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="red" flatShading />
      </mesh>
    </group>
  );
};
