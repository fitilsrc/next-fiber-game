uniform vec3 uBaseColor;
uniform vec3 uLineColor1;
uniform vec3 uLineColor2;
uniform vec3 uLineColor3;
uniform vec3 uLineColor4;

uniform vec3 uDirLightPos;
uniform vec3 uDirLightColor;

uniform vec3 uAmbientLightColor;

uniform mat4 modelMatrix;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {

  vec3 brightnessThresholds = vec3( 0.6, 0.35, 0.001 );

  float camera = max( dot( normalize( vNormal ), vec3( 0.0, 0.0, 1.0 ) ), 0.4);
  float light = max( dot( normalize( vNormal ), uDirLightPos ), 0.0);

  gl_FragColor = vec4( uBaseColor, 1.0 );

  if (length(light) > 0.0) {
    gl_FragColor = vec4( uLineColor3, 1.0 );
  }

  if (length(light) > 10.99) {
    gl_FragColor = vec4( uLineColor4, 1.0 );
  }

  if (length(light) > 20.99) {
    gl_FragColor = vec4( uLineColor1, 1.0 );
  }

  if ( length(uAmbientLightColor + uDirLightColor * camera) < 0.50 ) {
  	gl_FragColor *= vec4( uLineColor2, 1.0 );
    gl_FragColor *= vec4( 1.0, 1.0, 0.0, 1.0 );
  }
}
