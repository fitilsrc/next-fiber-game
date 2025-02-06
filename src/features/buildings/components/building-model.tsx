import * as THREE from "three";
import { Construction } from "@/features/actions/components/construction";
import { BuildingType } from "@/types";
import { useBuildingsStore } from "@/stores/buildings.store";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

interface BuildingModelProps {
  building: BuildingType;
}

export const BuildingModel = ({ building }: BuildingModelProps) => {
  const { updateBuilding } = useBuildingsStore((state) => state);
  const [elapsedTime, setElapsedTime] = useState(0);

  const position = new THREE.Vector3(
    building.position.x,
    building.position.y + 0.5,
    building.position.z
  );

  useFrame(({ clock }) => {
    if (building.isUnderConstruction) {
      if (elapsedTime > 1000) {
        updateBuilding({
          ...building,
          isUnderConstruction: false,
          condition: 1000,
        });
      }
      setElapsedTime(elapsedTime + 1);
    }
  });

  return (
    <group position={building.position}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="red" flatShading />
      </mesh>
      {building.isUnderConstruction && <Construction />}
    </group>
  );
};
