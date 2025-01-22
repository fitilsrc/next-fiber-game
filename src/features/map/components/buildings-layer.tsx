import { useMapStore } from "@/components/providers/map-provider"
import { BuildingModel } from "@/features/buildings/components/building-model";

export const BuildingsLayer = () => {
  const { map } = useMapStore(state => state);
  const buildings = map.filter((tile) => !!tile.building)

  return (
    <group>
      {buildings.map((tile) => <BuildingModel key={tile.id} tile={tile}/>)}
    </group>
  )
}
