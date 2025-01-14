import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

import fragmentShader from './water.shader.frag';
import vertexShader from './water.shader.vert';

export const WaterMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uOpacity: 0.8,
    uTexture: new THREE.Texture(),
  },
  vertexShader,
  fragmentShader
)
