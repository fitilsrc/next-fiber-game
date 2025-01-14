import { Fragment, useMemo } from "react";
import * as THREE from "three";
import { Instances } from "@react-three/drei";

import {
  TerrainType,
  useEnvironmentContext,
} from "@/components/providers/environment-provider";
import { Tile } from "@/features/map/components/tile";

export const MapTiles = () => {
  const { state } = useEnvironmentContext();

  const hexagon = useMemo(() => {
    return new THREE.CylinderGeometry(1, 1, 1, 6);
  }, []);
  const hexagonTop = useMemo(() => {
    return new THREE.CylinderGeometry(1, 1, 0, 6);
  }, []);

  return (
    <Fragment>
      {[...Object.values(TerrainType)].map((type) => {
        const tiles = state.tiles.filter((tile) => tile.type === type);

        return (
          <Fragment key={type}>
            <Instances geometry={hexagon}>
              <meshStandardMaterial flatShading />
              <Tile tiles={tiles} />
            </Instances>
            <Instances geometry={hexagonTop} receiveShadow>
              <meshStandardMaterial flatShading map={state.textures[type]} />
              <Tile tiles={tiles} isMapped={true} />
            </Instances>
          </Fragment>
        );
      })}
    </Fragment>
  );
};
