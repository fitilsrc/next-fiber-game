import { CanvasSection } from "@/components/canvas-section";
import { OverlaySection } from "@/components/overlay-section";

export default function Home() {
  return (
    <main className="flex justify-center items-center bg-white">
      <CanvasSection />
      <OverlaySection />
    </main>
  );
}
