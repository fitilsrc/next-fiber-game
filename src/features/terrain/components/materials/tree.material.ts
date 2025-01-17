import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

import fragmentShader from './tree.shader.frag';
import vertexShader from './tree.shader.vert';

export type TreeUniforms = {
  uDirLightPos: THREE.Vector3
  uDirLightColor: THREE.Color

  uAmbientLightColor: THREE.Color

  uBaseColor: THREE.Color
  uLineColor1: THREE.Color
  uLineColor2: THREE.Color
  uLineColor3: THREE.Color
  uLineColor4: THREE.Color
}

export const TreeMaterial = shaderMaterial(
  {
    uDirLightPos: new THREE.Vector3(),
    uDirLightColor: new THREE.Color(0xeeeeee),

    uAmbientLightColor: new THREE.Color(0x050505),

    uBaseColor: new THREE.Color(0xeeeeee),
    uLineColor1: new THREE.Color(0x808080),
    uLineColor2: new THREE.Color(0x000000),
    uLineColor3: new THREE.Color(0x000000),
    uLineColor4: new THREE.Color(0x000000),
  },
  vertexShader,
  fragmentShader
)
