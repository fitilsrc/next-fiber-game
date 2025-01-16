import * as THREE from "three";

export const prepareHexagonalCoordinates = (
  x: number,
  y: number,
  z: number
): THREE.Vector3 => {
  return new THREE.Vector3((x + (z % 2) * 0.5) * 1.75, y, z * 1.535);
};
