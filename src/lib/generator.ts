import { TileType } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { createNoise2D } from "simplex-noise";

function isPointInsideCircle(x: number, y: number, radius: number) {
  const distanceSquared = Math.abs(x) ** 2 + Math.abs(y) ** 2;
  return distanceSquared <= radius ** 2;
}

function getTerrainColor (height: number) {
  if (height > 7) {
    return "#7F3E1C";
  }
  if (height > 6 && height <= 7) {
    return "#BE5516";
  }
  if (height > 4 && height <= 6) {
    return "#2E5020";
  }
  if (height > 3 && height <= 4) {
    return "#376B12";
  }
  if (height > 2 && height <= 3) {
    return "#85B43D";
  }
  if (height > 1 && height <= 2) {
    return "#B8D99E";
  }
  return "#346D93";
}

export const generateTerrain = (radius: number): TileType[] => {
  const tiles: TileType[] = [];
  const noise2D = createNoise2D();

  for (let x = -Math.abs(radius); x < Math.abs(radius); x++) {
    for (let z = -Math.abs(radius); z < Math.abs(radius); z++) {
      if (isPointInsideCircle(x, z, radius)) {
        const noise = (noise2D(x * 0.04, z * 0.04) + 0.6) * 0.5;
        const height = noise * 10;
        const type = height > 3 && height<=6 ? "tree" : "sea";

        const color = getTerrainColor(height);
        tiles.push({
          id: uuidv4(),
          position: [x, 0, z],
          color: color,
          height: height,
          type: type,
        });
      }
    }
  }
  return tiles;
}

export const generateForest = () => {
  const trees: Array<{
    x: number;
    y: number;
    height: number;
  }> = [
    { x: 0, y: 0, height: 0.5 },
    { x: -0.65, y: 0.25, height: 0.5 },
    { x: -0.15, y: 0.65, height: 0.5 },
    { x: 0.65, y: 0.15, height: 0.5 },
    { x: 0.45, y: -0.15, height: 0.5 },
    { x: 0.15, y: -0.65, height: 0.5 },
  ];
  const noise2D = createNoise2D();

  return trees.map(tree => {
    const noise = (noise2D(tree.x * 0.5, tree.y * 0.5) + 1) * 0.5;
    const height = noise * 10;
    return {
      x: tree.x,
      y: tree.y,
      height: height,
    }
  });
}