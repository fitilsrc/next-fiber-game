varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform vec3 uColor;
uniform sampler2D uTexture;

void main() {
  vUv = uv;
  vNormal = normal;

  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1);
}
