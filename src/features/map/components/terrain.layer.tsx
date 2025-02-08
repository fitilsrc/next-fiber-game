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
  GrassPlainModel,
  GrassRockyPlainModel,
  RockyPlainModel,
  SandCoastPlainModel,
  SandPlainModel,
  SnowPlainModel,
} from "@/features/terrain/components";

extend({ GrassMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      grassMaterial: ShaderMaterialProps & Partial<GrassUniforms>;
    }
  }
}

const colors = [
  "#9e905e",
  "#897016", //coastal sand
  "#635b13",
  "#756308", //forrest
  "#756308", //forrest
  "#756308",
  "#696b66",
  "#97A6A2", //snow
];

const terrainMap = {
  [TerrainTypeEnum.GRASS_FOREST]: GrassForestPlainModel,
  [TerrainTypeEnum.GRASS_BROWN]: GrassBrownPlainModel,
  [TerrainTypeEnum.GRASS_ROCKY]: GrassRockyPlainModel,
  [TerrainTypeEnum.SNOW]: SnowPlainModel,
  [TerrainTypeEnum.GRASS]: GrassPlainModel,
  [TerrainTypeEnum.ROCK]: RockyPlainModel,
  [TerrainTypeEnum.SAND_COAST]: SandCoastPlainModel,
  [TerrainTypeEnum.SAND]: SandPlainModel,
}

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
            {terrainMap[type] && terrainMap[type]({ tiles })}
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
                  tile.height + 0.005,
                  z
                );
                return (
                  <Fragment key={tile.id}>
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
