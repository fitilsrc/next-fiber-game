import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { PlantType } from "@/types";
import { Instances } from "@react-three/drei";
import { TreesFormation } from "./trees-formation";
import { useMemo } from "react";
import { heightMap } from "@/lib/generator";

export const DeciduousForests = () => {
  const { state } = useEnvironmentContext();
  const deciduousTreeForests = state.tiles.filter(
    (tile) => tile.plant === PlantType.TREE
  );
  const { nodes } = state.models[PlantType.TREE];

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
  }, []);

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

  const heightsMap = heightMap(deciduousTreeForests);

  return (
    <group>
      <Instances frames={1} castShadow geometry={pineTreeCrown}>
        <treeMaterial
          uBaseColor={new THREE.Color("#3B7A0B")}
          uAmbientLightColor={new THREE.Color("#050505")}
          uDirLightColor={new THREE.Color("#ebe7bf")}
          uDirLightPos={new THREE.Vector3(55, 55, 0)}
          uLineColor1={new THREE.Color("#488718")}
          uLineColor2={new THREE.Color("#000000")}
          uLineColor3={new THREE.Color("#579627")}
          uLineColor4={new THREE.Color("#61a031")}
        />
        <group dispose={null}>
          {deciduousTreeForests.map((tile, index) => (
            <TreesFormation
              key={`deciduous-tree-crown-${tile.id}`}
              tile={tile}
              heights={heightsMap[index]}
            />
          ))}
        </group>
      </Instances>
      <Instances frames={1} castShadow geometry={pineTreeTrunk}>
        <meshToonMaterial gradientMap={toneMap} color="#80551A" />
        {deciduousTreeForests.map((tile, index) => (
          <TreesFormation
            key={`deciduous-tree-trunk-${tile.id}`}
            tile={tile}
            heights={heightsMap[index]}
          />
        ))}
      </Instances>
    </group>
  );
};
