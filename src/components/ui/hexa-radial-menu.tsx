import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { HexagonalButton } from "./hexa-button";
import { v4 as uuidv4 } from "uuid";
import { BuildingsEnum, BuildingType } from "@/types";
import { prepareHexagonalCoordinates } from "@/lib/utils";
import { useActiveTileStore } from "@/stores/active-tile.store";
import { useBuildingsStore } from "@/stores/buildings.store";

const DropdownMenu = DropdownMenuPrimitive.Root;

const HexagonalRadialMenu = () => {
  const { constructBuilding } = useBuildingsStore((state) => state);
  const { active, resetActiveTile } = useActiveTileStore((state) => state);

  const handleConstruct = () => {
    if (active) {
      const [x, y, z] = active.position;
      const position = prepareHexagonalCoordinates(x, active.height, z);

      const building: BuildingType = {
        id: uuidv4(),
        tileId: active.id,
        position: position,
        type: BuildingsEnum.TOWN_HALL,
        condition: 0,
        isUnderConstruction: true,
      };
      constructBuilding(building);
    }
    resetActiveTile();
  };

  console.log("menu");

  return (
    <div className="test">
      <DropdownMenuPrimitive.Root open={!!active}>
        <DropdownMenuPrimitive.Trigger className="fixed top-1/2 left-1/2 invisible">
          button
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            side="top"
            align="end"
            onEscapeKeyDown={resetActiveTile}
            onFocusOutside={resetActiveTile}
            className="relative mb-20"
          >
            <DropdownMenuPrimitive.Item className="focus-visible:outline-none absolute -right-[80%] bottom-1/4">
              <HexagonalButton className="bg-white/30 text-white/30">
                <p className="text-rose-800">void</p>
              </HexagonalButton>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className="focus-visible:outline-none absolute -left-[80%] bottom-1/4">
              <HexagonalButton
                className="bg-white/30 text-white/30"
                onClick={handleConstruct}
              >
                <p className="text-rose-800">build</p>
              </HexagonalButton>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className="focus-visible:outline-none">
              <HexagonalButton className="bg-white/30 text-white/30">
                <p className="text-rose-800">void</p>
              </HexagonalButton>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className="mt-1 focus-visible:outline-none">
              <HexagonalButton
                className="bg-white/30 text-white/30"
                onClick={resetActiveTile}
              >
                <p className="text-rose-800">close</p>
              </HexagonalButton>
            </DropdownMenuPrimitive.Item>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  );
};

export { HexagonalRadialMenu };
