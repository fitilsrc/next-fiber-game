import * as THREE from "three";

import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const prepareHexagonalCoordinates = (
  x: number,
  y: number,
  z: number
): THREE.Vector3 => {
  return new THREE.Vector3((x + (z % 2) * 0.5) * 1.75, y, z * 1.535);
};

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
