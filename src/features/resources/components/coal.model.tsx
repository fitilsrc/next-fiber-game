import * as THREE from "three";
import { Instance, Instances } from "@react-three/drei";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { ModelEnum, TileResourcesType } from "@/types";

export const CoalModel = ({ tiles }: { tiles: TileResourcesType[] }) => {
  const { state } = useEnvironmentContext();
  const { nodes, materials } = state.models[ModelEnum.COAL];


  console.log(tiles.length);
  return (
    <group dispose={null}>
      {nodes.rock instanceof THREE.Mesh && (
        <Instances geometry={nodes.rock.geometry}>
          <meshToonMaterial {...materials[nodes.rock.material.name]} />
          {tiles.map((tile) => (
            <Instance
              key={tile.id}
              position={tile.position}
              rotation={tile.rotation}
            />
          ))}
        </Instances>
      )}
    </group>
  );
};
