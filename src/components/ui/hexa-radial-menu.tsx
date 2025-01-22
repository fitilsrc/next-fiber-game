import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { HexagonalButton } from "./hexa-button";
import { v4 as uuidv4 } from 'uuid';
import { BuildingsEnum, BuildingType } from "@/types";
import { useMapStore } from "../providers/map-provider";

const DropdownMenu = DropdownMenuPrimitive.Root;

const HexagonalRadialMenu = () => {
  const { active, resetActiveTile, constructBuilding } = useMapStore((state) => state);

  const handleConstruct = () => {
    const building: BuildingType = {
      id: uuidv4(),
      type: BuildingsEnum.TOWN_HALL,
      condition: 0,
    }

    if (active) {
      constructBuilding(active, building);
    }
    resetActiveTile();
  }

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
              <HexagonalButton className="bg-white/30 text-white/30" onClick={handleConstruct}>
                <p className="text-rose-800">build</p>
              </HexagonalButton>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className="focus-visible:outline-none">
              <HexagonalButton className="bg-white/30 text-white/30">
                <p className="text-rose-800">void</p>
              </HexagonalButton>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className="mt-1 focus-visible:outline-none">
              <HexagonalButton className="bg-white/30 text-white/30" onClick={resetActiveTile}>
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
