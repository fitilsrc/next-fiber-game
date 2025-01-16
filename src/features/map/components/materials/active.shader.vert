varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uOpacity;

void main() {
    float thickness = 0.01;

    vUv = uv;
    vec3 newPosition = position + normal * thickness;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1);
}
