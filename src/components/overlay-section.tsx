import {
  HexagonalButton,
  HexagonalCard,
  InterfaceWrapper,
} from "@/components/ui";
import { TileInfo } from "./ui/tile-info";

export const OverlaySection = () => {
  return (
    <>
      <InterfaceWrapper className="flex flex-col gap-1">
        <HexagonalButton className="bg-stone-800 text-stone-800">
          <HexagonalCard>
            <div className="flex items-center">
              <p className="w-10">100</p>
              <div className="px-6">
                <p className="font-semibold text-rose-900">Rock</p>
                <p className="text-nowrap text-stone-400 text-xs">
                  lorem ip sum dolor
                </p>
              </div>
            </div>
          </HexagonalCard>
        </HexagonalButton>
        <HexagonalButton className="bg-yellow-500 text-yellow-500">
          <HexagonalCard>
            <div className="flex items-center">
              <p className="w-10">100</p>
              <div className="px-6">
                <p className="font-semibold text-yellow-500">Grain</p>
                <p className="text-nowrap text-stone-400 text-xs">
                  lorem ip sum dolor
                </p>
              </div>
            </div>
          </HexagonalCard>
        </HexagonalButton>
        <HexagonalButton className="bg-amber-900 text-amber-900">
          <HexagonalCard>
            <div className="flex items-center">
              <p className="w-10">100</p>
              <div className="px-6">
                <p className="font-semibold text-amber-900">Wood</p>
                <p className="text-nowrap text-stone-400 text-xs">
                  lorem ip sum dolor
                </p>
              </div>
            </div>
          </HexagonalCard>
        </HexagonalButton>
        <HexagonalButton className="bg-slate-500 text-slate-500">
          <HexagonalCard>
            <div className="flex items-center">
              <p className="w-10">100</p>
              <div className="px-6">
                <p className="font-semibold text-slate-500">Iron</p>
                <p className="text-nowrap text-stone-400 text-xs">
                  lorem ip sum dolor
                </p>
              </div>
            </div>
          </HexagonalCard>
        </HexagonalButton>
      </InterfaceWrapper>
      <InterfaceWrapper variant="topright" className="p-2">
        <TileInfo />
      </InterfaceWrapper>
    </>
  );
};
