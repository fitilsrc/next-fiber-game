import { useMapStore } from "@/components/providers/map-provider"
import { BuildingModel } from "@/features/buildings/components/building-model";

export const BuildingsLayer = () => {
  const { buildings } = useMapStore(state => state);

  return (
    <group>
      {buildings.map((building) => <BuildingModel key={building.id} building={building}/>)}
    </group>
  )
}
