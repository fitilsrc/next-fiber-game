import {
  TerrainType,
  useEnvironmentContext,
} from "@/components/providers/environment-provider";
import { extend, type ShaderMaterialProps } from "@react-three/fiber";
import { GrassMaterial, GrassUniforms } from "./materials/grass.material";
import { hexagon } from "./geometry";
import { Instance, Instances } from "@react-three/drei";
import * as THREE from "three";
import { Fragment } from "react";
import { prepareHexagonalCoordinates } from "@/lib/utils";

extend({ GrassMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      grassMaterial: ShaderMaterialProps & Partial<GrassUniforms>;
    }
  }
}

const colors = [
  "#798190",
  "#77644C",
  "#635b13",
  "#756308",
  "#575e07",
  "#57483A",
  "#796B58",
  "#7A7D86"
]

export const TerrainLayer = () => {
  const { state } = useEnvironmentContext();

  return (
    <group>
      {[...Object.values(TerrainType)].map((type, index) => {
        const tiles = state.terrain.filter((tile) => tile.type === type);

        return (
          <Fragment key={type}>
            <Instances geometry={hexagon}>
              <grassMaterial
                uColor={new THREE.Color(colors[index])}
                uTexture={state.textures[type]}
                uAmbientLightColor={new THREE.Color("#050505")}
                uDirLightColor={new THREE.Color("#ebe7bf")}
              />
              { tiles.map((tile) => {
                const [x,y,z] = tile.position;
                const position = prepareHexagonalCoordinates(x, tile.height * 0.5, z);
                return (
                  <Instance
                    key={tile.id}
                    position={position}
                    scale={new THREE.Vector3(1, Math.abs(tile.height), 1)}
                    color={tile.color}
                  />
                )
              }) }
            </Instances>
          </Fragment>
        );
      })}
    </group>
  );
};
