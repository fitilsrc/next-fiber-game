import { TileType } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { createNoise2D } from "simplex-noise";
import { TerrainType } from "@/components/providers/environment-provider";

function isPointInsideCircle(x: number, y: number, radius: number) {
  const distanceSquared = Math.abs(x) ** 2 + Math.abs(y) ** 2;
  return distanceSquared <= radius ** 2;
}

function isNumberInRange (number: number, min: number, max: number) {
  return number >= min && number < max;
}

function generateTerrainType (height: number) {
  switch (true) {
    case isNumberInRange(height, 0, 1):
      return {
        color: "#798190",
        type: TerrainType.SAND_COAST,
      };
    case isNumberInRange(height, 1, 2):
      return {
        color: "#6C6E6F",
        type: TerrainType.SAND,
      };
    case isNumberInRange(height, 2, 3):
      return {
        color: "#555630",
        type: TerrainType.GRASS,
      };
    case isNumberInRange(height, 3, 5):
      return {
        color: "#595F2B",
        type: Math.random() < 0.4 ? TerrainType.GRASS_FOREST : TerrainType.GRASS_ROCKY,
      };
    case isNumberInRange(height, 5, 6):
      return {
        color: "#57483A",
        type: TerrainType.GRASS_BROWN,
      };
    case isNumberInRange(height, 6, 7):
      return {
        color: "#858882",
        type: TerrainType.ROCK,
      };
    default:
      return {
        color: "#7887A8",
        type: TerrainType.SNOW,
      };
  }

}

export const generateTerrain = (radius: number): TileType[] => {
  const tiles: TileType[] = [];
  const noise2D = createNoise2D();

  for (let x = -Math.abs(radius); x < Math.abs(radius); x++) {
    for (let z = -Math.abs(radius); z < Math.abs(radius); z++) {
      if (isPointInsideCircle(x, z, radius)) {
        const noise = (noise2D(x * 0.04, z * 0.04) + 0.6) * 0.5;
        const height = noise * 10;
        const { color, type} = generateTerrainType(height);

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
    const noise = (noise2D(tree.x * 0.6, tree.y * 0.6) + 1) * 0.5;
    const height = noise * 10;
    return {
      x: tree.x,
      y: tree.y,
      height: height,
    }
  });
}
