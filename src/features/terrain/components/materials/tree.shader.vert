precision highp float;
precision highp int;

varying vec3 vNormal;
varying vec3 vPosition;

void main () {
  vNormal = normalize( normalMatrix * normal );
  vPosition = position;

  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position,1.0);
}
