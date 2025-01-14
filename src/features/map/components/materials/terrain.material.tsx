import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

import fragmentShader from './terrain.shader.frag';
import vertexShader from './terrain.shader.vert';

export const TerrainMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  vertexShader,
  fragmentShader
)
