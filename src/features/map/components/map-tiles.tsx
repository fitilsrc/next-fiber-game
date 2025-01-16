import { Fragment } from "react";
import { Instances } from "@react-three/drei";

import {
  TerrainType,
  useEnvironmentContext,
} from "@/components/providers/environment-provider";
import { TileInstance } from "@/features/map/components/tile-instance";
import { hexagon, hexagonFlat } from "@/features/map/components/geometry";

export const MapTiles = () => {
  const { state } = useEnvironmentContext();

  return (
    <group>
      {[...Object.values(TerrainType)].map((type) => {
        const tiles = state.tiles.filter((tile) => tile.type === type);

        return (
          <Fragment key={type}>
            <Instances geometry={hexagon}>
              <meshStandardMaterial flatShading />
              <TileInstance tiles={tiles} />
            </Instances>
            <Instances geometry={hexagonFlat} receiveShadow>
              <meshStandardMaterial flatShading map={state.textures[type]} />
              <TileInstance tiles={tiles} isMapped={true} />
            </Instances>
          </Fragment>
        );
      })}
    </group>
  );
};
