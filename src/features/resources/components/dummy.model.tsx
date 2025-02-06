import { Instance, Instances } from "@react-three/drei";

import { useMapStore } from "@/components/providers/map-provider";
import { ModelEnum } from "@/types";

export const DummyModel = ({ model }: { model: ModelEnum }) => {
  const { resources } = useMapStore((state) => state);

  const dummy = resources.filter((r) => r.model === model);

  console.log(model)

  return (
    <Instances>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={"green"} />
      {dummy.map((d) => (
        <Instance key={d.id} position={d.position} />
      ))}
    </Instances>
  )
}
