import React, { useEffect, useRef, useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { useActiveTileStore } from "../providers/active-tile-provider";
import { HexagonalButton } from "./hexa-button";

const DropdownMenu = DropdownMenuPrimitive.Root;

interface HexagonalRadialMenuProps {}

const HexagonalRadialMenu = () => {
  const { id, resetActiveTile } = useActiveTileStore((state) => state);

  return (
    <div className="test">
      <DropdownMenuPrimitive.Root open={!!id}>
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
                <p className="text-rose-800">build</p>
              </HexagonalButton>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className="focus-visible:outline-none absolute -left-[80%] bottom-1/4">
              <HexagonalButton className="bg-white/30 text-white/30">
                <p className="text-rose-800">build</p>
              </HexagonalButton>
            </DropdownMenuPrimitive.Item>
            <DropdownMenuPrimitive.Item className="focus-visible:outline-none">
              <HexagonalButton className="bg-white/30 text-white/30">
                <p className="text-rose-800">build</p>
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
