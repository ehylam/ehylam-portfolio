uniform float uProgress;
uniform vec2 uMeshScale;
uniform vec2 uMeshPosition;
uniform vec2 uViewSize;
uniform vec2 uCursor;
uniform float uTime;
uniform float uHover;

varying vec2 vUv;

float N21(vec2 p) {
  return fract(sin(p.x * 110. + p.y * 5834.) * 43758.);
}

float SmoothNoise(vec2 uv) {
  vec2 lv = fract(uv);
  vec2 id = floor(uv);

  lv = lv * lv * (3. - 2. * lv);

  float bl = N21(id);
  float br = N21(id + vec2(1. ,0.));
  float b = mix(bl, br, lv.x);

  float tl = N21(id + vec2(0. ,1.));
  float tr = N21(id + vec2(1. ,1.));
  float t = mix(tl, tr, lv.x);

  return mix(b, t, lv.y);
}

float SmoothNoise2(vec2 uv) {
  float c = SmoothNoise(uv * 4.);
  c += SmoothNoise(uv * 8.) * .5;
  // c += SmoothNoise(uv * 16.) * .25;
  // c += SmoothNoise(uv * 32.) * .125;

  return c /= 1.5;
}


void main(){
  vec3 pos = position;

  float c = SmoothNoise2(uv / 2.);

  // (0 - 1 + 1) / 2 = 0; - Top left
  // (1 - 1 + 1) / 2 = 0.5; - Top right
  // (0 - 0 + 1) / 2 = 0.5; - Bottom left
  // (1 - 0 + 1) / 2 = 1; - Bottom - right
  float activation = (+uv.x + (c * 0.4) - uv.y + (c * 0.4) + 1.)/2.;

  float latestStart = 0.4; // Stagger timing
  float startAt = activation * latestStart;
  // Performs the smooth Hermite interpolation between the values startAt and 1 using time a
  float vertexProgress = smoothstep(startAt,1.,uProgress);

  // // Scale to page view size/page size
  vec2 scaleToViewSize = uViewSize / uMeshScale - 1.;
  vec2 scale = vec2(
    1. + scaleToViewSize * vertexProgress
  );

  pos.xy *= scale;

  float dist = distance(uv, uCursor);
  pos.z += uHover * (5. * sin(dist * 10. + uTime));

  if (uProgress > 0.) pos.z = 0.;

  // Move towards center
  pos.y += -uMeshPosition.y * vertexProgress;
  pos.x += -uMeshPosition.x * vertexProgress;

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
}