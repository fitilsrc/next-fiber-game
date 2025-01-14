import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { PlantType } from "@/types";
import { Instances } from "@react-three/drei";
import { TreesFormation } from "./trees-formation";

export const ConiferForests = () => {
  const { state } = useEnvironmentContext();
  const pineTreeForests = state.tiles.filter(
    (tile) => tile.plant === PlantType.PINE_TREE
  );
  const { nodes, materials } = state.models[PlantType.PINE_TREE];

  const geometries: THREE.BufferGeometry[] = [];

  let pineTreeCrown = new THREE.BufferGeometry();

  Object.values(nodes).forEach((node, index) => {
    if (node instanceof THREE.Mesh) {
      geometries.push(node.geometry);
    }
  });

  pineTreeCrown = BufferGeometryUtils.mergeGeometries(
    geometries.slice(1),
    false
  );
  const [pineTreeTrunk] = geometries;

  return (
    <group>
      <Instances
        frames={1}
        castShadow
        geometry={pineTreeCrown}
        material={materials["green"]}
      >
        <group dispose={null}>
          {pineTreeForests.map((tile) => (
            <TreesFormation
              key={`pine-tree-crown-${tile.id}`}
              tile={tile}
            />
          ))}
        </group>
      </Instances>
      <Instances
        frames={1}
        castShadow
        geometry={pineTreeTrunk}
        material={materials["Brown"]}
      >
        {pineTreeForests.map((tile) => (
          <TreesFormation
            key={`pine-tree-trunk-${tile.id}`}
            tile={tile}
          />
        ))}
      </Instances>
    </group>
  );
};
