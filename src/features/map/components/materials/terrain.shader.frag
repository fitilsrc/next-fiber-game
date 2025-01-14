uniform sampler2D uTexture;

varying vec2 vUv;

uniform vec3 uColor;
varying vec3 vPosition;

uniform float uTime;

void main() {
  vec3 finalColor = uColor;
  gl_FragColor = vec4(vec3(finalColor), 1);
}
