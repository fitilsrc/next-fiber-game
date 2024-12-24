import { TreeModel } from "@/features/plants/components/tree-model";
import { generateForest } from "@/lib/generator";
import { TileType } from "@/types";

interface ForestProps {
  tile: TileType;
}

export const Forest = ({
  tile,
}: ForestProps) => {
  const plants = generateForest();

  return (
    <group rotation={[0, Math.random() * Math.PI, 0]}>
      {plants.map((tree, index) => (
        <TreeModel key={index} position={[tree.x, tree.y]} tile={tile} height={tree.height}/>
      ))}
    </group>
  )
}
