import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

import fragmentShader from './active.shader.frag';
import vertexShader from './active.shader.vert';

export const ActiveMaterial = shaderMaterial(
  {
    uTime: 0,
    uOpacity: 0.1,
    uColor: new THREE.Color(0.0, 0.0, 0.0),
  },
  vertexShader,
  fragmentShader
)
