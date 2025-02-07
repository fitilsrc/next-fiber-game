import * as THREE from "three";

import {
  ModelEnum,
  ResourceMapType,
  ResourcesEnum,
  ResourceType,
  TerrainTypeEnum,
  TileResourcesType,
  TileType
} from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { createNoise2D } from "simplex-noise";
import { prepareHexagonalCoordinates } from "./utils";

type LimitsType = Record<ResourcesEnum, number>;

const limits: LimitsType = {
  [ResourcesEnum.CLAY]: 10,
  [ResourcesEnum.COAL]: 6,
  [ResourcesEnum.IRON]: 4,
  [ResourcesEnum.MEAT]: 7,
  [ResourcesEnum.STONE]: 20,
  [ResourcesEnum.WOOD]: 1000,
}

const ResourceToTerrainMap: ResourceMapType = {
  [TerrainTypeEnum.GRASS]: [
    {
      type: ResourcesEnum.MEAT,
      probability: 3
    }
  ],

  [TerrainTypeEnum.GRASS_BROWN]: [
    {
      type: ResourcesEnum.MEAT,
      probability: 3
    },
    {
      type: ResourcesEnum.COAL,
      probability: 3
    },
    {
      type: ResourcesEnum.WOOD,
      probability: 30
    }
  ],

  [TerrainTypeEnum.GRASS_FOREST]: [
    {
      type: ResourcesEnum.MEAT,
      probability: 3
    },
    {
      type: ResourcesEnum.WOOD,
      probability: 100
    }
  ],

  [TerrainTypeEnum.GRASS_ROCKY]: [
    {
      type: ResourcesEnum.MEAT,
      probability: 3
    },
    {
      type: ResourcesEnum.STONE,
      probability: 5
    },
    {
      type: ResourcesEnum.WOOD,
      probability: 30
    }
  ],

  [TerrainTypeEnum.ROCK]: [
    {
      type: ResourcesEnum.IRON,
      probability: 10
    },
    {
      type: ResourcesEnum.COAL,
      probability: 10
    },
    {
      type: ResourcesEnum.STONE,
      probability: 5
    }
  ],

  [TerrainTypeEnum.SAND]: [
    {
      type: ResourcesEnum.CLAY,
      probability: 10
    }
  ],

  [TerrainTypeEnum.SAND_COAST]: [

  ],

  [TerrainTypeEnum.SNOW]: [
    {
      type: ResourcesEnum.IRON,
      probability: 10
    },
    {
      type: ResourcesEnum.COAL,
      probability: 10
    },
    {
      type: ResourcesEnum.STONE,
      probability: 5
    }
  ]
}

function getModel(
  resources: ResourceType[],
): ModelEnum | null {
  const index = resources
    .map((r) => {
      if (r.type === ResourcesEnum.WOOD) {
        return Math.random() < 0.3 ? ModelEnum.TREE : ModelEnum.PINE_TREE
      }
      return r.type
    })
    .sort((a, b) => a.localeCompare(b))
    .join('_');

  return ModelEnum[index as keyof typeof ModelEnum] || null;
}

function generateTileResources(
  tile: TileType,
  tileResources: TileResourcesType[]
): TileResourcesType {
  const [x, y, z] = tile.position;
  const preparedTileResources: TileResourcesType = {
    id: uuidv4(),
    tileId: tile.id,
    position: prepareHexagonalCoordinates(x, tile.height + 0.001, z),
    rotation: new THREE.Euler(0, Math.PI * (0.333 * Math.ceil(Math.random() * 10)), 0),
    resources: [],
    terrainType: tile.type,
    model: null,
  };
  const resources: ResourceType[] = [];

  ResourceToTerrainMap[tile.type].forEach((resource) => {
    const rndInt = Math.floor(Math.random() * 100) + 1;
    const count = tileResources.filter((t) =>
      t.resources.some((r) => r.type === resource.type)
    ).length;

    if (rndInt <= resource.probability && count < limits[resource.type]) {
      resources.push({
        type: resource.type,
        amount: Math.ceil(Math.random() * 1000),
      });
    }
  });

  const model = getModel(resources);

  return {
    ...preparedTileResources,
    resources,
    model,
  };
}

function isPointInsideCircle(x: number, y: number, radius: number) {
  const distanceSquared = Math.abs(x) ** 2 + Math.abs(y) ** 2;
  return distanceSquared <= radius ** 2;
}

function isNumberInRange(number: number, min: number, max: number) {
  return number >= min && number < max;
}

function generateTerrainType(height: number) {
  switch (true) {
    case isNumberInRange(height, 0, 1) || height < 0:
      return {
        color: "#798190",
        type: TerrainTypeEnum.SAND_COAST,
      };
    case isNumberInRange(height, 1, 2):
      return {
        color: "#6C6E6F",
        type: TerrainTypeEnum.SAND,
      };
    case isNumberInRange(height, 2, 3):
      return {
        color: "#555630",
        type: TerrainTypeEnum.GRASS,
      };
    case isNumberInRange(height, 3, 5):
      return {
        color: "#374726",
        type: Math.random() < 0.4 ? TerrainTypeEnum.GRASS_FOREST : TerrainTypeEnum.GRASS_ROCKY,
      };
    case isNumberInRange(height, 5, 6):
      return {
        color: "#57483A",
        type: TerrainTypeEnum.GRASS_BROWN,
      };
    case isNumberInRange(height, 6, 7):
      return {
        color: "#796B58",
        type: TerrainTypeEnum.ROCK,
      };
    default:
      return {
        color: "#7A7D86",
        type: TerrainTypeEnum.SNOW,
      };
  }
}

export const generateTerrain = (radius: number) => {
  const terrain: TileType[] = [];
  const noise2D = createNoise2D();
  const resources: TileResourcesType[] = [];

  for (let x = -Math.abs(radius); x < Math.abs(radius); x++) {
    for (let z = -Math.abs(radius); z < Math.abs(radius); z++) {
      if (isPointInsideCircle(x, z, radius)) {
        const tileId = uuidv4();
        const noise = (noise2D(x * 0.04, z * 0.04) + 0.6) * 0.5;
        const height = noise * 10;
        const {
          color,
          type
        } = generateTerrainType(height);

        const preparedTerrain: TileType = {
          id: tileId,
          position: [x, 0, z],
          color: color,
          height: height,
          rotation: new THREE.Euler(0, Math.PI * (0.333 * Math.ceil(Math.random() * 10)), 0),
          type: type,
        };

        resources.push(generateTileResources(preparedTerrain, resources));

        terrain.push(preparedTerrain);
      }
    }
  }

  return { terrain, resources };
}
