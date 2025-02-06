varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform vec3 uColor;
uniform sampler2D uTexture;
uniform vec3 uDirLightColor;
uniform vec3 uAmbientLightColor;

void main() {
  //vec2 uv;
  vec3 normal = normalize(vNormal);
  vec3 uDirLightPos = vec3(55.0, 55.0, 0.0);

  float camera = max( dot( normal, vec3( 55.0, 55.0, 35.0 ) ), 0.4);
  float light = max( dot( normal, uDirLightPos ), 0.0);

  vec3 finalColor = uColor;

  if (length(light) > 0.0) {
    finalColor = uColor * 1.8;
  }

  if (length(light) > 48.0) {
    finalColor = uColor * 2.8;
  }

  float clarity = ( vUv.y * 0.875 ) + 0.125;

  //if (normal.y > 0.9) {
  //  finalColor = texture2D(uTexture, vUv).rgb * 2.5 ;
  //}

  gl_FragColor = vec4(finalColor, 1.0);
}
