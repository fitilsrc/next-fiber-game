import { AnimalType, EnvironmentType, HeightMapType, PlantType, TileType } from "@/types";
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
        color: "#374726",
        type: Math.random() < 0.4 ? TerrainType.GRASS_FOREST : TerrainType.GRASS_ROCKY,
      };
    case isNumberInRange(height, 5, 6):
      return {
        color: "#57483A",
        type: TerrainType.GRASS_BROWN,
      };
    case isNumberInRange(height, 6, 7):
      return {
        color: "#796B58",
        type: TerrainType.ROCK,
      };
    default:
      return {
        color: "#7A7D86",
        type: TerrainType.SNOW,
      };
  }

}

function generatePlantType (type: TerrainType) {
  switch (type) {
    case TerrainType.GRASS_FOREST:
      return {
        plant: Math.random() < 0.5 ? PlantType.TREE : PlantType.PINE_TREE,
      };
    case TerrainType.GRASS_ROCKY:
      return {
        plant: Math.random() < 0.3 ? PlantType.BUSH : null,
      };
    case TerrainType.GRASS_BROWN:
      return {
        plant: Math.random() < 0.3 ? PlantType.PINE_TREE : null,
      };
    default:
      return {
        plant: null,
      };
  }
}

function generateAnimalType (type: TerrainType, plant: PlantType | null) {
  switch (type) {
    case TerrainType.GRASS_FOREST:
      return {
        animal: Math.random() < 0.3 ? AnimalType.DEER : null,
      };
    case TerrainType.GRASS_ROCKY:
      return {
        animal: Math.random() < 0.3 ? AnimalType.HORSE : null,
      };
    case TerrainType.GRASS_BROWN:
      return {
        animal: Math.random() < 0.3 ? AnimalType.SHEEP : null,
      };
    default:
      return {
        animal: null,
      };
  }
}

function generateEnvironmentType (type: TerrainType) {
  switch (type) {
    case TerrainType.ROCK:
      return {
        environment: Math.random() < 0.05 ? EnvironmentType.ROCK : null,
      };
    default:
      return {
        environment: null,
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
        const {
          color,
          type
        } = generateTerrainType(height);

        const { plant } = generatePlantType(type);
        const { animal } = generateAnimalType(type, plant);
        const { environment } = generateEnvironmentType(type);

        tiles.push({
          id: uuidv4(),
          position: [x, 0, z],
          color: color,
          height: height,
          type: type,
          plant: plant,
          animal: animal,
          environment: environment,
        });
      }
    }
  }
  return tiles;
}

export const heightMap = (tiles: TileType[]): HeightMapType[][] => {
  const treesMap: HeightMapType[] = [
    { x: 0, y: 0, height: 0.5 },
    { x: -0.65, y: 0.25, height: 0.5 },
    { x: -0.15, y: 0.65, height: 0.5 },
    { x: 0.65, y: 0.15, height: 0.5 },
    { x: 0.45, y: -0.15, height: 0.5 },
    { x: 0.15, y: -0.65, height: 0.5 },
  ];

  const noise2D = createNoise2D();

  return tiles.map((tile) => {
    const [x, y, z] = tile.position;
    return treesMap.map((tree) => {
      const height = (noise2D((x + tree.x) * 0.6, (y + tree.y) * 0.6) + 1) * 0.6;
      return {
        x: tree.x,
        y: tree.y,
        height: height,
      }
    })
  })
}
