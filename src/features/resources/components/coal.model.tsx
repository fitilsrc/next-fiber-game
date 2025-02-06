import { Instance, Instances } from "@react-three/drei";

import { useMapStore } from "@/components/providers/map-provider";
import { ModelEnum } from "@/types";

export const CoalModel = () => {
  const { resources } = useMapStore((state) => state);

  const coal = resources.filter((r) => r.model === ModelEnum.COAL);

  return (
    <Instances>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={"#0a0700"} />
      {coal.map((c) => (
        <Instance key={c.id} position={c.position} />
      ))}
    </Instances>
  )
}
