import { BuildingModel } from "@/features/buildings/components/building-model";
import { useBuildingsStore } from "@/stores/buildings.store";

export const BuildingsLayer = () => {
  const { buildings } = useBuildingsStore((state) => state);

  console.log("buildings layer");

  return (
    <group>
      {buildings.map((building) => (
        <BuildingModel key={building.id} building={building} />
      ))}
    </group>
  );
};
