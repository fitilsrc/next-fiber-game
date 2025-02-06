"use client";

import { useBuildingsStore } from "@/stores/buildings.store";
import { useMapStore } from "../providers/map-provider";
import { useHoverStore } from "@/stores/hover.store";
import { Fragment, useEffect, useState } from "react";
import { BuildingType, ResourceType } from "@/types";

export const TileInfo = () => {
  const uuid = useHoverStore((state) => state.hover);
  const {resources, terrain} = useMapStore((state) => state);
  const buildings = useBuildingsStore((state) => state.buildings);
  const tile = terrain.find((tile) => tile.id === uuid);

  const [building, setBuilding] = useState<BuildingType | undefined | null>(
    null
  );
  const [tileResources, setTileResources] = useState<
    ResourceType[] | undefined | null
  >(null);

  useEffect(() => {
    if (!uuid) return;

    const building = buildings.find((building) => building.tileId === uuid);
    const tileResources = resources.filter(
      (resource) => resource.tileId === uuid
    );

    setBuilding(building);
    setTileResources(tileResources.flatMap((tile) => tile.resources));
  }, [uuid]);

  // const isRender = uuid && (tileResources?.length || building);

  return (
    <>
      {/* {isRender && ( */}
        <div className="bg-black/40 backdrop-blur-md p-2">
          {building && <div>{building.type}</div>}
          {tileResources &&
            tileResources.map((resource) => (
              <Fragment key={resource.type}>
                <div> "x:" {tile?.position[0]}</div>
                <div> "height:" {tile?.height}</div>
                <div> "z:" {tile?.position[2]}</div>
                <div>{resource.type}</div>
                <div>{resource.amount}</div>
              </Fragment>
            ))}
        </div>
      {/* )} */}
    </>
  );
};
