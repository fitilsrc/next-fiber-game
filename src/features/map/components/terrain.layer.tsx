import { useEnvironmentContext } from "@/components/providers/environment-provider";
import { extend, type ShaderMaterialProps } from "@react-three/fiber";
import { GrassMaterial, GrassUniforms } from "./materials/grass.material";
import { hexagon } from "./geometry";
import { Instance, Instances } from "@react-three/drei";
import * as THREE from "three";
import { Fragment } from "react";
import { prepareHexagonalCoordinates } from "@/lib/utils";
import { useMapStore } from "@/components/providers/map-provider";
import { TerrainTypeEnum, TileType } from "@/types";
import { useShallow } from "zustand/shallow";
import {
  GrassBrownPlainModel,
  GrassForestPlainModel,
  GrassRockyPlainModel,
} from "@/features/resources/components";

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
  "#77644C", //coastal sand

  "#635b13",
  "#756308", //forrest
  "#756308", //forrest
  // "#575e07",
  // "#57483A",
  "#756308",
  "#796B58",
  "#7A7D86",
];

export const TerrainLayer = () => {
  const { state } = useEnvironmentContext();
  const { terrain } = useMapStore(useShallow((state) => state));

  console.log("terrain layer");

  return (
    <group>
      {[...Object.values(TerrainTypeEnum)].map((type, index) => {
        const tiles = terrain.filter((tile: TileType) => tile.type === type);

        return (
          <Fragment key={type}>
            <Instances geometry={hexagon}>
              <grassMaterial
                uColor={new THREE.Color(colors[index])}
                uAmbientLightColor={new THREE.Color("#050505")}
                uDirLightColor={new THREE.Color("#ebe7bf")}
              />

              {tiles.map((tile: TileType) => {
                const [x, y, z] = tile.position;
                const position = prepareHexagonalCoordinates(
                  x,
                  tile.height * 0.5,
                  z
                );
                const topPosition = prepareHexagonalCoordinates(
                  x,
                  tile.height + 0.009,
                  z
                );
                return (
                  <Fragment key={tile.id}>
                    {tile.type === TerrainTypeEnum.GRASS_FOREST && (
                      <group position={topPosition} rotation={tile.rotation}>
                        <GrassForestPlainModel />
                      </group>
                    )}
                    {tile.type === TerrainTypeEnum.GRASS_BROWN && (
                      <group position={topPosition} rotation={tile.rotation}>
                        <GrassBrownPlainModel />
                      </group>
                    )}
                    {tile.type === TerrainTypeEnum.GRASS_ROCKY && (
                      <group position={topPosition} rotation={tile.rotation}>
                        <GrassRockyPlainModel />
                      </group>
                    )}
                    <Instance
                      position={position}
                      scale={new THREE.Vector3(1, Math.abs(tile.height), 1)}
                      color={tile.color}
                    />
                  </Fragment>
                );
              })}
            </Instances>
          </Fragment>
        );
      })}
    </group>
  );
};
