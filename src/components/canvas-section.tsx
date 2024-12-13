"use client";

import { Box } from "@/features/primitives/components/box";
import { useDatGUI } from "@/hooks/useDatGUI";
import { OrbitControls, PerspectiveCamera, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const CanvasSection = () => {
  const gui = useDatGUI();

  return (
    <section className="h-screen w-full">
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <directionalLight position={[1, 2, 3]} />
        <Box position={[-1.2, 0, 0]} gui={gui} />
        <Box position={[1.2, 0, 0]} gui={gui} />
        <PerspectiveCamera makeDefault position={[0, 20, 25]} />
        <OrbitControls />
      </Canvas>
      <Stats />
    </section>
  );
};
