import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { PlantType } from "@/types";
import { Instances } from "@react-three/drei";
import { TreesFormation } from "./trees-formation";
import { useActionState, useMemo } from "react";
import { extend, ShaderMaterialProps, useThree } from "@react-three/fiber";
import { TreeMaterial, TreeUniforms } from "./materials/tree.material";
import { heightMap } from "@/lib/generator";
import { useMapStore } from "@/components/providers/map-provider";

extend({ TreeMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      treeMaterial: ShaderMaterialProps & Partial<TreeUniforms>;
    }
  }
}


export const ConiferForests = () => {
  const { state } = useEnvironmentContext();
  const { map } = useMapStore(state => state);
  const { nodes } = state.models[PlantType.PINE_TREE];

  const pineTreeForests = map.filter(
    (tile) => tile.plant === PlantType.PINE_TREE
  );

  // Gradient map
  const toneMap = useMemo(() => {
    const format = THREE.RedFormat;
    const colors = new Uint8Array(4);
    for (let c = 0; c < colors.length; c++) {
      colors[c] = (c / colors.length) * 256;
    }
    const gradientMap = new THREE.DataTexture(colors, colors.length, 1, format);
    gradientMap.needsUpdate = true;
    return gradientMap;
  },[])

  const geometries: THREE.BufferGeometry[] = [];

  let pineTreeCrown = new THREE.BufferGeometry();

  Object.values(nodes).forEach((node) => {
    if (node instanceof THREE.Mesh) {
      geometries.push(node.geometry);
    }
  });

  pineTreeCrown = BufferGeometryUtils.mergeGeometries(
    geometries.slice(1),
    false
  );
  const [pineTreeTrunk] = geometries;

  const heightsMap = useMemo(() => heightMap(pineTreeForests), []);

  return (
    <group>
      <Instances
        frames={1}
        castShadow
        geometry={pineTreeCrown}
      >
        <treeMaterial
          uBaseColor={new THREE.Color("#4D5F1E")}
          uAmbientLightColor={new THREE.Color("#050505")}
          uDirLightColor={new THREE.Color("#ebe7bf")}
          uDirLightPos={new THREE.Vector3(55, 55, 0)}
          uLineColor1={new THREE.Color("#7e8d61")}
          uLineColor2={new THREE.Color("#000000")}
          uLineColor3={new THREE.Color("#5d6e36")}
          uLineColor4={new THREE.Color("#6d7d4c")}
        />
        <group dispose={null}>
          {pineTreeForests.map((tile, index) => (
            <TreesFormation
              key={`pine-tree-crown-${tile.id}`}
              tile={tile}
              heights={heightsMap[index]}
            />
          ))}
        </group>
      </Instances>
      <Instances
        frames={1}
        castShadow
        geometry={pineTreeTrunk}
      >
        <meshToonMaterial
          gradientMap={toneMap}
          color="#80551A"
        />
        {pineTreeForests.map((tile, index) => (
          <TreesFormation
            key={`pine-tree-trunk-${tile.id}`}
            tile={tile}
            heights={heightsMap[index]}
          />
        ))}
      </Instances>
    </group>
  );
};
