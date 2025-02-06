import * as THREE from "three";
import { create } from "zustand";

export type CameraState = {
  cameraTarget: THREE.Vector3;
}

export type CameraActions = {
  setCameraTarget: (position: THREE.Vector3) => void;
}

export type CameraStore = CameraState & CameraActions;

export const useCameraStore = create<CameraStore>()((set) => ({
  cameraTarget: new THREE.Vector3(0, 0, 0),
  setCameraTarget: (target: THREE.Vector3) => set({ cameraTarget: target }),
}));
