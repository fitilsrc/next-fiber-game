import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

import fragmentShader from './grass.shader.frag';
import vertexShader from './grass.shader.vert';

export const GrassMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
    uTexture: new THREE.Texture(),
  },
  vertexShader,
  fragmentShader
)
